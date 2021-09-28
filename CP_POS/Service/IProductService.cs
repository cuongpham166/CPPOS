using CP_POS.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CP_POS.Service
{
    public interface IProductService
    {
        List<SelectListItem> ListAllSuppliers();
    }
}
