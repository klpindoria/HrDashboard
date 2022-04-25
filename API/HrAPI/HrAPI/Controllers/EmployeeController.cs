using HrAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HrAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        private readonly DataContext dataContext;

        public EmployeeController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await this.dataContext.Employees.ToListAsync();
            if (!employees.Any())
            {
                return BadRequest("No Employees Found");
            }
            return Ok(employees);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetSingleEmployee(int id)
        {
            var employee = await this.dataContext.Employees.FindAsync(id);
            if (employee == null) { return BadRequest("No matching employee found"); }
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployees(Employee employee)
        {
            employee.CreatedDate = DateTimeOffset.UtcNow;
            this.dataContext.Employees.Add(employee);
            await this.dataContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployees(Employee updatedEmployee)
        {
            var employee = await this.dataContext.Employees.FindAsync(updatedEmployee.Id);
            if (employee == null) { return BadRequest("No matching employee found"); }

            if (updatedEmployee.FirstName.Any()) { employee.FirstName = updatedEmployee.FirstName; }
            if (updatedEmployee.LastName.Any()) { employee.LastName = updatedEmployee.LastName; }
            if (updatedEmployee.Address.Any()) { employee.Address = updatedEmployee.Address; }
            if (updatedEmployee.Age > 0) { employee.Age = updatedEmployee.Age; }

            employee.UpdatedDate = DateTimeOffset.UtcNow;

            await this.dataContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete("id")]
        public async Task<IActionResult> RemoveEmployee(int id)
        {
            var employee = await this.dataContext.Employees.FindAsync(id);
            if (employee == null) { return BadRequest("No matching employee found"); }

            employee.DeletedDate = DateTimeOffset.UtcNow;
            await this.dataContext.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
