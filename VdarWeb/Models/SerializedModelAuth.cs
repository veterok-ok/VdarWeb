using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VdarWeb.Models
{
    public class SerializedModelAuth
    {
        public SerializedModelAuth()
        {
            Code = 0;
            Message = String.Empty;
            Data = null;
        }

        [JsonProperty("Code")]
        public int Code { get; set; }
        [JsonProperty("Message")]
        public string Message { get; set; }
        [JsonProperty("Data")]
        public SerializedModelToken Data { get; set; }
    }

    public class SerializedModelToken
    {
        public SerializedModelToken()
        {
            access_token = String.Empty;
            refresh_token = String.Empty;
        }
        [JsonProperty("access_token")]
        public string access_token { get; set; }
        [JsonProperty("refresh_token")]
        public string refresh_token { get; set; }
    }

}
