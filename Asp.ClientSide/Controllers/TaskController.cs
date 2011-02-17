using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClientSide.DataLayer;

namespace ClientSide.Web.Controllers
{
    public class TaskController : ClientSide.Controllers.ClientSideControllerBase
    {

        public ActionResult GetCard()
        {
            return ClientSideView();
        }

        //
        // GET: /Task/

        public ActionResult Index()
        {           
            return View();
        }

        public ActionResult List()
        {
            var data = DataLayer.Factories.TaskFactory.GetAll();
            return ClientSideView("List", data.Data);
        }

        //
        // GET: /Task/Details/5

        public ActionResult Details(int id)
        {
            return ClientSideView();
        }

        //
        // GET: /Task/Create

        public ActionResult Create()
        {
            return ClientSideView();
        } 

        //
        // POST: /Task/Create

        [HttpPost]
        public ActionResult Create(DataLayer.Task task)
        {
            TransactionResult<DataLayer.Task> result = DataLayer.Factories.TaskFactory.Save(task);
            return ClientSideTransactionResult(result);
        }
        
        //
        // GET: /Task/Edit/5
 
        public ActionResult Edit(int id)
        {
            return ClientSideView();
        }

        //
        // POST: /Task/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, DataLayer.Task task)
        {
            TransactionResult<DataLayer.Task> result = DataLayer.Factories.TaskFactory.Save(task);
            return ClientSideTransactionResult(result);
        }

        // POST: /Task/Delete/5

        [HttpPost]
        public ActionResult Delete(int id)
        {
            TransactionResult<DataLayer.Task> result = DataLayer.Factories.TaskFactory.Delete(id);
            return ClientSideTransactionResult(result);
        }
    }
}
