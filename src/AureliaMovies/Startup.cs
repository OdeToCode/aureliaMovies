using AureliaMovies.Data;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;

namespace AureliaMovies
{
    public class Startup
    {
        public Startup()
        {
            Configuration = new Configuration().AddJsonFile("config.json");
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();            
            services.AddEntityFramework(Configuration)
                    .AddSqlServer()
                    .AddDbContext<MoviesData>();
        }

        public void Configure(IApplicationBuilder app)
        {
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