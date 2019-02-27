/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

            $('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    scrollLock:	true,
    transition: 'overlay'    
}).sidebar('attach events', '#mobile_item');
window.onresize = function (){
    if (window.innerWidth>991){
        $('.ui.sidebar').sidebar('hide');
    }
}