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

        [HttpGet("byUser/{userId}")]
        public ActionResult<IEnumerable<QuizResultDTO>> GetResultsByUser(string username)
        {
            try
            {
                var results = _quizResultService.GetResultsByUser(username);
                var resultDTOs = MapToQuizResultDTOs(results);
                return Ok(resultDTOs);
            }
            catch (NoQuizResultsAvailableException e)
            {
                return NotFound($"No quiz results found for User ID {username}. {e.Message}");
            }
        }

        [HttpPost]
        public ActionResult AddResult(QuizResultDTO quizResultDTO)
        {
            try
            {
                var result = MapToQuizResult(quizResultDTO);
                _quizResultService.AddQuizResult(result);
                return Ok("Quiz result added successfully.");
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to add quiz result. {e.Message}");
            }
        }
        [HttpGet("mapToQuizResultDTOs")]
        public ActionResult<List<QuizResultDTO>> MapToQuizResultDTOs(IList<QuizResult> results)
        {
            var resultDTOs = new List<QuizResultDTO>();

            foreach (var result in results)
            {
                var resultDTO = new QuizResultDTO
                {
        
                    Username = result.Username,
                    QuizId = result.QuizId,
                    Score = result.Score,
                   
                };

                resultDTOs.Add(resultDTO);
            }

            return resultDTOs;
        }
        [HttpGet("mapToQuizResult")]
        private QuizResult MapToQuizResult(QuizResultDTO quizResultDTO)
        {
            return new QuizResult
            {
                Username = quizResultDTO.Username,
                QuizId = quizResultDTO.QuizId,
                Score = quizResultDTO.Score,
                
            };
        }
        [HttpGet("results")]
        public ActionResult<IEnumerable<QuizResultDTO>> GetAllQuizResults()
        {
            try
            {
                var results = _quizResultService.GetAllQuizResults();
                return Ok(results);
            }
            catch (NoQuizResultsAvailableException e)
            {
                return NotFound($"No quiz results found. {e.Message}");
            }
        }

    }
}
