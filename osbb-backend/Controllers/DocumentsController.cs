using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using osbb_backend.Models;
using osbb_backend.Repositories;

using System.Net;
using System.Net.Http.Headers;

namespace osbb_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public DocumentsController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddDocument(IFormFile fileToUpload, string category)
        {
            using (var memoryStream = new MemoryStream())
            {
                await fileToUpload.CopyToAsync(memoryStream);

                Documents document = new Documents
                {
                    Name = fileToUpload.FileName,
                    Category = category,
                    Content = memoryStream.ToArray()
                };
                await _repoWrapper.Documents.CreateAsync(document);
                await _repoWrapper.SaveAsync();
            }

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Documents> documentsFromDb = await _repoWrapper.Documents.GetAllAsync();

            return Ok(documentsFromDb);
            //List<Documents> documentsToSent = new List<Documents>();
            //HttpResponseMessage result;
            //using (var memoryStream = new MemoryStream())
            //{
            //    memoryStream.Write(documentsFromDb.FirstOrDefault().Content);

            //    result = new HttpResponseMessage(HttpStatusCode.OK)
            //    {
            //        Content = new ByteArrayContent(memoryStream.ToArray())
            //    };
            //}

            //result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            //{
            //    FileName = documentsFromDb.FirstOrDefault().Name
            //};

            //result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            //return result;
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadById(int id)
        {
            var file = await _repoWrapper.Documents.GetFirstAsync(f => f.Id == id);

            return File(file.Content, "application/octet-stream", file.Name);
        }
    }
}
