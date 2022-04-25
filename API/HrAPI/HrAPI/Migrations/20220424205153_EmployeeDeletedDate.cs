using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HrAPI.Migrations
{
    public partial class EmployeeDeletedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DeletedDate",
                table: "Employees",
                type: "datetimeoffset",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Employees");
        }
    }
}
