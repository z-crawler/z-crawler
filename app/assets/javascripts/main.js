jQuery(function($){

/* ==================================================
   List of Crawler Data
   ==================================================*/
   size_li = $("#crawler-data-list li").size();
   x=10;
   $('#crawler-data-list li:lt('+x+')').show();
   $('#loadMore').click(function () {
     x= (x+10 <= size_li) ? x+10 : size_li;
     $('#crawler-data-list li:lt('+x+')').show();
   });
   $('#showLess').click(function () {
     x=(x-10 <=0) ? 10 : x-10;
     $('#crawler-data-list li').not(':lt('+x+')').hide();
   });


   var BRUSHED = window.BRUSHED || {};


/* ==================================================
   Mobile Navigation
   ================================================== */
   var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

   BRUSHED.mobileNav = function(){
      var windowWidth = $(window).width();

      if( windowWidth <= 979 ) {
         if( $('#mobile-nav').length > 0 ) {
            mobileMenuClone.insertAfter('#menu');
            $('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
         }
      } else {
         $('#navigation-mobile').css('display', 'none');
         if ($('#mobile-nav').hasClass('open')) {
            $('#mobile-nav').removeClass('open');
         }
      }
   }

   BRUSHED.listenerMenu = function(){
      $('#mobile-nav').on('click', function(e){
         $(this).toggleClass('open');

         if ($('#mobile-nav').hasClass('open')) {
            $('#navigation-mobile').slideDown(500, 'easeOutExpo');
         } else {
            $('#navigation-mobile').slideUp(500, 'easeOutExpo');
         }
         e.preventDefault();
      });

      $('#menu-nav-mobile a').on('click', function(){
         $('#mobile-nav').removeClass('open');
         $('#navigation-mobile').slideUp(350, 'easeOutExpo');
      });
   }


/* ==================================================
   Navigation Fix
   ================================================== */
   BRUSHED.nav = function(){
      $('.sticky-nav').waypoint('sticky');
   }

/* ==================================================
   Init
   ================================================== */
   $(window).resize(function(){
      BRUSHED.mobileNav();
   });

   $("ul#crawler-data-list select").change(function(){
      var column_name = $(this).find("option:selected").text();
      $(this).attr("name", "data[" + column_name + "]");
      return false;
   })

});

