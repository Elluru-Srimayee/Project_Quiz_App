//using Microsoft.Data.Tools.Schema.Sql.UnitTesting;
//using Microsoft.Data.Tools.Schema.Sql.UnitTesting.Conditions;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.Common;
//using System.Text;

//namespace QuizAppTest
//{
//    [TestClass()]
//    public class QuizServiceTest : SqlDatabaseTestClass
//    {

//        public QuizServiceTest()
//        {
//            InitializeComponent();
//        }

//        [TestInitialize()]
//        public void TestInitialize()
//        {
//            base.InitializeTest();
//        }
//        [TestCleanup()]
//        public void TestCleanup()
//        {
//            base.CleanupTest();
//        }

//        [TestMethod()]
//        public void SqlTest1()
//        {
//            SqlDatabaseTestActions testActions = this.SqlTest1Data;
//            // Execute the pre-test script
//            // 
//            System.Diagnostics.Trace.WriteLineIf((testActions.PretestAction != null), "Executing pre-test script...");
//            SqlExecutionResult[] pretestResults = TestService.Execute(this.PrivilegedContext, this.PrivilegedContext, testActions.PretestAction);
//            // Execute the test script
//            // 
//            System.Diagnostics.Trace.WriteLineIf((testActions.TestAction != null), "Executing test script...");
//            SqlExecutionResult[] testResults = TestService.Execute(this.ExecutionContext, this.PrivilegedContext, testActions.TestAction);
//            // Execute the post-test script
//            // 
//            System.Diagnostics.Trace.WriteLineIf((testActions.PosttestAction != null), "Executing post-test script...");
//            SqlExecutionResult[] posttestResults = TestService.Execute(this.PrivilegedContext, this.PrivilegedContext, testActions.PosttestAction);
//        }

//        #region Designer support code

//        /// <summary> 
//        /// Required method for Designer support - do not modify 
//        /// the contents of this method with the code editor.
//        /// </summary>
//        private void InitializeComponent()
//        {
//            this.SqlTest1Data = new SqlDatabaseTestActions();
//            // 
//            // SqlTest1Data
//            // 
//            this.SqlTest1Data.PosttestAction = null;
//            this.SqlTest1Data.PretestAction = null;
//            this.SqlTest1Data.TestAction = null;
//        }

//        #endregion


//        #region Additional test attributes
//        //
//        // You can use the following additional attributes as you write your tests:
//        //
//        // Use ClassInitialize to run code before running the first test in the class
//        // [ClassInitialize()]
//        // public static void MyClassInitialize(TestContext testContext) { }
//        //
//        // Use ClassCleanup to run code after all tests in a class have run
//        // [ClassCleanup()]
//        // public static void MyClassCleanup() { }
//        //
//        #endregion

//        private SqlDatabaseTestActions SqlTest1Data;
//    }
//}
using QuizApp.Contexts;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;
using QuizApp.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizAppTest
{
    public class QuizServiceTest
    {
        IRepository<int, Quiz> repository;
        IRepository<int, Questions> questionRepository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<QuizContext>()
                                .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                                .Options;
            QuizContext context = new QuizContext(dbOptions);
            repository = new QuizRepository(context);
            questionRepository = new QuestionRepository(context);
        }

        [Test]
        public void AddQuizTest()
        {
            //Arragne
            IQuizService quizService = new QuizService(repository, questionRepository);
            var quiz = new Quiz
            {
                Title = "TestAddQuiz",
                Description = "TestTheDescription",
                Category="TestCategory",
                TimeLimit=30

            };


            // Act
            var result = quizService.Add(quiz);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(quiz, result);
        }
        [Test]
        public void GetQuizTest()
        {
            // Arrange
            IQuizService quizService = new QuizService(repository, questionRepository);
            string city = "Test";
            var quiz = new Quiz
            {
                Title = "TestAddQuiz",
                Description = "TestTheDescription",
                Category = "TestCategory",
                TimeLimit = 30

            };

            // Act
            quizService.Add(quiz);
            var result = quizService.GetQuizs();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);

        }
        [Test]
        public void UpdateTest()
        {
            //Arrange
            IQuizService quizService = new QuizService(repository, questionRepository);
            int id = 2;
            var quiz = new Quiz
            {
                Title = "TestAddQuiz",
                Description = "TestTheDescription",
                Category = "TestCategory",
                TimeLimit = 10
            };

            //Act
            var result = quizService.UpdateQuiz(quiz);

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(quiz, result);
        }
        [Test]
        public void DeleteTest()
        {
            //Arrange
            IQuizService quizService = new QuizService(repository, questionRepository);
            int id = 1;

            //Act
            var result = quizService.DeleteQuizIfNoQuestions(id);

            //Assert
            Assert.IsTrue(result);
        }
    }
}