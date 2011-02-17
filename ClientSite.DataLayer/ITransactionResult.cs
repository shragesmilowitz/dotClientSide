using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientSide.DataLayer
{
    public interface ITransactionResult
    {
        object Data { get; set; }
        Exception Error { get; set; }
        int NumEffected { get; set; }
        bool Success { get; set; }
    }

    public interface ITransactionResult<T>
    {
        T Data { get; set; }
        Exception Error { get; set; }
        int NumEffected { get; set; }
        bool Success { get; set; }
    }
}