using Microsoft.EntityFrameworkCore;

using osbb_backend.Models;

using System.Collections.Generic;
using System.Reflection.Emit;

namespace osbb_backend
{
    public class OsbbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public OsbbContext(DbContextOptions<OsbbContext> options) : base(options)
        {
            //Database.Migrate();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            CreateDefaultUsers(modelBuilder);
            CreateDefaultAnnouncements(modelBuilder);
        }

        private void CreateDefaultUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Admin",
                Email = "admin@osbb.com",
                IsAdmin = true,
                LastName = "Admin",
                Password = "1111",
                Property = null,
                PropertyId = null,
                RegistrationInfo = null,
                SurName = "Admin"
            },
            new User
            {
                Id = 2,
                Name = "Тарас",
                Email = "kobzar@osbb.com",
                IsAdmin = false,
                LastName = "Шевченко",
                Password = "1111",
                Property = "Квартира 12",
                PropertyId = "МП128496",
                RegistrationInfo = "123456789",
                SurName = "Григорович"
            },
            new User
            {
                Id = 3,
                Name = "Леся",
                Email = "lesya@osbb.com",
                IsAdmin = false,
                LastName = "Українка",
                Password = "1111",
                Property = "Квартира 13",
                PropertyId = "КЛ123454",
                RegistrationInfo = "987654321",
                SurName = "Петрівна"
            });
        }

        private void CreateDefaultAnnouncements(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>().HasData(
            new Announcement
            {
                Id = 1,
                Title = "Збори у березні",
                Text = "УВАГА!\n\n" +
                "03 березня 2023 року, середа о 20:00\n" +
                "ПОЗАПЛАНОВІ\n" +
                "Загальні збори власників будинку ОСББ\n\nПитання:\n" +
                "1. Кошторис 2023\n" +
                "2. Правління ОСББ та посада голови правління\n" +
                "3. Тарифи на 2023\n",
            },
            new Announcement
            {
                Id = 2,
                Title = "Вчасні виплати",
                Text = "Шановні співвласники! \n" +
                "Утримання нашого будинку і приведення його в належний санітарний і технічний стан вимагає постійних витрат. " +
                "Основне джерело коштів на проведення всіх необхідних робіт - це внески співввласникві будинку. " +
                "Правління звертається до Вас з проханням своєчасно сплачувати внески і не допускати заборгованості. " +
                "Щиро сподіваємося на Ваше розуміння.",
            });
        }
    }
}
