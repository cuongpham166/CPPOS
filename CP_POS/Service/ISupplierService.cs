using CP_POS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Service
{
    public interface ISupplierService
    {
        List<SelectListItem> ListAllStates();
        IQueryable<SupplierModel> ReadAllSuppliers();

        SupplierModel CreateNewSupplier();
        Task<SupplierModel> SaveNewSupplier(SupplierModel supplierModel);
        Task<SupplierModel> GetSupplierById(int? Id);
        Task<SupplierModel> EditSupplier(int Id, SupplierModel supplierModel);

        IQueryable<SupplierModel> SearchSupplier(string searchString);
        List<SupplierModel> SortSupplier(string name, string sort, string search);

    }
}
