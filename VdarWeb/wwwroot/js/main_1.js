/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var SysInfo = `{
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
$("#myVideo").attr('data-vimeo-width', getSizeForIfame());//$("#myVideo").innerWidth());
function getSizeForIfame() {
    if (window.innerWidth > 1370 || window.innerWidth < 900) {
        return $("#myVideo").innerWidth();
    }
    else return '800';
}
function tooglePost() {
    $(".post").each(function () {
        if ($(this).hasClass('active-post')) {

            $(this).removeClass('active-post')
            if ($(this).hasClass('last-post')) {
                $("#post-1").addClass("active-post");
            }
            else {
                $("#post-" + (parseInt($(this).attr('id').split('-')[1]) + 1)).addClass("active-post");
            }

            return false;
        }
    });
}
$('.next-btn').on('click', function () {
    $('.middle-slider-content').attr('sln', parseInt($('.middle-slider-content').attr('sln')) + 100);
    $('.middle-post').animate({ left: '-' + $('.middle-slider-content').attr('sln') + '%', queue: false });

})
$('.prev-btn').on('click', function () {
    $('.middle-slider-content').attr('sln', parseInt($('.middle-slider-content').attr('sln')) - 100);
    console.log($('.middle-slider-content').attr('sln'));
    $('.middle-post').animate({ left: '-' + parseInt($('.middle-slider-content').attr('sln')) + '%', queue: false });


})

$('.viewselector').on('click', function () {
    if (!$(this).hasClass("activeselector")) {
        var remClass = $(".activeselector").attr("data-view");
        $(".activeselector").removeClass("activeselector");
        $(this).addClass("activeselector");
        $(".actionlist").removeClass(remClass).addClass($(this).attr("data-view"));

    }

})


$("._slider .item").on('click', function () {
    console.log($(this).attr("postid"));
    $('.active-post').removeClass('active-post');
    $('._active_item').removeClass('_active_item');
    $(this).addClass('_active_item');
    $("#" + $(this).attr("postid")).addClass('active-post');
    $("#" + $(this).attr("postid")).css('background-image', 'url(' + $(this).attr("url-big") + ')');
})
$('.ui.sticky')
    .sticky({
        context: '#content'
    });
var navbarToggler = $('.classy-navbar-toggler');
var navToggler = $('.navbarToggler');
$('.ui.sidebar').sidebar({
    //context: $('.pusher'),
    // scrollLock:	false,
    returnScroll: false,
    transition: 'overlay',
    onHide: function () {
        $('.pusher').css('overflow', 'unset');
        navToggler.removeClass('active');
        //$("body.pushable").css('overflow','-webkit-paged-y');
        enableScroll();
    },
    onVisible: function () {
        $('.pusher').css('overflow', 'hidden');
        navToggler.addClass('active');
        // $("body.pushable").css('overflow','hidden');
        disableScroll();

    }
}).sidebar('attach events', '#mobile_item, .classycloseIcon');
var isCounter = true;
var heightDividerFirst = (document.URL).toLowerCase().indexOf("single-action") === -1 ? 500 : 500;
var heigntDividerSedond = heightDividerFirst === 500 ? 400 : 400;
$(window).scroll(function () {
    if (window.scrollY > ($("#first").height() / 1.5) && isCounter == true) {

        $('.counter').counterUp({
            delay: 20,
            time: 4000
        });
        isCounter = false;
    }

    var container_class = ".computer.only.row .column ._menu_container"
    if (window.innerWidth > 991) {
        if (window.scrollY > $('._top_content').height() - 1) {
            //          $("#tempbtn").text(window.scrollY);
            if (window.scrollY > heightDividerFirst && !$(container_class).hasClass("mini")) {
                $(container_class).addClass("mini");
            }
            if (window.scrollY < heigntDividerSedond && $(container_class).hasClass("mini")) {
                $(container_class).removeClass("mini");
            }
            if (!$(container_class).hasClass("isfixed")) {
                var styles = {
                    position: "sticky",
                    top: "0"
                }
                $(container_class).addClass("isfixed");
                $('._ui_sticky').css('position', 'fixed').css('top', -$('._top_content').height());
                // $('._ui_sticky').css(styles);

            }
        }
        else {
            if ($(container_class).hasClass("isfixed")) {
                var styles = {
                    position: "absolute",
                    top: "0"
                }
                $(container_class).removeClass("isfixed");
                $('._ui_sticky').css(styles);

            }
        }
    }
    else {
        $('._ui_sticky').css('position', 'sticky').css('top', -$('._top_content').height())
    }

});
var st = 0;
function scrollIt(scrollcnt) {
    st = st + scrollcnt;
    window.scrollTo(0, window.scrollY + scrollcnt);
}

function screensize() {
    console.log(window.innerWidth);
    console.log(window.scrollY);
    $('.counter').counterUp({
        delay: 20,
        time: 4000
    });
}
//var waypoint = new Waypoint({
//  element: document.getElementById('statistics'),
//  handler: function(direction) {
//    alert(1);
//  },
//  offset: 100 
//});

var waypoints = $('#statistics').waypoint(function (direction) {


    //alert(1);
}, {
        offset: '25%'
    })
window.onresize = function () {
    if (window.innerWidth > 991) {
        $('.ui.sidebar').sidebar('hide');
        navToggler.toggleClass('active');
    }
    else {
        if (navToggler.hasClass('active') && !$('.sidebar').hasClass('visible')) {
            navToggler.removeClass('active');
        }
    }
    if (window.innerWidth < 621) {
        $("a.viewselector[data-view='listview']").css('display', 'none').removeClass('activeselector');
        $("a.viewselector[data-view='gridview']").addClass('activeselector')
        $(".actionlist").removeClass('listview');
    }
    else {
        $("a.viewselector[data-view='listview']").css('display', 'inline-block');
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

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
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}