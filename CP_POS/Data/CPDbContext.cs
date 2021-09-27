using CP_POS.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Data
{
    public class CPDbContext:DbContext
    {
        public  CPDbContext (DbContextOptions<CPDbContext> options) : base(options) { }
        public DbSet<SupplierModel> Suppliers { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SupplierModel>().ToTable("Supplier");

            modelBuilder.Entity<SupplierModel>()
                .HasOne(p => p.ProductModel)
                .WithOne(s => s.SupplierModel)
                .HasForeignKey<ProductModel>(p => p.SupplierId);

            modelBuilder.Entity<CategoryModel>().ToTable("Category");

            modelBuilder.Entity<ProductModel>().ToTable("Product");

            modelBuilder.Entity<ProductModel>().Property(p => p.Created).HasDefaultValueSql("getdate()");


        }
    }
}
