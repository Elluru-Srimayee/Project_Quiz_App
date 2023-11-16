using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizApp.Migrations
{
    public partial class UpdatedQuestions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Option_Question_QuestionsQuestionId",
                table: "Option");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_Quizs_QuestionId",
                table: "Question");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Question",
                table: "Question");

            migrationBuilder.RenameTable(
                name: "Question",
                newName: "Questions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Questions",
                table: "Questions",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Option_Questions_QuestionsQuestionId",
                table: "Option",
                column: "QuestionsQuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Quizs_QuestionId",
                table: "Questions",
                column: "QuestionId",
                principalTable: "Quizs",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Option_Questions_QuestionsQuestionId",
                table: "Option");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Quizs_QuestionId",
                table: "Questions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Questions",
                table: "Questions");

            migrationBuilder.RenameTable(
                name: "Questions",
                newName: "Question");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Question",
                table: "Question",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Option_Question_QuestionsQuestionId",
                table: "Option",
                column: "QuestionsQuestionId",
                principalTable: "Question",
                principalColumn: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_Quizs_QuestionId",
                table: "Question",
                column: "QuestionId",
                principalTable: "Quizs",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
