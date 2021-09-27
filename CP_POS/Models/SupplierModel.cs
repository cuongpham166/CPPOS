using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Models
{
    public class SupplierModel
    {
        [Key]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Supplier Name is required")]
        [DataType(DataType.Text)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Phone")]
        public string Phone { get; set; }

        public string Email { get; set; }

        [Required(ErrorMessage = "Number is required")]
        public string Number { get; set; }

        [Required(ErrorMessage = "Street Name is required")]
        public string Street { get; set; }

        [Required(ErrorMessage = "Postcode is required")]
        [Range(100, 999999999)]
        [DataType(DataType.PostalCode)]
        public int Postcode { get; set; }

        [Required(ErrorMessage = "City is required")]
        [DataType(DataType.Text)]
        public string City { get; set; }

        [Required(ErrorMessage = "State is Required")]
        [DataType(DataType.Text)]
        public string State { get; set; }

        [NotMapped]
        //This prevents EntityFramework from mapping the list to the model. Since it's not part of the model database, it doesn't require a primary key.
        public IEnumerable<SelectListItem> States { set; get; }

        public virtual ProductModel ProductModel { get; set; }
    }
}
