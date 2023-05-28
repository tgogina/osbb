using osbb_backend.Models;

namespace osbb_backend
{
    public interface IUserRepository : IRepositoryBase<User>
    {
    }

    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(OsbbContext dbContext) : base(dbContext)
        {
        }
    }
}
