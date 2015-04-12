using AureliaMovies.Model;
using System;
using System.Linq;

namespace AureliaMovies.Data
{
    public class DatabaseSeed
    {
        MoviesData _db;
        public DatabaseSeed(MoviesData db)
        {
            _db = db;
        }

        public void Seed()
        {
            if (_db.Movies.Count() == 0)
            {
                _db.Movies.AddRange(
                    new Movie { Title="Star Wars", ReleaseYear=1983},
                    new Movie { Title="Star Trek", ReleaseYear=1981},
                    new Movie { Title="Shrek", ReleaseYear=2004}
                );
                _db.SaveChanges();
            }
        }
    }
}