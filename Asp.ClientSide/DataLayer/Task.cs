using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ClientSide.Web.DataLayer
{
    [MetadataType(typeof(TaskMetaData))]
    public partial class Task
    {
        
    }

    public class TaskMetaData
    {
        [Required, StringLength(200,MinimumLength=3)]
        public string Title { get; set; }
    }
}