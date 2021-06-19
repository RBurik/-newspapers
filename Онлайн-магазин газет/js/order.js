
$(document).ready(function () {

  // Select — Open/Close
  $('.selectWrapper').on("click", function () {
    $(this).children('ul').slideToggle(250);
    $(this).children('img.arrow').toggleClass('opened');
  })

  // Select — Changing text
  $('.menu-item').on("click", function () {
    var $text = $(this).text();
    $(this).parent('ul').prev().prev().text($text);
  })

  // Phone Mask
  $(".phone").mask("+7 (999) 999-99-99");

  // Day/Month Mask
  $(".day_month").mask("99.99");

  // Day/Month Mask
  $(".time").mask("99");

  // Mobile Menu
  $('.burger').on("click", function () {
    $('.menu.mob').slideToggle(150);
    $('.menu.mob').toggleClass('opened');
    $('body').toggleClass('fix');
    $('.burger').toggleClass('opened');
  })
})