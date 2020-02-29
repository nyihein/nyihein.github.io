
$(window).on("load", function() {             // when window is on load do thi function
  $(".loader .inner").fadeOut(500, function() {
    $(".loader").fadeOut(750);                      // icon will fade out first, then the background, thats why .loader is longer
  });

  $(".items").isotope({
    filter: '*',
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue:false
    }
  });
})

// for superslides
$(document).ready(function() {

    $('#slides').superslides({    // this is jQuery
      animation: 'fade',          // enables you to use fading animation instead of sliding when changing slides
      play: 4000,                 // 4000ms = 4s timing per slide and then next slide
      pagination: false           // the little dots at the bottom which allows you to click so you change slides is disabled
    });

  // for the title typing
    var typed = new Typed(".typed", {
      strings: ['Aspiring Software Developer','Passionate Data Analyst', 'Self-taught Web Developer', 'AI Enthusiast'],
      typeSpeed: 60,
      loop: true,
      startDelay: 1000,
      showCursor: false
    });

  // for the skills section sliding
    $('.owl-carousel').owlCarousel({
      loop:true,
      items:4,
      responsive:{
          0:{
              items:1                  // if pixel on screen is from 0-480 (small screen), show 1 item only at a time
          },
          480:{
              items:2
          },
          768:{
              items:3
          },
          938:{
            items:4
          }
      }
    })

    // for piechart
        var skillsTopOffset = $(".skillsSection").offset().top;
        var statsTopOffset = $(".statsSection").offset().top;
        var countUpFinished = false;
        $(window).scroll(function() {

          if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

              $('.chart').easyPieChart({           // see from github page
                      easing: 'easeInOut',         // make the circle more smooth rounding
                      barColor: '#fff',            // color of the percent bar
                      trackColor: false,            // the non-percent bar is disabled
                      scaleColor: false,            // the marks around the chart is disabled
                      lineWidth: 4,
                      size: 152,                     // as stated
                      onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                      }
                      /* the percent number will increase, this code means find the current "percent"
                         class element of this item which is <span> and then set the text to be the value of the percent */
                  });

          }


          if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
            $(".counter").each(function() {
              var element = $(this);
              var endVal = parseInt(element.text());

              element.countup(endVal);
            })

            countUpFinished = true;
          }

        });

        $("[data-fancybox]").fancybox({
          helpers:
         {
               overlay:
               {
                      css: { 'background': 'rgba(0, 0, 255, 0.9)',
                              'image-resolution': '500x500'
                    }
               }
         }
        });



        $("#filters a").click(function() {          //when clicked on button

          $("#filters .current").removeClass("current");
          $(this).addClass("current");

          var selector = $(this).attr("data-filter");

          $(".items").isotope({
              filter: selector,
              animationOptions: {
                duration: 1500,
                easing: "linear",
                queue:false
              }
            });

            return false;
        });

        $("#navigation li a").click(function(e) {  // when you click the nav bar item, do this function, e for event
          e.preventDefault();                      // means dont do what youre suppose to do, when clicked it wont go to suppose to go

          var targetElement = $(this).attr("href");     // the item that is targetted's href, attr = attribute
          var targetPosition = $(targetElement).offset().top;  // position of the target's stop, e.g stats area's top position
          $("html, body").animate({ scrollTop: targetPosition - 50}, "slow"); // animate and scroll to target position but -50 so it wont go so down and go there "slow"
        });


        const nav = $("#navigation");            // const means nav will never change, also grabs the navigation part
        const navTop = nav.offset().top;         // grabs the top of nav bar

        $(window).on("scroll", stickyNavigation);  // when window scrolls, do "stickyNavigation"

        function stickyNavigation() {

          var body = $("body");                    // declare var body

          if ($(window).scrollTop() >= navTop) {    // if widow scrolling amount is more than the top of navbar amount (remember number increases when scrolled down)
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");              // add this class
          }
          else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");           // if not remove this class
          }
        }

});
