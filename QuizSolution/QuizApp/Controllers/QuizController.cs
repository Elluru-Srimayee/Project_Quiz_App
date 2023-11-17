using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }
        [HttpGet]
        public ActionResult Get()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.GetQuizs();
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [Authorize(Roles = "Creator")]
        [HttpPost]
        public ActionResult Create(Quiz quiz)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.Add(quiz);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost("{id}")]
        public async Task<ActionResult> GetById(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = await _quizService.GetQuizByIdWithQuestions(quizDTO.Id);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost("category/{category}")]
        public async Task<ActionResult> GetByCategory(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = await _quizService.GetQuizzesByCategoryAsync(quizDTO.Category);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }

    }
}
