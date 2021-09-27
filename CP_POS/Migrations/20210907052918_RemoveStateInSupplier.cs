using Microsoft.EntityFrameworkCore.Migrations;

namespace CP_POS.Migrations
{
    public partial class RemoveStateInSupplier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notice",
                table: "Supplier");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notice",
                table: "Supplier",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
