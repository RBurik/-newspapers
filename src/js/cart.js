$(document).ready(function () {

  // Mobile Menu
  $('.burger').on("click", function () {
    $('.menu.mob').slideToggle(150);
    $('.menu.mob').toggleClass('opened');
    $('body').toggleClass('fix');
    $('.burger').toggleClass('opened');
  })

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

  // Cart
  $('.toCart').on("click", function () {
    $('.section-cart .cart').append(`
      <div class="product product-boxbook">
        <img src="img/wrapperPlast.jpg" alt="envelope">
        <div class="content">
          <h2 class="product-title">коробка-книжка</h2>
          <p class="date">24 декабря 1964</p>
          <div class="wrapper">
            <p class="price">1200</p>
          </div>
          <button class="delete"><img src="img/trash.svg" alt=""></button>
        </div>
      </div>`);

    // Delete Newspaper10 block
    $('.newspaper10').slideUp(250);
    setTimeout(function () {
      $('.newspaper10').detach();
    }, 250);

    // Again General Price
    let $generalPrice = 0;
    for (let i = 0; i <= $('.product').length; i++) { // [<=] This symbol is used so that the price can be zero
      $generalPrice += Number($('.product').eq(i).children('.content').children('.wrapper').children('.price').text());
      $('.currency .price').text($generalPrice + ' руб.');
    }
  })

  // Delete
  $(document).on("click", '.product.product-boxbook .delete', function () {
    var $index = $(this).parent('.content').parent('.product').index();
    $(this).parent('.content').parent('.product').slideUp(250);
    setTimeout(function () {
      $('.product').eq($index).detach();

      // Again General Price
      let $generalPrice = 0;
      for (let i = 0; i <= $('.product').length; i++) { // [<=] This symbol is used so that the price can be zero
        $generalPrice += Number($('.product').eq(i).children('.content').children('.wrapper').children('.price').text());
        $('.currency .price').text($generalPrice + ' руб.');
      }

      // If products.length == 0
      if ($('.product').length == 0) {
        $('.section-cart .cart').text('В корзине ничего нет');
      }
    }, 250);
  })

  // General Price
  let $generalPrice = 0;
  for (let i = 0; i < $('.product').length; i++) {
    $generalPrice += Number($('.product').eq(i).children('.content').children('.wrapper').children('.price').text());
    $('.currency .price').text($generalPrice + ' руб.');
  }

  // Delete
  $('.delete').on("click", function () {
    var $index = $(this).parent('.content').parent('.product').index();
    $(this).parent('.content').parent('.product').slideUp(250);
    setTimeout(function () {
      $('.product').eq($index).detach();

      // Again General Price
      let $generalPrice = 0;
      for (let i = 0; i <= $('.product').length; i++) { // [<=] This symbol is used so that the price can be zero
        $generalPrice += Number($('.product').eq(i).children('.content').children('.wrapper').children('.price').text());
        $('.currency .price').text($generalPrice + ' руб.');
      }

      // Again More then 3 newspapers
      if ($('.product').length >= 3) {
        $('.newspaper10').css('display', 'block');
      } else {
        $('.newspaper10').slideUp(250);
      }

      // If products.length == 0
      if ($('.product').length == 0) {
        $('.section-cart .cart').text('В корзине ничего нет');
      }
    }, 250);
  })

  // More then 3 newspapers
  if ($('.product').length >= 3) {
    $('.newspaper10').css('display', 'block');
  } else {
    $('.newspaper10').slideUp(250);
  }
})