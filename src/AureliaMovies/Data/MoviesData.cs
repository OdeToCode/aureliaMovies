using AureliaMovies.Model;
using Microsoft.Data.Entity;
using Microsoft.Framework.ConfigurationModel;

namespace AureliaMovies.Data
{
    public class MoviesData : DbContext
    {
        public MoviesData()
        {

        }

        public MoviesData(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Movie> Movies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=(localdb)\\mssqllocaldb; Database = movies; integrated security = True";
            if (_configuration != null)
            {
                connectionString = _configuration.Get("EntityFramework:MoviesData:ConnectionString");
            }
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }

        IConfiguration _configuration;
    }
}