$(document).ready(function () {

  $('.cookies button').on("click", function () {
    $('.cookies').slideToggle(250);
    setTimeout(function () {
      $('.cookies').detach();
    }, 250)
  })
})