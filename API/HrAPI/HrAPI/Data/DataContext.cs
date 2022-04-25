using HrAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HrAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }

    }
}
