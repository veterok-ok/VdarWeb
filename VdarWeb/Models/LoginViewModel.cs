using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using VdarWeb.ViewModels;

namespace VdarWeb.Models
{
    public class LoginViewModel
    {
        public RecoveryModel RecoveryModel { get; set; }
        public LoginModel LoginModel { get; set; }
        public RegisterModel RegisterModel { get; set; }

    }
}
