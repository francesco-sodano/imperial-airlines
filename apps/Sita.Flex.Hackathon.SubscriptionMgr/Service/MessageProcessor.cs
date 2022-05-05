using Azure.Messaging.ServiceBus;
using Sita.Flex.Hackathon.SubscriptionMgr.Contract;

namespace Sita.Flex.Hackathon.SubscriptionMgr.Service
{
    public class MessageProcessor : BackgroundService
    {
        private readonly ISubscriptionRepository repo;
        private ServiceBusClient client;
        private ServiceBusProcessor processor;
        private DateTime lastUpdated = DateTime.MinValue;

        public MessageProcessor(ISubscriptionRepository repo)
        {
            this.repo = repo;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            if (processor != null) {
                await processor.StartProcessingAsync(cancellationToken);
            }
            await BackgroundProcessing(cancellationToken);
        }

 
        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            if (processor != null)
            {
                await processor.StopProcessingAsync(cancellationToken);
            }
            await base.StopAsync(cancellationToken);
        }

        private async Task BackgroundProcessing(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                if(repo.LastModified > lastUpdated)
                {
                    if(processor!=null)
                    {
                        await processor.StopProcessingAsync(cancellationToken);
                    }

                    var subscription = repo.GetFirstSubscription();

                    if(subscription != null)
                    {
                        this.client = new ServiceBusClient(subscription.ConnectionString);
                        this.processor = client.CreateProcessor(subscription.TopicName, subscription.SubscriptionName);
                        processor.ProcessMessageAsync += MessageHandler;
                        processor.ProcessErrorAsync += ErrorHandler;
                        await processor.StartProcessingAsync(cancellationToken);
                    }
                    lastUpdated = DateTime.Now;
                }

                await Task.Delay(500);
            }
        }


        async Task MessageHandler(ProcessMessageEventArgs args)
        {
            object? deviceId;
            if(args.Message.ApplicationProperties.TryGetValue("DeviceId", out deviceId)) {
                if(deviceId != null)
                {
                    var deviceIdStr = deviceId as string;
                    string body = args.Message.Body.ToString();
                    repo.AddMessage(deviceIdStr.Split('.').First(), body);
                }
            }


            await args.CompleteMessageAsync(args.Message);
        }

        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            return Task.CompletedTask;
        }

    }
}
