"use strict";
/**
* CollpasibleSlider
* Collapsible Slider is a jQuery Plugin to generate collapsible Sliders
*/
$.fn.collpasibleSlider = function(options) {

    var element = this;
    element.addClass('collpasibleSlider');
    var settings = $.extend({
        //Default Settins
        miniClass: 'collapsed',
        visibleClass:'visible',
        miniPageClass: 'no-sidebar',
        pageClasses: true,
        toggleButtons:null,
        hideButtons:null,
        collapse: false,
        expand: false,
        hide: false,
        show:false,
        closeOnClick: false

    },options);
    if(settings.toggleButtons !== null && settings.toggleButtons !== undefined) {
        registerToggleButton(settings.toggleButtons);
    }
    if(settings.hideButtons !== null && settings.hideButtons !== undefined) {
        registerHideButton(settings.hideButtons);
    }
    if(settings.collapse) {
        collapse(element);
    }
    if(settings.expand) {
        expand(element);
    }
    if(settings.hide) {
        hide(element);
    }
    if(settings.show) {
        show(element);
    }
    if(settings.closeOnClick) {
      $('.page').on('click',function(){
        hide(element);
        return true;
      })
    }
    function collapse(element){
        element.addClass(settings.miniClass);
        if(settings.pageClasses)
        $('.page').addClass(settings.miniPageClass);

    }

    function expand(element) {
        element.removeClass(settings.miniClass);
        if(settings.pageClasses)
        $('.page').removeClass(settings.miniPageClass);
        enableScrolling(element);
    }

    function hide(element) {
        element.removeClass(settings.visibleClass);
    }
    function show(element) {
        element.addClass(settings.visibleClass);
    }
    function toggle(element) {

        if(element.hasClass(settings.miniClass)){
            expand(element);
        } else {
            collapse(element);
        }
    }
    function toggleVisibility(element) {
        if(element.hasClass(settings.visibleClass)){
            hide(element);
        } else {
            show(element);
        }
    }

    function registerToggleButton(selector){
        $(selector).on('click', function(event){
            toggle(element);
            event.stopPropagation();
        })
    }

    function registerHideButton(selector){
        $(selector).on('click',function(event){
            toggleVisibility(element);
            event.stopPropagation();
        })
    }


}
