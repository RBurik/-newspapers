$(document).ready(function () {

  $('.sliderReviews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 450,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  // Mobile Menu
  $('.burger').on("click", function () {
    $('.menu.mob').slideToggle(150);
    $('.menu.mob').toggleClass('opened');
    $('.overflow').toggleClass('fix');
    $('.burger').toggleClass('opened');

    $('.header .logo img').toggleClass('active');
    $('.header').toggleClass('active');
  })

  if ($(window).width() <= 480) {
    $('html').css('min-width', $(window).width());
    $('html').css('max-width', $(window).width());

    $('body').css('min-width', $(window).width());
    $('body').css('max-width', $(window).width());

    $('.overflow').css('min-width', $(window).width());
    $('.overflow').css('max-width', $(window).width());
  }

  $(window).on("orientationchange", function( event ) {
    $('html').css('min-width', $(window).width());
    $('html').css('max-width', $(window).width());

    $('body').css('min-width', $(window).width());
    $('body').css('max-width', $(window).width());

    $('.overflow').css('min-width', $(window).width());
    $('.overflow').css('max-width', $(window).width());
  });

  // Cart
  $('.toCart').on("click", function () {
    $('.popupCart').fadeIn(250);
    $('.popupCart').addClass('opened');
    $('.overflow').toggleClass('fix');
  })
  $('.back').on("click", function () {
    $('.popupCart').fadeOut(250);
    $('.overflow').toggleClass('fix');
    setTimeout(function () {
      $('.popupCart').removeClass('opened');
    }, 250);
  })
})