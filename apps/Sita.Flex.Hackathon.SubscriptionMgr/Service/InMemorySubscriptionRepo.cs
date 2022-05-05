using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Sita.Flex.Hackathon.SubscriptionMgr.Contract;
using Sita.Flex.Hackathon.SubscriptionMgr.Model;
using System.Text.Json;

namespace Sita.Flex.Hackathon.SubscriptionMgr.Service
{
    public class InMemorySubscriptionRepo : ISubscriptionRepository
    {
        private static Dictionary<string, Subscription> subscriptions = new Dictionary<string, Subscription>();
        private static Dictionary<string, Queue<string>> messages = new Dictionary<string, Queue<string>>();
        private AppIdentityConfig config;

        private DateTime lastModified = DateTime.Now;

        public InMemorySubscriptionRepo(IOptions<AppIdentityConfig> options)
        {
            config = options.Value;
        }
        public async Task<SubscriptionInfo?> GetSubscription(string locationId)
        {
            Subscription sub;
            if(subscriptions.TryGetValue(locationId, out sub))
            {
                return sub;
            }

            var subscription = await RetrieveSubscriptionAsync(locationId);
            if(subscription == null)
            {
                throw new Exception("can't obtain subscription");
            }
            subscriptions[locationId] = subscription;
            lastModified = DateTime.Now;
            return subscription;
        }

        public Subscription? GetFirstSubscription()
        {
            return subscriptions.Values.FirstOrDefault(); 
        }

        public DateTime LastModified { get { return lastModified;  } }
        private async Task<Subscription?> RetrieveSubscriptionAsync(string locationId)
        {
            var httpClient = await GetHttpClient(locationId);
            var response = await httpClient.PostAsync("https://api-preprod.sitaflex.aero/session/v2/subscriptions", null);

            using (var str = await response.Content.ReadAsStreamAsync())
            {
                var payload = await JsonSerializer.DeserializeAsync<Subscription>(str, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
                return payload;
            }
        }

        private async Task<HttpClient> GetHttpClient(string locationId)
        {
            var token = await GetToken();

            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            httpClient.DefaultRequestHeaders.Add("location-id", locationId);
            httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            return httpClient;
        }

        private async Task<string> GetToken()
        {
            AuthenticationContext context = new AuthenticationContext(
                config.Authority);

            var credential = new ClientCredential(config.ClientId, config.ClientSecret);

            var authResult = await context.AcquireTokenAsync(
                config.Resource,
                credential);

            return authResult.AccessToken;
        }

        public void AddMessage(string locationId, string body)
        {
            Queue<string> queue;
            if(!messages.TryGetValue(locationId, out queue))
            {
                queue = new Queue<string>();
                messages[locationId] = queue;
            }

            queue.Enqueue(body);
        }

        public string? GetMessage(string locationId)
        {
            Queue<string> queue;
            string? msg;

            if (messages.TryGetValue(locationId, out queue) && queue.TryDequeue(out msg))
            {
                return msg;
            }

            return null;
        }

        public ICollection<string> GetMessages(string locationId)
        {
            Queue<string> queue;

            if (messages.TryGetValue(locationId, out queue))
            {
                return queue.ToArray();
            }

            return new string[0];
        }
    }
}
