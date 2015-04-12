using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;

namespace AureliaMovies.Migrations
{
    public partial class InitialCreate : Migration
    {
        public override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Movie",
                x => new
                {
                    Id = x.Column("int", annotations: new Dictionary<string, string> { { "SqlServer:ValueGeneration", "Identity" } }),
                    ReleaseYear = x.Column("int"),
                    Title = x.Column("nvarchar(max)", nullable: true)
                })
                .PrimaryKey(x => x.Id, name: "PK_Movie");
        }
        
        public override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Movie");
        }
    }
}
