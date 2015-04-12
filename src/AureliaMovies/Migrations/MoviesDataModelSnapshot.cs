using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using AureliaMovies.Data;

namespace AureliaMovies.Migrations
{
    [ContextType(typeof(MoviesData))]
    partial class MoviesDataModelSnapshot : ModelSnapshot
    {
        public override IModel Model
        {
            get
            {
                var builder = new BasicModelBuilder();
                
                builder.Entity("AureliaMovies.Model.Movie", b =>
                    {
                        b.Property<int>("Id")
                            .GenerateValueOnAdd()
                            .Annotation("SqlServer:ValueGeneration", "Default");
                        b.Property<int>("ReleaseYear");
                        b.Property<string>("Title");
                        b.Key("Id");
                    });
                
                return builder.Model;
            }
        }
    }
}
