using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientSide.Models
{
    public class ClientSideView
    {
        public bool Success { get; set; }
        public string Error { get; set; }
        public object Model { get; set; }
        public string Html;
    }
}