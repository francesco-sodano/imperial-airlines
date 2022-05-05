using Microsoft.AspNetCore.Mvc;
using Sita.Flex.Hackathon.SubscriptionMgr.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sita.Flex.Hackathon.SubscriptionMgr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        ISubscriptionRepository repo;

        public MessagesController(ISubscriptionRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("{locationId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(string locationId)
        {
            var msg = repo.GetMessage(locationId);
            if(msg == null)
            {
                return NotFound();
            }

            return Ok(msg);
        }
    }
}
