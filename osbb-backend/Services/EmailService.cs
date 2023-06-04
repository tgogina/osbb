using Microsoft.Extensions.Options;

using osbb_backend.Models;

using System.Net.Mail;
using System.Net;

namespace osbb_backend.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailModel message, MailAddress reciever);
    }
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;
        public EmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task SendEmailAsync(EmailModel message, MailAddress reciever)
        {
            var SMTPServer = _settings.SMTPServer;
            var Port = _settings.Port;
            var SenderName = _settings.SenderName;
            var Sender = _settings.Sender;
            var Password = _settings.Password;


            MailAddress from = new MailAddress(Sender, SenderName);
            var emailMessage = new MailMessage(from, reciever);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = message.Message;
            emailMessage.IsBodyHtml = true;

            try
            {
                var client = new SmtpClient
                {
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    EnableSsl = true,
                    Host = SMTPServer,
                    Port = Port,
                    Credentials = new NetworkCredential(Sender, Password)
                };
                await client.SendMailAsync(emailMessage);
                emailMessage.Dispose();
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong", ex);
            }
        }
    }
}
