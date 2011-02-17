using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClientSide.DataLayer;

namespace ClientSide.Models
{
    public class ClientSideTransactionResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public int NumEffected { get; set; }
        public string Error { get; set; }

        public static ClientSideTransactionResult fromTransactionResult(ITransactionResult transactionResult)
        {
            ClientSideTransactionResult t = new ClientSideTransactionResult();
            t.Success = transactionResult.Success;
            t.Data = transactionResult.Data;
            if (transactionResult.Error != null)
            {
                t.Error = transactionResult.Error.Message;
            }
            t.NumEffected = transactionResult.NumEffected;
            return t;
        }
    }
}