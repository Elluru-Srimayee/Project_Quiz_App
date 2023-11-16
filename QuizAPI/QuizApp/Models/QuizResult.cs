using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class QuizResult
    {
        [Key]
        public int ResultId { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [ForeignKey("Quiz")]
        public string QuizId { get; set; }
        public int Score { get; set; }
        public DateTime SubmissionTime { get; set; }
    }
}
