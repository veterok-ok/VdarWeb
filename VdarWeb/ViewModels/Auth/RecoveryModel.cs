using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VdarWeb.ViewModels
{
    public class RecoveryModel
    {
        [Required(ErrorMessage = "Введите логин")]
        public string Login { get; set; }

    }
}
