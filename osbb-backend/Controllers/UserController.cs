using Microsoft.AspNetCore.Mvc;

using osbb_backend.Models;
using osbb_backend.Repositories;

namespace osbb_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public UserController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _repoWrapper.User.GetAllAsync());
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                await _repoWrapper.User.CreateAsync(user);
                await _repoWrapper.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            try
            {
                User user = await _repoWrapper.User.GetFirstAsync(u => u.Id == userId);
                _repoWrapper.User.Delete(user);
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