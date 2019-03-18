$(document).ready(function () {
    if (window.innerWidth < 621) {
        $('.g-recaptcha').attr('data-size', 'compact');
    }
});
var way = 'hideToRight', newWay = 'ShowFromLeft';
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
        $('.' + $(this).attr('for-form')).addClass('activeform');
    }
});

