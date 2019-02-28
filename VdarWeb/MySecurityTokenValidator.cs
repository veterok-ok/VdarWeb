using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Diagnostics.Tracing;

namespace VdarWeb
{
    internal class MySecurityTokenValidator : JwtSecurityTokenHandler
    {
       

        override protected void ValidateLifetime(DateTime? notBefore, DateTime? expires, JwtSecurityToken jwtToken, TokenValidationParameters validationParameters)
        {
            throw LogHelper.LogArgumentNullException(nameof(validationParameters));

            Validators.ValidateLifetime(notBefore, expires, jwtToken, validationParameters);
        }
    }
}