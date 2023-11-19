using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
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

        public QuizResultController(IQuizResultService quizResultService)
        {
            _quizResultService = quizResultService;
        }
        [Authorize]
        [HttpGet("byQuiz/{quizId}")]
        public ActionResult<IEnumerable<QuizResultDTO>> GetResultsByQuiz(int quizId)
        {
            try
            {
                var results = _quizResultService.GetResultsByQuiz(quizId);
                var resultDTOs = MapToQuizResultDTOs(results);
                return Ok(resultDTOs);
            }
            catch (NoQuizResultsAvailableException e)
            {
                return NotFound($"No quiz results found for Quiz ID {quizId}. {e.Message}");
            }
         }
        [Authorize]
        [HttpGet("results/{username}/{quizId}")]
        public ActionResult<IList<QuizResultDTO>> GetResultsByUserAndQuiz(string username, int quizId)
        {
            try
            {
                var results = _quizResultService.GetResultsByUserAndQuiz(username, quizId);
                return Ok(results);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to retrieve quiz results. {e.Message}");
            }
        }

        [Authorize]
        [HttpGet("mapToQuizResultDTOs")]
        public ActionResult<List<QuizResultDTO>> MapToQuizResultDTOs(IList<QuizResult> results)
        {
            var resultDTOs = new List<QuizResultDTO>();

            foreach (var result in results)
            {
                var resultDTO = new QuizResultDTO
                {
                    UserAnswer=result.UserAnswer,
                    Username = result.Username,
                    QuizId = result.QuizId,
                    Score = result.Score,
                    QuestionId=result.QuestionId,
                    IsCorrect=result.IsCorrect,
                   
                };

                resultDTOs.Add(resultDTO);
            }

            return resultDTOs;
        }
        [Authorize]
        [HttpGet("totalscore/{quizId}/{username}")]
        public ActionResult<int> GetTotalScoreForUserInQuiz(int quizId, string username)
        {
            try
            {
                var totalScore = _quizResultService.GetTotalScoreForUserInQuiz(quizId, username);
                return Ok(totalScore);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to get total score. {e.Message}");
            }
        }

    }
}
