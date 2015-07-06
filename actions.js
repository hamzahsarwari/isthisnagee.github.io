$(document).ready(function() {
    $(window).scroll(function() {
        var scrollVal = $(window).scrollTop();
        if ($(window).width() > 500 && scrollVal > 60) {
            $('#stay').css('position', 'fixed');
            $('#stay').css('top', '0');
        } else if ($(window).width() <= 500) {
          $('#stay').css('position', 'static')
          $('#stay').css('top', 'auto');}
          else {
            $('#stay').css('position', 'static');
            $('#stay').css('background-color', '#F3FFE2');
        };
        });
        $(window).scroll(function() {
            var scrollVal = $(window).scrollTop();
            if (scrollVal <= 0){
              $("#title").css('visibility', 'visible');
              $("#title").css({
                'height': 100,
                'opacity': 1})
              }
            else if (scrollVal > 0 && scrollVal <= 100) {
              $("#title").css({
                'height': 100 - scrollVal,
                'opacity': 1 - (scrollVal / 100)
              })
            }
            else {
              $("#title").css({
                'height': 0,
                'opacity': 0})
            }

          });

        $(window).scroll(function(){
          var scrollVal = $(window).scrollTop();
          if ( $(window).width() > 500 ) {
            if (scrollVal <= 100) {
              $('#about').css('color', 'inherit')
            }
            else if (scrollVal > 100 && scrollVal <= 200){
              $('#about').css('color', '#3888C4');
              $('#projects').css('color', '#225378');
            }
            else if (scrollVal > 200 && scrollVal <= 300) {
              $('#about').css('color', '#225378');
              $('#projects').css('color', '#3888C4');
            }
          }
        })

});
