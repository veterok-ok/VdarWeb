﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VdarWeb
{
    public class AuthOptions
    {
        public const string ISSUER = "VdarApi"; // издатель токена
        public const string AUDIENCE = "http://localhost:50000/"; // потребитель токена
        public const string AUTHORITY = "http://localhost:50001/token"; // владелец токена
        const string KEY = "vdar.api!my.secret.key.HARD.$777$";   // ключ для шифрации
        public const int LIFETIME = 5; // время жизни токена - 5 минут
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
