using Microsoft.AspNetCore.Mvc;

using osbb_backend.Models;
using osbb_backend.Repositories;

namespace osbb_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public AnnouncementsController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllAnnouncements()
        {
            return Ok(await _repoWrapper.Announcements.GetAllAsync());
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAnnouncements([FromBody] Announcement announcement)
        {
            try
            {
                await _repoWrapper.Announcements.CreateAsync(announcement);
                await _repoWrapper.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
