using System.Buffers.Text;

namespace osbb_backend.Models
{
    public class Documents
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public byte[] Content { get; set; }
    }
}
