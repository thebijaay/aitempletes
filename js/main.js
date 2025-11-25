(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Welcome screen and loading screen fade out
    $(window).on('load', function() {
        setTimeout(function() {
            $('#welcome-screen').css('opacity', '0');
            setTimeout(function() {
                $('#welcome-screen').hide();
            }, 1000);
        }, 3000);

        setTimeout(function() {
            $('#loading-screen').css('opacity', '0');
            setTimeout(function() {
                $('#loading-screen').hide();
            }, 1000);
        }, 2000);
    });

    // Robot eye tracking
    $(document).on('mousemove', function(e) {
        let eye = $('.robot-eye');
        if (eye.length > 0) {
            let x = (eye.offset().left) + (eye.width() / 2);
            let y = (eye.offset().top) + (eye.height() / 2);
            let rad = Math.atan2(e.pageX - x, e.pageY - y);
            let rot = (rad * (180 / Math.PI) * -1) + 180;
            eye.css({
                '-webkit-transform': 'rotate(' + rot + 'deg)',
                '-moz-transform': 'rotate(' + rot + 'deg)',
                '-ms-transform': 'rotate(' + rot + 'deg)',
                'transform': 'rotate(' + rot + 'deg)'
            });
        }
    });

    // Robotic clock
    function updateClock() {
        let now = new Date();
        let day = String(now.getDate()).padStart(2, '0');
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let year = now.getFullYear();
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');

        let timeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        $('#robotic-clock').text(timeString);
    }
    setInterval(updateClock, 1000);

})(jQuery);
