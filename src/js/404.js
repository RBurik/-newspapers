$(document).ready(function () {
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
})