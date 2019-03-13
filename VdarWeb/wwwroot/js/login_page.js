/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    if (window.innerWidth < 621) {
        $('.g-recaptcha').attr('data-size', 'compact');
    }
});
var way = 'hideToRight', newWay = 'ShowFromLeft';
$('select.dropdown')
    .dropdown();
$(".formselectoritem").on('click', function () {
    if (!$(this).hasClass('activeformselector')) {
        $('.' + way).removeClass(way);
        $('.' + newWay).removeClass(newWay);
        if ($(this).attr('way-attr') < $('.activeformselector').attr('way-attr')) {
            way = 'hideToLeft';
            newWay = 'ShowFromRight';
        }
        else {
            way = 'hideToRight';
            newWay = 'ShowFromLeft';
        }


        $(".formselector .formselectoritem.activeformselector").addClass(way).removeClass('activeformselector');

        $(this).removeClass(way).addClass('activeformselector ' + newWay);
        $(".activeform").removeClass('activeform');
        //       console.log($(this));
        //        console.log($(this).attr('for-form'));
        //        console.log('-'+$('.'+$(this).attr('for-form')).attr('sln')+'px');
        //       $('.vdar-form').css('left','-'+$('.'+$(this).attr('for-form')).attr('sln')+'%');
        $('.' + $(this).attr('for-form')).addClass('activeform');
        //       if ($(this).hasClass('reg')){
        //           $('.formlist').css('height','680px');
        //       }
        //       else{
        //           $('.formlist').css('height','250px');
        //       }
    }
});

