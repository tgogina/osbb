using osbb_backend.Models;

namespace osbb_backend
{
    public interface IDocumentsRepository : IRepositoryBase<Documents>
    {
    }

    public class DocumentsRepository : RepositoryBase<Documents>, IDocumentsRepository
    {
        public DocumentsRepository(OsbbContext dbContext) : base(dbContext)
        {
        }
    }
}