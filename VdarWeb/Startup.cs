using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using VdarWeb.Models;

namespace VdarWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    { 
                        //options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {                            
                            // указывает, будет ли валидироваться издатель при валидации токена
                            ValidateIssuer = true,
                            // строка, представляющая издателя
                            ValidIssuer = AuthOptions.ISSUER,
                            // будет ли валидироваться потребитель токена
                            ValidateAudience = true,
                            // установка потребителя токена
                            ValidAudience = AuthOptions.AUDIENCE,
                            // будет ли валидироваться время существования
                            RequireExpirationTime = true,
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.Zero,
                            //ClockSkew = TimeSpan.FromSeconds(AuthOptions.LIFETIME),
                            // установка ключа безопасности
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // валидация ключа безопасности
                            ValidateIssuerSigningKey = true
                        };
                        options.Events = new JwtBearerEvents()
                        {
                            OnMessageReceived = context =>
                            {
                                if (!String.IsNullOrEmpty(context.Request.Cookies["AT"]) && !String.IsNullOrEmpty(context.Request.Cookies["RT"]))
                                {
                                    string accessToken = context.Request.Cookies["AT"];
                                    string refreshToken = context.Request.Cookies["RT"];

                                    using (WebClient wc = new WebClient())
                                    {
                                        wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                                        wc.QueryString.Add("grant_type", "refresh_token");
                                        wc.QueryString.Add("refresh_token", refreshToken);
                                        wc.Headers["Authorization"] = "Bearer " + accessToken;
                                        var HtmlResult = wc.UploadString(AuthOptions.AUTHORITY, "POST", wc.QueryString.ToString());

                                        SerializedModelAuth info = JsonConvert.DeserializeObject<SerializedModelAuth>(HtmlResult);

                                        CookieOptions JWT = new CookieOptions();
                                        JWT.HttpOnly = true;
                                        JWT.Expires = DateTime.Now.AddDays(2);
                                        context.Response.Cookies.Append("AT", info.Data.access_token, JWT);
                                        accessToken = info.Data.access_token;

                                        CookieOptions RT = new CookieOptions();
                                        RT.HttpOnly = true;
                                        RT.Expires = DateTime.Now.AddDays(2);
                                        context.Response.Cookies.Append("RT", info.Data.refresh_token, RT);

                                    }

                                    context.HttpContext.Request.Headers.Add("Authorization", "Bearer " + accessToken);

                                }
                                return Task.CompletedTask;
                            }
                        };
                    });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStatusCodePages(context =>
            {
                if (context.HttpContext.Response.StatusCode == (int)HttpStatusCode.Unauthorized)
                    context.HttpContext.Response.Redirect("/Account/Login");
                else
                {
                    var location = string.Format(CultureInfo.InvariantCulture, "/Error/Index?errorCode={0}", context.HttpContext.Response.StatusCode);
                    context.HttpContext.Response.Redirect(location);
                }
                return Task.CompletedTask;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

           app.UseAuthentication();

           app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
