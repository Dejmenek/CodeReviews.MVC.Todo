using Microsoft.EntityFrameworkCore;
using Todo.API.Models;

namespace Todo.API;

public class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options) : base(options)
    {
    }
    public DbSet<TodoItem> Todos { get; set; }
}
