using osbb_backend.Models;

namespace osbb_backend
{
    public interface IAnnouncementsRepository : IRepositoryBase<Announcement>
    {
    }

    public class AnnouncementsRepository : RepositoryBase<Announcement>, IAnnouncementsRepository
    {
        public AnnouncementsRepository(OsbbContext dbContext) : base(dbContext)
        {
        }
    }
}