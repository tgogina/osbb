
namespace osbb_backend.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        IAnnouncementsRepository Announcements { get; }

        Task SaveAsync();
    }

    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly OsbbContext _dbContext;
        private IUserRepository _user;
        private IAnnouncementsRepository _announcements;

        public RepositoryWrapper(OsbbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IUserRepository User
        {
            get { return _user ??= new UserRepository(_dbContext); }
        }

        public IAnnouncementsRepository Announcements
        {
            get { return _announcements ??= new AnnouncementsRepository(_dbContext); }
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
