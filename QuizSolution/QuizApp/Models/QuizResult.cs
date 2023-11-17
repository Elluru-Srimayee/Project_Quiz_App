using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class QuizResult
    {
        [Key]
        
            public int Id { get; set; }
            public int QuizId { get; set; }
            public string Username { get; set; }
            public int Score { get; set; }
            public List<Feedback> Feedback { get; set; }
    }
}
