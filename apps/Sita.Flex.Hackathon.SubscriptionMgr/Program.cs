using Sita.Flex.Hackathon.SubscriptionMgr.Contract;
using Sita.Flex.Hackathon.SubscriptionMgr.Model;
using Sita.Flex.Hackathon.SubscriptionMgr.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<AppIdentityConfig>(
    builder.Configuration.GetSection("Authentication"));
builder.Services.AddSingleton<ISubscriptionRepository, InMemorySubscriptionRepo>();
builder.Services.AddHostedService<MessageProcessor>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
