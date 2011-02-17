using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClientSide.Web.DataLayer.Extensions;
using ClientSide.DataLayer;

namespace ClientSide.Web.DataLayer.Factories
{
    public class TaskFactory
    {
        public static TransactionResult<Task> Get(int id)
        {
            TransactionResult<Task> result = new TransactionResult<Task>();
            try
            {
                var db = Database.GetDataContext(isReadOnly: true);
                var data = db.Tasks.SingleOrDefault(c => c.Id.Equals(id));
                result.Data = data;
                result.Success = true;
                result.NumEffected = 1;
            }
            catch (Exception ex)
            {

                result.Success = false;
                result.Error = ex;
            }
            return result;
   
        }

        public static TransactionResult<List<Task>> GetAll()
        {
            TransactionResult<List<Task>> result = new TransactionResult<List<Task>>();

            var db = Database.GetDataContext(isReadOnly: true);
            var data = db.Tasks.ToList();

            result.Data = data;
            result.Success = true;
            result.NumEffected = data.Count;

            return result;
        }

        public static TransactionResult<Task> Save(Task task)
        {
            TransactionResult<Task> result = new TransactionResult<Task>();

            try
            {
                var db = Database.GetDataContext();
                if (task.Id == 0)
                {
                    db.Tasks.InsertOnSubmit(task);
                    db.SubmitChanges();
                }
                else
                {
                    if (!db.Tasks.IsAttached(task))
                    {
                        db.Tasks.Attach(task, true);
                    }
                    db.SubmitChanges();
                }

                result.Data = task;
                result.NumEffected = 1;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Error = ex;

            }
            return result;
        }

        public static TransactionResult<Task> Delete(int Id)
        {
            var data = Get(Id);
            return Delete(data.Data);
        }

        public static TransactionResult<Task> Delete(Task task)
        {

            TransactionResult<Task> result = new TransactionResult<Task>();
            try
            {
                var db = Database.GetDataContext();
                if (!db.Tasks.IsAttached(task))
                {
                    db.Tasks.Attach(task, true);
                }
                db.Tasks.DeleteOnSubmit(task);
                db.SubmitChanges();
                result.Success = true;
                result.NumEffected = 1;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Error = ex;
            }
            return result;
        }
    }
}