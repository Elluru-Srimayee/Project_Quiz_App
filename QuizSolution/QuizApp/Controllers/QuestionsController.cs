using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Services;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IQuizResultService _quizResultService;

        // Constructor injection of services
        public QuestionsController(IQuestionService questionService, IQuizResultService quizResultService)
        {
            _questionService = questionService;
            _quizResultService = quizResultService;
        }

        // Endpoint to add a question to a quiz
        [Authorize(Roles = "Creator")]
        [HttpPost("add")]
        public IActionResult AddToQuiz(QuestionDTO questionDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                // Attempt to add the question to the quiz
                var result = _questionService.AddToQuiz(questionDTO);

                if (result)
                    return Ok(questionDTO); // Return success response
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }

            return BadRequest(errorMessage); // Return error response
        }

        // Endpoint to update a question in a quiz
        [Authorize(Roles = "Creator")]
        [HttpPut("update/{quizId}/question/{questionId}")]
        public IActionResult UpdateQuestion(int quizId, int questionId, [FromBody] Questions updatedQuestion)
        {
            try
            {
                // Attempt to update the question
                _questionService.UpdateQuestion(quizId, questionId, updatedQuestion);

                return Ok($"Question with ID {questionId} in Quiz with ID {quizId} updated successfully.");
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to update the question. {e.Message}");
            }
        }

        // Endpoint to get all questions
        [Authorize("Creator")]
        [HttpGet("getAll")]
        public IActionResult GetAllQuestions()
        {
            string errorMessage = string.Empty;
            try
            {
                // Get all questions
                var questions = _questionService.GetAllQuestions();

                return Ok(questions); // Return the questions
            }
            catch (NoQuestionsAvailableException e)
            {
                errorMessage = e.Message;
            }

            return BadRequest(errorMessage); // Return error response
        }

        // Endpoint to get questions by quiz ID
        [Authorize]
        [HttpGet("byquiz/{quizId}")]
        public ActionResult<IEnumerable<Questions>> GetQuestionsByQuizId(int quizId)
        {
            string errorMessage = string.Empty;
            try
            {
                // Get questions by quiz ID
                var questions = _questionService.GetQuestionsByQuizId(quizId);

                return Ok(questions); // Return the questions
            }
            catch (NoQuestionsAvailableException e)
            {
                errorMessage = e.Message;
            }

            return NotFound($"No questions found for Quiz ID {quizId}." + errorMessage); // Return error response
        }

        // Endpoint to remove a question from a quiz
        [Authorize(Roles = "Creator")]
        [HttpDelete("Remove")]
        public IActionResult RemoveFromQuiz(int quizid, int questionid)
        {
            // Attempt to remove the question from the quiz
            var result = _questionService.RemoveFromQuiz(quizid, questionid);

            if (result)
                return Ok("Deleted Question Successfully"); // Return success response

            return BadRequest("Could not remove the Question from quiz"); // Return error response
        }
    }
}
