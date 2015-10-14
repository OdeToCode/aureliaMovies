using AureliaMovies.Data;
using Microsoft.AspNet.Builder;
using Microsoft.Dnx.Runtime;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.DependencyInjection;


namespace AureliaMovies
{
    public class Startup
    {
        public Startup(IApplicationEnvironment applicationEnvironment)
        {
            Configuration = 
                new ConfigurationBuilder(applicationEnvironment.ApplicationBasePath)
                    .AddJsonFile("config.json")
                    .Build();
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();            
            services.AddEntityFramework()
                    .AddSqlServer()
                    .AddDbContext<MoviesData>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseErrorPage();
            app.UseMvc(routes =>
            {
                routes.MapRoute("Default", "{controller=Home}/{action=Index}");
            });

            var seeder = new DatabaseSeed(new MoviesData(Configuration));
            seeder.Seed();
        }
    }
}


// intro
// views and view models
// startup, config, routing
// templating
// finale