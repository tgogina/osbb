using Microsoft.AspNetCore.Mvc;

using osbb_backend.Models;
using osbb_backend.Repositories;
using osbb_backend.Services;

using System.Net.Mail;

namespace osbb_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repoWrapper;
        private readonly IEmailService _emailService;

        public UserController(IRepositoryWrapper repoWrapper, IEmailService emailService)
        {
            _repoWrapper = repoWrapper;
            _emailService = emailService;
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

        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe()
        {
            var reciever = new MailAddress("ishutyak2@gmail.com", "Кирило Буданов");

            EmailModel model = new EmailModel
            {
                Message = "test",
                Subject = "test",
                Title = "test",
            };

            await _emailService.SendEmailAsync(model, reciever);

            return Ok();
        }
    }
}