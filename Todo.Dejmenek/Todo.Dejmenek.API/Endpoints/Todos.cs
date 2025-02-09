using Microsoft.EntityFrameworkCore;
using Todo.API.Models;

namespace Todo.API.Endpoints;

public static class Todos
{
    public static void RegisterTodosEnpoints(this IEndpointRouteBuilder routes)
    {
        var todos = routes.MapGroup("api/todoitems");
        todos.MapGet("", async (TodoDb db) =>
            await db.Todos.ToListAsync());

        todos.MapGet("/complete", async (TodoDb db) =>
            await db.Todos.Where(t => t.IsComplete).ToListAsync());

        todos.MapGet("/{id}", async (int id, TodoDb db) =>
            await db.Todos.FindAsync(id)
            is TodoItem todo
                ? Results.Ok(todo)
                : Results.NotFound());

        todos.MapPost("", async (TodoItem todo, TodoDb db) =>
        {
            db.Todos.Add(todo);
            await db.SaveChangesAsync();

            return Results.Created($"/todoitems/{todo.Id}", todo);
        });

        todos.MapPut("/{id}", async (int id, TodoItem inputTodo, TodoDb db) =>
        {
            var todo = await db.Todos.FindAsync(id);

            if (todo is null) return Results.NotFound();

            todo.Name = inputTodo.Name;
            todo.IsComplete = inputTodo.IsComplete;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        todos.MapDelete("/{id}", async (int id, TodoDb db) =>
        {
            if (await db.Todos.FindAsync(id) is TodoItem todo)
            {
                db.Todos.Remove(todo);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }

            return Results.NotFound();
        });
    }
}
