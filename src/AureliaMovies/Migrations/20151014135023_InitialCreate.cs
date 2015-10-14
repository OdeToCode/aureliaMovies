using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.SqlServer.Metadata;

namespace AureliaMovies.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(isNullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerIdentityStrategy.IdentityColumn),
                    ReleaseYear = table.Column<int>(isNullable: false),
                    Title = table.Column<string>(isNullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Movie");
        }
    }
}
