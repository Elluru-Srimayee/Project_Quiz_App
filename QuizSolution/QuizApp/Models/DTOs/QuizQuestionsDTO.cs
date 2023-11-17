using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models.DTOs
{
    public class QuizQuestionsDTO
    {
        [Required(ErrorMessage = "Username is empty")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Question Id is empty")]
        public int QuestionId { get; set; }
        public string QuestionTxt { get; set; }
        public string? Options { get; set; } = string.Empty;
        public int QuizId { get; set; }
    }
}
