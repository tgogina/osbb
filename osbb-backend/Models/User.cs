namespace osbb_backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string SurName { get; set; }
        public string? Property { get; set; }
        public string? PropertyId { get; set; }
        public string? RegistrationInfo { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
