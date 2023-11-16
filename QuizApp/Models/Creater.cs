using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models
{
    public class Creater
    {
        [Key]
        public int CreaterId { get; set; }
        public string Username { get; set; }
        public byte[] Password { get; set; }
       
    }
}
