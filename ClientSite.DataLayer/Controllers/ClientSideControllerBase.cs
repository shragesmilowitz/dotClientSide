using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using ClientSide.Models;
using ClientSide.DataLayer;

namespace ClientSide.Controllers
{
    public class ClientSideControllerBase: Controller
    {
        #region JsonView
        protected internal JsonResult ClientSideView()
        {
            return ClientSideView(null);
        }


        protected internal JsonResult ClientSideView(object model)
        {
            return ClientSideView(string.Empty, model);
        }



        protected internal JsonResult ClientSideView(string view, object model)
        {
            ClientSideView View = new ClientSideView();

            // Parse the view
            if (string.IsNullOrEmpty(view))
            {
                view = ControllerContext.RouteData.GetRequiredString("action");
            }


            ViewData.Model = model;

            string html = "";
            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, view);
                ViewContext viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                html = sw.GetStringBuilder().ToString();
            }

            View.Html = html;
            View.Model = model;
            View.Success = true;


            return new JsonResult() { Data = View, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        #endregion

        #region JsonView Error
        protected internal JsonResult ClientSideViewError(string error)
        {
            return ClientSideViewError(error, JsonRequestBehavior.AllowGet);
        }

        protected internal JsonResult ClientSideViewError(string error, JsonRequestBehavior behavior)
        {
            ClientSideView jsonView = new ClientSideView();
            jsonView.Error = error;
            jsonView.Success = false;
            return new JsonResult() { Data = jsonView, JsonRequestBehavior = behavior };
        }
        #endregion

        #region JsonTransactionResult
        protected internal JsonResult ClientSideTransactionResult(ITransactionResult result)
        {

            ClientSide.Models.ClientSideTransactionResult transactionResult = ClientSide.Models.ClientSideTransactionResult.fromTransactionResult(result);
            return new JsonResult() { Data = transactionResult, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        protected internal JsonResult ClientSideTransactionResult(ITransactionResult result, JsonRequestBehavior behavior)
        {
            ClientSide.Models.ClientSideTransactionResult transactionResult = ClientSide.Models.ClientSideTransactionResult.fromTransactionResult(result);
            return new JsonResult() { Data = transactionResult, JsonRequestBehavior = behavior };

        }
        #endregion
    }
}