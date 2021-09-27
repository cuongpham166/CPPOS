using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Product Name is required")]
        [DataType(DataType.Text)]
        [Display(Name = "Name")]
        public string Name { get; set; }
        public string Type { get; set; }

        [Required(ErrorMessage = "Product Price is required")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Product VAT is required")]
        [Column(TypeName = "decimal(3, 2)")]
        public decimal VAT { get; set; }
        public DateTime Created { get; set; }

        public int SupplierId { get; set; }
        public virtual SupplierModel SupplierModel { get; set; }

    }
}
