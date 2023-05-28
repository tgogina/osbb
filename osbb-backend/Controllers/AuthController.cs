using Microsoft.AspNetCore.Mvc;

using osbb_backend.Models;
using osbb_backend.Repositories;

namespace osbb_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public AuthController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            User user = await _repoWrapper.User.GetFirstAsync(u => u.Email == userLogin.Email && u.Password == userLogin.Password);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
