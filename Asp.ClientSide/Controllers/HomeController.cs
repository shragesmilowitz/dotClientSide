using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClientSide.Web.Controllers
{
    public class HomeController : ClientSide.Controllers.ClientSideControllerBase
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult DialogTest()
        {
            return ClientSideView();
        }
    }
}
