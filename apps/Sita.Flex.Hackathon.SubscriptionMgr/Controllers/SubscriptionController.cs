using Microsoft.AspNetCore.Mvc;
using Sita.Flex.Hackathon.SubscriptionMgr.Contract;

namespace Sita.Flex.Hackathon.SubscriptionMgr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        ISubscriptionRepository repo;
        public SubscriptionController(ISubscriptionRepository repo)
        {
            this.repo = repo;
        }

        /*
        [HttpGet()]
        public async Task<string?> Get()
        {
            var sub = await repo.GetSubscription("OA-FAB-OTH-MICROSOFTHACKATHON-01-RPA1KSK001");

            return sub?.SubscriptionId.ToString();
        }
        */

        [HttpGet("{locationId}")]
        public async Task<string?> Get(string locationId)
        {
            var sub = await repo.GetSubscription(locationId);

            return sub?.SubscriptionId.ToString();
        }
    }
}
