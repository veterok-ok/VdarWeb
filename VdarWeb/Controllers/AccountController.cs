using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using VdarWeb.Models;
using Wangkanai.Detection;

namespace VdarWeb.Controllers
{
    public class AccountController : Controller
    {
        IDetection _detection;
        public AccountController(IDetection detection)
        {
            _detection = detection;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            try
            {
                using (WebClient wc = new WebClient())
                {
                    wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                    wc.QueryString.Add("username", model.Login);
                    wc.QueryString.Add("password", model.Password);
                    wc.QueryString.Add("finger_print", _detection.Browser.Type + " " + _detection.Device.Type);
                    wc.QueryString.Add("grant_type", "password");
                    wc.Headers["Authorization"] = "Bearer " + ControllerContext.HttpContext.Request.Cookies["AT"];
                    var HtmlResult = wc.UploadString(AuthOptions.AUTHORITY, "POST", wc.QueryString.ToString());

                    SerializedModelAuth info = JsonConvert.DeserializeObject<SerializedModelAuth>(HtmlResult);
                    if (info.Code.Equals(999))
                    {
                        CookieOptions JWT = new CookieOptions();
                        JWT.HttpOnly = true;
                        JWT.Expires = DateTime.Now.AddDays(2);
                        Response.Cookies.Append("AT", info.Data.access_token, JWT);

                        CookieOptions RT = new CookieOptions();
                        RT.HttpOnly = true;
                        RT.Expires = DateTime.Now.AddDays(2);
                        Response.Cookies.Append("RT", info.Data.refresh_token, RT);

                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ModelState.AddModelError(String.Empty, info.Message);
                        return View(model);
                    }
                }
            }
            catch (WebException wex)
            {
                ModelState.AddModelError(string.Empty, "Неверный логин или пароль");
                return View(model);
            }
            catch (Exception ex) {
                ModelState.AddModelError(string.Empty, "Ошибка при авторизации");
                return View(model);
            }

        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult Refresh()
        {
            try
            {
                using (WebClient wc = new WebClient())
                {
                    wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                    wc.QueryString.Add("grant_type", "refresh_token");
                    wc.QueryString.Add("refresh_token", ControllerContext.HttpContext.Request.Cookies["RT"]);
                    wc.Headers["Authorization"] = "Bearer " + ControllerContext.HttpContext.Request.Cookies["AT"];
                    var HtmlResult = wc.UploadString(AuthOptions.AUTHORITY, "POST", wc.QueryString.ToString());

                    SerializedModelAuth info = JsonConvert.DeserializeObject<SerializedModelAuth>(HtmlResult);

                    CookieOptions JWT = new CookieOptions();
                    JWT.HttpOnly = true;
                    JWT.Expires = DateTime.Now.AddDays(2);
                    Response.Cookies.Append("AT", info.Data.access_token, JWT);

                    CookieOptions RT = new CookieOptions();
                    RT.HttpOnly = true;
                    RT.Expires = DateTime.Now.AddDays(2);
                    Response.Cookies.Append("RT", info.Data.refresh_token, RT);

                    return RedirectToAction("Index", "Home");
                }
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }

}