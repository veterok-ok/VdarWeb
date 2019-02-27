/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var SysInfo =`{
  "system": {
    "slider": {
      "items": [
        {
          "title_short": "Мальчики чувствуют себя хорош.",
          "title_long": "Мальчики чувствуют себя хорошо после спасения тайских пещер",
          "url_small": "img/logos/6.jpg",
          "url_big": "img/logos/1.jpg",
          "like_cnt": "1",
          "comments_cnt": "22",
          "views_cnt": "333",
          "tags": [
            "Sport",
            "Best",
            "Top-10"
          ]
        },
        {
          "title_short": "Мальчики чувствуют себя хорош.",
          "title_long": "Мальчики чувствуют себя хорошо после спасения тайских пещер",
          "url_small": "img/logos/6.jpg",
          "url_big": "img/logos/1.jpg",
          "like_cnt": "1",
          "comments_cnt": "22",
          "views_cnt": "333",
          "tags": [
            "Sport",
            "Best",
            "Top-10"
          ]
        }
      ],
      "item_cnt": "22",
      "extra_infor": "no_data"
    }
  }
}`;
console.log(SysInfo);
//$(".big-post-content").hover(function (){
//$(".content_div").hover(function (){
//    $(".content_div").stop().animate({'background-color':'rgba(245, 245, 245, 0.5686274509803921)'},500);
//}, function() {
//    $(".content_div").stop().animate({'background-color':'transparent'},500);
//  });

function tooglePost(){
    $(".post").each(function (){
        if ($( this ).hasClass('active-post')){
            
            $( this ).removeClass('active-post')
            if ($( this ).hasClass('last-post')){
               $("#post-1").addClass("active-post"); 
            }
            else{
                $("#post-"+(parseInt($(this).attr('id').split('-')[1])+1)).addClass("active-post");
            }
            
            return false;
        }
    });
}
$("._slider .item").on('click',function (){
    console.log($(this).attr("postid"));
    $('.active-post').removeClass('active-post');
    $('._active_item').removeClass('_active_item');
    $(this).addClass('_active_item');
    $("#"+$(this).attr("postid")).addClass('active-post');
    $("#"+$(this).attr("postid")).css('background-image','url('+$(this).attr("url-big")+')');
})
$('.ui.sticky')
  .sticky({
    context: '#newbody'
  });
  var navbarToggler = $('.classy-navbar-toggler');
 var navToggler = $('.navbarToggler');
 $('.ui.sidebar').sidebar({
    //context: $('.pusher'),
   // scrollLock:	false,
    returnScroll: false,
    transition: 'overlay' ,
    onHide: function() {
      navToggler.removeClass('active');
      //$("body.pushable").css('overflow','-webkit-paged-y');
        enableScroll();
    },
    onVisible: function(){
        navToggler.addClass('active');
       // $("body.pushable").css('overflow','hidden');
       disableScroll();
        
    }
}).sidebar('attach events', '#mobile_item, .classycloseIcon');

window.onresize = function (){
    if (window.innerWidth>991){
        $('.ui.sidebar').sidebar('hide');
        navToggler.toggleClass('active');
    }
    else{
        if (navToggler.hasClass('active') && !$('.sidebar').hasClass('visible')){
            navToggler.removeClass('active');
        }
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}