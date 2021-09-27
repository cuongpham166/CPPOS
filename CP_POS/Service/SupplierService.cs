using CP_POS.Data;
using CP_POS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace CP_POS.Service
{
    public class SupplierService:ISupplierService
    {
        private readonly CPDbContext _context;
        public SupplierService(CPDbContext context)
        {
            _context = context;
        }
        public List<SelectListItem> ListAllStates()
        {
            List<SelectListItem> states = new List<SelectListItem>{
                new SelectListItem {Text = "Baden-Württemberg", Value = "BW"},
                new SelectListItem {Text = "Bayern", Value = "BY"},
                new SelectListItem {Text = "Berlin", Value = "BE"},
                new SelectListItem {Text = "Brandenburg", Value = "BB"},
                new SelectListItem {Text = "Bremen", Value = "HB"},
                new SelectListItem {Text = "Hamburg", Value = "HH"},
                new SelectListItem {Text = "Hessen", Value = "HE"},
                new SelectListItem {Text = "Mecklenburg-Vorpommern", Value = "MV"},
                new SelectListItem {Text = "Niedersachsen", Value = "NI"},
                new SelectListItem {Text = "Nordrhein-Westfalen", Value = "NW"},
                new SelectListItem {Text = "Rheinland-Pfalz", Value = "RP"},
                new SelectListItem {Text = "Saarland", Value = "SL"},
                new SelectListItem {Text = "Sachsen-Anhalt", Value = "ST"},
                new SelectListItem {Text = "Sachsen", Value = "SN"},
                new SelectListItem {Text = "Schleswig-Holstein", Value = "SH"},
                new SelectListItem {Text = "Thüringen", Value = "TH"},
            };
            return states;
        }

        public IQueryable<SupplierModel> ReadAllSuppliers()
        {
            var suppliers = from s in _context.Suppliers select s;
            suppliers = suppliers.OrderBy(s => s.Name);
            return suppliers;
        }

        public SupplierModel CreateNewSupplier()
        {
            var supplierModel = new SupplierModel();
            supplierModel.States = ListAllStates();
            return supplierModel;
        }

        public async Task<SupplierModel> SaveNewSupplier(SupplierModel supplierModel)
        {
            _context.Add(supplierModel);
            await _context.SaveChangesAsync();
            return supplierModel;
        }

        public async Task<SupplierModel> GetSupplierById(int? Id)
        {
            var supplier = await _context.Suppliers.FindAsync(Id);
            supplier.States = ListAllStates();
            return supplier;
        }

        public async Task<SupplierModel> EditSupplier(int Id, SupplierModel supplierModel)
        {
            SupplierModel supplier = await _context.Suppliers.FindAsync(Id);
            if (supplier != null)
            {
                supplier.City = supplierModel.City;
                supplier.Email = supplierModel.Email;
                supplier.Name = supplierModel.Name;
                supplier.Number = supplierModel.Number;
                supplier.Phone = supplierModel.Phone;
                supplier.Postcode = supplier.Postcode;
                supplier.State = supplier.State;
                supplier.Street = supplier.Street;
                _context.Update(supplier);
                await _context.SaveChangesAsync();
            }
            return supplier;
        }

        public IQueryable<SupplierModel> SearchSupplier(string searchString)
        {
            var suppliers = from s in _context.Suppliers select s;
            suppliers = suppliers.Where(s =>
                s.City.Contains(searchString) ||
                s.Email.Contains(searchString) ||
                s.Name.Contains(searchString) ||
                s.Number.Contains(searchString) ||
                s.Postcode.ToString().Contains(searchString) ||
                s.State.Contains(searchString) ||
                s.Phone.Contains(searchString) ||
                s.Street.Contains(searchString)).OrderBy(s => s.Name);
            return suppliers;
        }

        public List<SupplierModel> SortSupplier(string name, string sort, string search)
        {
            string orderText = name + " " + sort;
            var suppliers = _context.Suppliers.OrderBy(orderText).ToList();
            if (!string.IsNullOrEmpty(search))
            {
                suppliers = _context.Suppliers.Where(s =>
                        s.City.Contains(search) ||
                        s.Email.Contains(search) ||
                        s.Name.Contains(search) ||
                        s.Number.Contains(search) ||
                        s.Postcode.ToString().Contains(search) ||
                        s.State.Contains(search) ||
                        s.Phone.Contains(search) ||
                        s.Street.Contains(search)).OrderBy(orderText).ToList();
            }
            return suppliers;
        }
    }
}
