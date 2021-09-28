using CP_POS.Data;
using CP_POS.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Service
{
    public class ProductService:IProductService
    {
        private readonly CPDbContext _context;
        private readonly SupplierService _supplier;
        public ProductService(CPDbContext context, SupplierService supplier)
        {
            _context = context;
            _supplier = supplier;
        }

        public List<SelectListItem> ListAllSuppliers()
        {
            List<SelectListItem> suppliers = new List<SelectListItem>();
            var result = _supplier.ReadAllSuppliers().ToList();
            foreach(var element in result)
            {
                int elementId = element.Id;
                SelectListItem selListItem = new SelectListItem() { Value = elementId.ToString(), Text = element.Name };
                suppliers.Add(selListItem);
            }
            return suppliers; 
        }
    }
}
