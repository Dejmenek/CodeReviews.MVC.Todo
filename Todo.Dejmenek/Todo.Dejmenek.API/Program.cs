using Todo.API.Endpoints;
using Todo.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.RegisterServices();

var app = builder.Build();

app.RegisterMiddlewares();

app.RegisterTodosEnpoints();

app.Run();
