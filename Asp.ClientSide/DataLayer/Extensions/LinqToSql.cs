using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientSide.Web.DataLayer.Extensions
{
    public static class LinqToSql
    {
        public static bool IsAttached<TTable>(this TTable table, object entity) where TTable : System.Data.Linq.ITable
        {
            var orig = table.GetOriginalEntityState(entity);
            return orig != null;
        }
    }
}