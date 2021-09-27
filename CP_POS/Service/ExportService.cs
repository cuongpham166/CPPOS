using CP_POS.Data;
using CP_POS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;
namespace CP_POS.Service
{
    public class ExportService:IExportService
    {
        private readonly CPDbContext _context;
        private readonly IHttpContextAccessor _accessor;

        public ExportService(CPDbContext context,IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        public IEnumerable<IProperty> GetEntityProperties(string model)
        {
            IEnumerable<IProperty> entityPropList = Enumerable.Empty<IProperty>();
            switch (model)
            {
                case "Supplier":
                    var entityType = _context.Model.FindEntityType(typeof(SupplierModel));
                    entityPropList = entityType.GetProperties();
                    break;
            }
            return entityPropList;

        }

        public StringBuilder BuildString(ArrayList input,string model)
        {
            StringBuilder sb = new StringBuilder();
            List<string> columnNames = new List<string>();
            var propertiesList = GetEntityProperties(model);
            foreach (var property in propertiesList)
            {
                var columnName = property.GetColumnName();
                if (!columnName.Equals("States"))
                {
                    columnNames.Add(columnName);
                }

            };
            sb.AppendLine(string.Join(",", columnNames));

            switch (model)
            {
                case "Supplier":
                    var data = input.Cast<SupplierModel>().ToList();
                    foreach (var value in data)
                    {
                        sb.AppendLine($"{value.Id},{value.City},{value.Email},{value.Name},{value.Number},{value.Phone},{value.Postcode},{value.State},{value.Street}");
                    }
                    break;
            }
            return sb;
        }


        [HttpGet]
        public void ExportToJson(ArrayList data, string filename)
        {
            var result = data;
            var context = _accessor.HttpContext;
            string jsonList = JsonConvert.SerializeObject(result);
            byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(jsonList);          
            context.Response.Clear();
            context.Response.Headers.Clear();
            context.Response.ContentType = "application/json";
            context.Response.Headers.Add("Content-Length", jsonList.Length.ToString());
            context.Response.Headers.Add("Content-Disposition", "attachment; filename=" + filename + ".json;");
            context.Response.Body.WriteAsync(byteArray);
            context.Response.Body.FlushAsync();
        }

        [HttpGet]
        public void ExportToCSV(ArrayList data, string filename,string model) //Model: SupplierModel
        {
            var context = _accessor.HttpContext;
            var cvsString = BuildString(data, model);           
            byte[] byteArray = ASCIIEncoding.ASCII.GetBytes(cvsString.ToString());
            context.Response.Clear();
            context.Response.Headers.Add("content-disposition", "attachment;filename="+ filename + ".csv");
            context.Response.ContentType = "application/csv";
            context.Response.Body.WriteAsync(byteArray);
            context.Response.Body.Flush();
        }

    }
}
