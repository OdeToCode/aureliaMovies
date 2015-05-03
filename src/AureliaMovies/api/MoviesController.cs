using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using AureliaMovies.Data;
using AureliaMovies.Model;
using System.Linq;
using Microsoft.Data.Entity;

namespace AureliaMovies.Api.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        MoviesData _db;

        public MoviesController(MoviesData db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _db.Movies;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _db.Movies.FirstOrDefault(m => m.Id == id);
            if(movie == null)
            {
                return HttpNotFound();
            }
            return new ObjectResult(movie);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Movie newMovie)
        {            
            if(ModelState.IsValid)
            {
                _db.Movies.Add(newMovie);
                _db.SaveChanges();
                return CreatedAtRoute(new { controller = "Movies", id = newMovie.Id }, newMovie);
            }
            return HttpBadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Movie updatedMovie)
        {
            if (ModelState.IsValid)
            {
                _db.Movies.Attach(updatedMovie).State = EntityState.Modified;
                _db.SaveChanges();
                return new ObjectResult(updatedMovie);
            }
            return HttpBadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _db.Movies.FirstOrDefault(m => m.Id == id);
            if(movie != null)
            {
                _db.Movies.Remove(movie);
                _db.SaveChanges();
                return new ObjectResult(movie);
            }
            return HttpNotFound();
        }
    }
}
