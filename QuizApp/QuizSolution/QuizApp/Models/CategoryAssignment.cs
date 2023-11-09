using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class CategoryAssignment
    {
        [Key]
        public int AssignmentId { get; set; }
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
    }
}
