namespace Sita.Flex.Hackathon.SubscriptionMgr.Model
{
    public class SubscriptionInfo
    {
        public Guid SubscriptionId { get; set; }
        public string TopicName { get; set; }
        public string SubscriptionName { get; set; }
        public DateTime ExpiryTime { get; set; }
    }
}
