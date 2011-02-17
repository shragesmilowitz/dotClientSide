using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientSide.Web.DataLayer.Factories
{
    public class Database
    {

        public static TaskManagerDataContext GetDataContext(bool isReadOnly = false)
        {
            TaskManagerDataContext db = new DataLayer.TaskManagerDataContext();
            if (isReadOnly)
            {
                db.DeferredLoadingEnabled = false;
                db.ObjectTrackingEnabled = false;
            }
            return db;
        }
    }
}