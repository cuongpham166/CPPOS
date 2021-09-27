using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CP_POS.Data;
using CP_POS.Models;
using Microsoft.AspNetCore.Http;
using System.Text;
using System;
using System.IO;
using ClosedXML.Excel;
using System.Reflection.Metadata;
using iTextSharp.text.pdf;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Linq.Dynamic.Core;
using System.Collections;
using iTextSharp.text.log;
using CP_POS.Service;

namespace CP_POS.Controllers
{
    public class SupplierController : Controller
    {
        private readonly CPDbContext _context;
        private readonly IExportService _export;
        private readonly ISupplierService _supplier;
        public SupplierController(CPDbContext context, IExportService export, ISupplierService supplier)
        {
            _context = context;
            _export = export;
            _supplier = supplier;
        }

        public List<SelectListItem> ListAllStates()
        {
            List<SelectListItem> states = new List<SelectListItem>();
            states = _supplier.ListAllStates();
            return states;
        }

        // GET: Supplier
        public async Task<IActionResult> Index()
        {
            var suppliers = _supplier.ReadAllSuppliers();
            return View(await suppliers.AsNoTracking().ToListAsync());
        }

        // GET: Supplier/Create
        public IActionResult Create()
        {
            //var supplierModel = new SupplierModel();
            //supplierModel.States = ListAllStates();
            var supplierModel = _supplier.CreateNewSupplier();
            return View(supplierModel);
        }

        // POST: Supplier/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Phone,Email,Number,Street,Postcode,City,State")] SupplierModel supplierModel)
        {
            if (ModelState.IsValid)
            {
                await _supplier.SaveNewSupplier(supplierModel);
                return RedirectToAction(nameof(Index));
            }
            return View(supplierModel);
        }

        // GET: Supplier/Edit
        public async Task<IActionResult>Edit(int ?Id)
        {
            try
            {
                if (Id == null)
                {
                    return View();
                }
                else
                {
                    var supplier = await _supplier.GetSupplierById(Id);
                    if (supplier == null)
                    {
                        return NotFound();
                    }
                    return View(supplier);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        //POST: Supplier/Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int Id, SupplierModel supplierModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _supplier.EditSupplier(Id, supplierModel);
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }
            return View(supplierModel);
        }

        private bool SupplieModelExists(int id)
        {
            return _context.Suppliers.Any(e => e.Id == id);
        }

        private List<SupplierModel> GetSuppliers()
        {
            var suppliers = _context.Suppliers.ToList();
            return suppliers;
        }

        [HttpGet]
        public JsonResult SortSupplierData(string name, string sort,string search) //name: feld name, sort: asc or desc
        {
            
            var suppliers = _supplier.SortSupplier(name, sort, search);
            return Json(suppliers);
        }

        [HttpGet]
        public JsonResult SearchSupplierData(string searchString)
        {
            var suppliers = _supplier.SearchSupplier(searchString);
            return Json(suppliers);
        }

        [HttpGet]
        public JsonResult GetDefaultSupplierData()
        {
            var suppliers = from s in _context.Suppliers select s;
            suppliers = suppliers.OrderBy(s => s.Name);
            return Json(suppliers);
        }

        [HttpGet]
        public void ExportToJson()
        {
            var suppliers = _context.Suppliers.ToList();
            ArrayList suppliersList = new ArrayList(suppliers);
            _export.ExportToJson(suppliersList, "SupllierDetails");
        }

        [HttpGet]
        public void ExportToCSV()
        {
            var suppliers = _context.Suppliers.ToList();
            ArrayList suppliersList = new ArrayList(suppliers);
            _export.ExportToCSV(suppliersList, "SupllierDetails", "Supplier");
        }

        [HttpGet]
        public void ExportToExcel()
        {
            var suppliers = _context.Suppliers.ToList();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Suppliers");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "ID";
                worksheet.Cell(currentRow, 2).Value = "Name";
                worksheet.Cell(currentRow, 3).Value = "Phone";
                worksheet.Cell(currentRow, 4).Value = "Email";
                worksheet.Cell(currentRow, 5).Value = "Street";
                worksheet.Cell(currentRow, 6).Value = "Number";
                worksheet.Cell(currentRow, 7).Value = "Postcode";
                worksheet.Cell(currentRow, 8).Value = "City";
                worksheet.Cell(currentRow, 9).Value = "State";

                for(int i = 0; i < suppliers.Count; i++)
                {
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = suppliers[i].Id;
                        worksheet.Cell(currentRow, 2).Value = suppliers[i].Name;
                        worksheet.Cell(currentRow, 3).Value = suppliers[i].Phone;
                        worksheet.Cell(currentRow, 4).Value = suppliers[i].Email;
                        worksheet.Cell(currentRow, 5).Value = suppliers[i].Street;
                        worksheet.Cell(currentRow, 6).Value = suppliers[i].Number;
                        worksheet.Cell(currentRow, 7).Value = suppliers[i].Postcode;
                        worksheet.Cell(currentRow, 8).Value = suppliers[i].City;
                        worksheet.Cell(currentRow, 9).Value = suppliers[i].State;

                    }
                }
                using var stream = new MemoryStream();
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                Response.Clear();
                Response.Headers.Add("content-disposition", "attachment;filename=SupplierDetails.xls");
                Response.ContentType = "application/xls";
                Response.Body.WriteAsync(content);
                Response.Body.Flush();
            }

        }
        [HttpGet]
        public void ExportToTxt()
        {
            var delimeter = ",";
            var lineEndDelimeter = ";";
            StringBuilder sb = new StringBuilder();
            string Columns = string.Empty;
            var suppliers = _context.Suppliers.ToList();
            var entityType = _context.Model.FindEntityType(typeof(SupplierModel));
            List<string> columnNames = new List<string>();

            foreach (var property in entityType.GetProperties())
            {
                var columnName = property.GetColumnName();
                if (!columnName.Equals("States"))
                {
                    Columns+=columnName+delimeter;
                }
            };
            sb.Append(Columns.Remove(Columns.Length - 1, 1) + lineEndDelimeter);
            foreach(var supplier in suppliers)
            {
                string row = string.Empty;
                row += supplier.Id + delimeter;
                row += supplier.City + delimeter;
                row += supplier.Email + delimeter;
                row += supplier.Name + delimeter;
                row += supplier.Number + delimeter;
                row += supplier.Phone + delimeter;
                row += supplier.Postcode + delimeter;
                row += supplier.State + delimeter;
                row += supplier.Street + delimeter;
                sb.Append(row.Remove(row.Length - 1, 1) + lineEndDelimeter);
            }
            byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(sb.ToString());

            Response.Clear();
            Response.Headers.Clear();
            Response.ContentType = "application/Text";
            Response.Headers.Add("Content-Disposition", "attachment; filename=SupplierDetails.txt;");
            Response.Body.WriteAsync(byteArray);
            Response.Body.FlushAsync();
        }

        [HttpGet]
        public void ExportToPdf()
        {
            var suppliers = _context.Suppliers.ToList();
            if(suppliers.Count > 0)
            {

            }
        }
    }
}
