using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using AureliaMovies.Data;

namespace AureliaMovies.Migrations
{
    [ContextType(typeof(MoviesData))]
    partial class InitialCreate
    {
        public override string Id
        {
            get { return "20150412165002_InitialCreate"; }
        }
        
        public override string ProductVersion
        {
            get { return "7.0.0-beta4-12599"; }
        }
        
        public override IModel Target
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
