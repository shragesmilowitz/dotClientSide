using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientSide.DataLayer
{
    public class TransactionResult<T> : ITransactionResult<T>, ITransactionResult
    {
        public bool Success { get; set; }
        public T Data { get; set; }
        public int NumEffected { get; set; }
        public Exception Error { get; set; }

        object ITransactionResult.Data
        {
            get
            {
                return Data;
            }
            set
            {
                Data = (T)value;
            }
        }
    }
}