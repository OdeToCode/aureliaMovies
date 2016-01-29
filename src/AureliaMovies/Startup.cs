using AureliaMovies.Data;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;

namespace AureliaMovies
{
    public class Startup
    {
        public Startup(IApplicationEnvironment applicationEnvironment)
        {
            Configuration = 
                new ConfigurationBuilder()
                    .AddJsonFile("config.json")
                    .Build();
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(p => Configuration);
            services.AddMvc();            
            services.AddEntityFramework()
                    .AddSqlServer()
                    .AddDbContext<MoviesData>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseFileServer();
            app.UseDeveloperExceptionPage();
            app.UseMvc(routes =>
            {
                routes.MapRoute("Default", "{controller=Home}/{action=Index}");
            });

            var seeder = new DatabaseSeed(new MoviesData(Configuration));
            seeder.Seed();
        }
    }
}
