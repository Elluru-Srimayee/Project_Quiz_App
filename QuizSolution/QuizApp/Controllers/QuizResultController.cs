using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models.DTOs;
using System;
using System.Collections.Generic;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizResultController : ControllerBase
    {
        private readonly IQuizResultService _quizResultService;

        // Inject the quiz result service through constructor injection
        public QuizResultController(IQuizResultService quizResultService)
        {
            _quizResultService = quizResultService;
        }

        // Endpoint to get quiz results by quiz ID
        [Authorize(Roles = "Creator")]
        [HttpGet("byQuiz/{quizId}")]
        public ActionResult<IEnumerable<QuizResultDTO>> GetResultsByQuiz(int quizId)
        {
            try
            {
                // Get quiz results for the specified quiz ID
                var results = _quizResultService.GetResultsByQuiz(quizId);

                return Ok(results); // Return the quiz results
            }
            catch (NoQuizResultsAvailableException e)
            {
                return NotFound($"No quiz results found for Quiz ID {quizId}. {e.Message}");
            }
        }

        // Endpoint to get quiz results with total score by user and quiz ID
        [Authorize]
        [HttpGet("results-with-total-score/{username}/{quizId}")]
        public ActionResult<QuizResultsWithTotalScoreDTO> GetResultsWithTotalScoreByUserAndQuiz(string username, int quizId)
        {
            try
            {
                // Get quiz results for the specified user and quiz ID
                var results = _quizResultService.GetResultsByUserAndQuiz(username, quizId);

                // Get total score for the specified user and quiz ID
                var totalScore = _quizResultService.GetTotalScoreForUserInQuiz(quizId, username);

                // Create DTO containing both quiz results and total score
                var resultsWithTotalScoreDTO = new QuizResultsWithTotalScoreDTO
                {
                    TotalScore = totalScore,
                    QuizResults = results
                };

                return Ok(resultsWithTotalScoreDTO); // Return the DTO
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to retrieve quiz results with total score. {e.Message}");
            }
        }

        // Endpoint to get total score by quiz and username
        [Authorize]
        [HttpGet("totalscore/{quizId}/{username}")]
        public ActionResult<int> GetTotalScoreForUserInQuiz(int quizId, string username)
        {
            try
            {
                // Get total score for the specified user and quiz ID
                var totalScore = _quizResultService.GetTotalScoreForUserInQuiz(quizId, username);

                // Return the total score
                return Ok("The Total Score is:" + totalScore);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to get total score. {e.Message}");
            }
        }
    }
}
