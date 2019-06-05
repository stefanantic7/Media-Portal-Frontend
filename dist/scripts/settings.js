"use strict";
var themes = [
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "indigo",
  "teal",
  "cyan"
];
for(var i = 0; i< themes.length; i++) {
  var c = themes[i];
  (function(color) {
    $('.theme-buttons-dark').on('click','.btn-' + color, function(){

      $('.sidebar-nav').removeClass(function (index, className) {
        return (className.match (/(^|\s)list-nav-\S+/g) || []).join(' ');
      });
      $('.sidebar-nav').addClass('list-nav-dark');
      $('.sidebar-nav').addClass('list-nav-dark-' + color);

      $('.sidebar-left .sidebar-header').removeClass(function (index, className) {
        return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
      });
      $('.sidebar-left .sidebar-header').addClass('bg-' + color);
      $('.sidebar-left').removeClass('sidebar-light');
      $('.sidebar-left').addClass('sidebar-dark');

    });

    $('.theme-buttons-light').on('click','.btn-' + color, function(){

      $('.sidebar-nav').removeClass(function (index, className) {
        return (className.match (/(^|\s)list-nav-\S+/g) || []).join(' ');
      });
      $('.sidebar-nav').addClass('list-nav-light');
      $('.sidebar-nav').addClass('list-nav-light-' + color);

      $('.sidebar-left .sidebar-header').removeClass(function (index, className) {
        return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
      });
      $('.sidebar-left .sidebar-header').addClass('bg-' + color);
      $('.sidebar-left').removeClass('sidebar-dark');
      $('.sidebar-left').addClass('sidebar-light');

    })

  })(c);

}

// Initialize Sidebar and Topbar Fixed States
$(function(){
  $('.fixed-sidebar-toggle').prop('checked',true);
  $('.fixed-sidebar-toggle').prop('checked',true);


  $('.fixed-topbar-toggle').on('change',function(e) {
      var ele = $(this);

      if(ele.is(':checked')) {
          $('.topbar').addClass('fixed');

      } else {
          $('.fixed-sidebar-toggle').attr('checked',false);
          $('.topbar').removeClass('fixed');

      }
  });
  $('.fixed-sidebar-toggle').on('change',function(e) {
      var ele = $(this);
      if(ele.is(':checked')) {
          $('.sidebar').addClass('sidebar-fixed');
          $('.fixed-topbar-toggle').prop('disabled', false);
      } else {
          $('.sidebar').removeClass('sidebar-fixed');

          $('.fixed-topbar-toggle').removeAttr('checked');

          $('.topbar').removeClass('fixed');
          $('.fixed-topbar-toggle').prop('disabled', true);

      }
  })
})
