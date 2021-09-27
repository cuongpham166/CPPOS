using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;
namespace CP_POS.Service
{
    public interface IExportService
    {
        IEnumerable<IProperty> GetEntityProperties(string model);
        StringBuilder BuildString(ArrayList data,string model);
        void ExportToJson(ArrayList data, string filename);
        void ExportToCSV(ArrayList data, string filename,string model);
    }
}
