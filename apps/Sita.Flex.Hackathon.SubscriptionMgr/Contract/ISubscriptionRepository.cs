using Sita.Flex.Hackathon.SubscriptionMgr.Model;

namespace Sita.Flex.Hackathon.SubscriptionMgr.Contract
{
    public interface ISubscriptionRepository
    {
        public Task<SubscriptionInfo?> GetSubscription(string locationId);
        public DateTime LastModified { get; }

        public Subscription? GetFirstSubscription();

        public void AddMessage(string locationId, string body);
        public string? GetMessage(string locationid);

        public ICollection<string> GetMessages(string locationId);
    }
}
