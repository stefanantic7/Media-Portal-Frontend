"use strict";
/**
* CollapsibleMenu
* Collapsible Menu is a jQuery Plugin that converts any List of links into a Collapsible Menu with Infinite Collapse Levels
*/
$.fn.CollapsibleMenu = function(options) {

    //Modify Settins based on options provided
    var settings = $.extend({
        //Default Settins
        animationTime: 300,
        expandClass: 'open',
        collapsedContainerClass: 'active',
        autoDetectActive: false,
    },options);

    //Loop through all matched elements individually
    this.each(function(){
        var element = $(this);

        //Check if auto checking of active page is set
        if(settings.autoDetectActive) {
            detectCurrent(element);
        }
        //Generate Max Heights for animation
        element.children('li').children('ul').each(function(){
            var submenu = $(this);
            process(submenu);
        });
        //Register Delegated Click Event
        element.on('click','li a', function(event){
            $(this).blur();
            var submenu = $(this).siblings('ul');
            if(submenu.length > 0) {
                event.preventDefault();
                if(submenu.hasClass(settings.expandClass)) {
                    collapse(submenu);
                } else {
                    expand(submenu);
                }
            }
        });
    })

    function process(submenu)
    {
        submenu.css('overflow-y','hidden');
        var calculatedheight = submenu[0].scrollHeight;
        submenu.data('calculated-height',calculatedheight);
        submenu.css('max-height',calculatedheight+'px');
        submenu.children('li').children('ul').each(function(){
            var submenu2 = $(this);

            process(submenu2);
        })
        if(submenu.hasClass(settings.expandClass)){
            // Submenu is Expanded
            // Do Nothing Here
        } else {
            collapse(submenu);
        }

    }

    function collapse(submenu){
        var container = submenu.parent();
        submenu.animate(
            {
                'max-height':0
            },
            {
                duration: settings.animationTime,
                complete: function() {
                    submenu.removeClass(settings.expandClass);
                    container.removeClass(settings.collapsedContainerClass)
                }
            }
        );

    }

    function expand (submenu,firstexpand) {
        var calculatedheight = submenu.data('calculated-height');
        var container = submenu.parent();

        if(firstexpand !== true) {
            submenu.parent().parent().find('li ul.open').each(function(){
                collapse($(this));
            })
        }
        submenu.parent().parent().find('li.active').each(function(){
          if(!($(this).find('ul').length)) {
            $(this).removeClass('active');
          }
        });
        submenu.animate(
            {
                'max-height':calculatedheight+'px'
            },
            {
                duration: settings.animationTime,

            }
        );
        submenu.addClass(settings.expandClass);

        container.addClass(settings.collapsedContainerClass);
        container.addClass('background');
    }

    function detectCurrent(element) {
        var childrenlsits = element.children('li');
        var i;
        for(i=0;i<childrenlsits.length;i++) {
            var menuitem = $(childrenlsits[i]);
            if(isActive(menuitem)) {
                menuitem.addClass('active');
                return true;
            }
        }
    }

    function isActive(menuitem) {
        var anchor = menuitem.children('a');
        var submenu = menuitem.children('ul');
        var i;
        if(submenu.length > 0) {
            var childrenlists = submenu.children('a');
            for(i=0;i<childrenlists.length;i++) {
                var newmenuitem = $(childrenlists[i]);
                if(isActive(newmenuitem)) {
                    submenu.addClass('open');

                    return true;
                }
            }

        }
        else if(anchor.length > 0) {
            if(anchor.attr('href').indexOf('#')!==0) {
                var link = anchor.prop('href');
                link = link.split('#')[0];
                var parts =link.split('/').slice(3);
                var filepath = '/'+parts.join('/');
                if(filepath == window.location.pathname) {
                    menuitem.addClass('active');
                    return true;
                } else if(filepath+'/' == window.location.pathname || filepath == window.location.pathname +'index.html' ) {
                    menuitem.addClass('active');

                    return true;
                }
            }
        }
        return false;
    }
}
