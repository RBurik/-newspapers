$(document).ready(function () {
  $('.sliderYears').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 4,
    arrows: true,
    speed: 250,
    mobileFirst: true,
    infinite: false,
    fade: true,
    responsive: [
      {
        breakpoint: 4000,
        settings: "unslick"
      },
    ]
  });
  $('.sliderProduct').slick({
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    speed: 450,
    infinite: false,
    responsive: [
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 2,
          dots: true,
        }
      }
    ]
  });
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

  // Safari Overflow
  if ($(window).width() <= 480) {
    // let $width = $(window).width();
    // $('html, body').css('max-width', $width);
  }

  // Mobile Menu
  $('.burger').on("click", function () {
    $('.menu.mob').slideToggle(150);
    $('.menu.mob').toggleClass('opened');
    $('body').toggleClass('fix');
    $('.burger').toggleClass('opened');

    $('.header .logo img').toggleClass('active');
    $('.header').toggleClass('active');
  })

  // Widget Calendar
  let $year; // Год, на который нажал пользователь
  let $month; // Месяц, на который нажал пользователь
  let $day; // День, на который нажал пользователь

  let $dataMonth; // Переменная для конвертации укороченных названий месяцев в длинныеЫ
  let $months = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь"
  };
  let $daysAmount = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
  };
  let $yearFunc = {
    0: 5,
    1: 1,
    2: 1,
    3: 4,
    4: 6,
    5: 2,
    6: 4,
    7: 7,
    8: 3,
    9: 5,
    10: 1,
    11: 3
  }

  // Stage 1
  $('.sliderYears .tableYears button:not(:nth-child(2)):not(:last-child)').on("click", function () { // Нажатие только по активным датам, то есть не по первой и не последней
    $year = $(this).text(); // $year == год, который выбрал пользователь

    $('.pickerMonths .year').text($year);
    $('.pickerDays .month-year').append($year);

    // Закрытие старого слайдера и открытие нового
    $('.sliderYears').css('display', 'none');
    $('.pickerMonths').css('display', 'block');
  })

  // Stage 2
  $('.pickerMonths .tableMonths button').on("click", function () { // Нажатие по месяцу
    $dataMonth = $(this).data('index');
    $month = $months[$dataMonth]; // $month == месяц, который выбрал пользователь

    $('.pickerDays .month-year').prepend($month + ', ');

    // Генерация календаря относительно данных, введенных ранее

    let $yearIndex = $year - 1910 - Math.floor(($year - 1910) / 6) * 6;
    let $visYear = Math.floor(($year - 1908) / 4); // Количество високосных годов, начиная с 1908
    let $yearPlus = $year - 1910;

    if ($visYear != 0) { // Учитывание високосных годов
      if ($yearFunc[$dataMonth] + $visYear <= 7) {
        $yearFunc[$dataMonth] = $yearFunc[$dataMonth] + $visYear;
      } else {
        $yearFunc[$dataMonth] = $yearFunc[$dataMonth] + $visYear - Math.floor(($yearFunc[$dataMonth] + $visYear) / 7) * 7;
      }
      if ($dataMonth == 0 || $dataMonth == 1) { // Учитываем январь и февраль
        $yearFunc[$dataMonth] = $yearFunc[$dataMonth] - 1;
      }
    }
    if ($yearFunc[$dataMonth] + $yearPlus <= 7) { // Смещение дня недели с учетом пройденных лет с 1910
      $yearFunc[$dataMonth] = $yearFunc[$dataMonth] + $yearPlus;
    } else {
      $yearFunc[$dataMonth] = $yearFunc[$dataMonth] + $yearPlus - Math.floor(($yearFunc[$dataMonth] + $yearPlus) / 7) * 7;
    }

    if ($yearFunc[$dataMonth] == 7) { // Если вся строка занята неактивными датами, то...
      for (var i = 0; i <= $yearFunc[$dataMonth] - 1; i++) {
        $('.pickerDays .tableDays button').eq(i).css('display', 'none');
      }
    } else {
      for (var i = 0; i <= $yearFunc[$dataMonth] - 1; i++) { // Заполнение календаря датами прошлого месяца
        if ($dataMonth == 0) { // Если выбран январь, то...
          $('.pickerDays .tableDays button').eq(i).text($daysAmount[11] - $yearFunc[$dataMonth] + 1 + i);
        } else {
          $('.pickerDays .tableDays button').eq(i).text($daysAmount[$dataMonth - 1] - $yearFunc[$dataMonth] + 1 + i);
        }
        $('.pickerDays .tableDays button').eq(i).css('opacity', '.5');
        $('.pickerDays .tableDays button').eq(i).addClass('disabled');
      }
    }

    for (var i = $yearFunc[$dataMonth]; i < $('.pickerDays .tableDays button').length; i++) { // Заполнение календаря датами основного месяца
      if ($daysAmount[$dataMonth] - i + $yearFunc[$dataMonth] > 0) {
        $('.pickerDays .tableDays button').eq(i).text(i - $yearFunc[$dataMonth] + 1);
      } else { // Заполнение календаря датами будущего месяца
        $('.pickerDays .tableDays button').eq(i).text(i - $yearFunc[$dataMonth] + 1 - $daysAmount[$dataMonth]);
        $('.pickerDays .tableDays button').eq(i).css('opacity', '.5');
        $('.pickerDays .tableDays button').eq(i).addClass('disabled');
      }
    }

    if ($dataMonth == 1 && Number.isInteger(($year - 1908) / 4) == true) {  // Если февраль и високосный год
      $('.pickerDays .tableDays button').eq($yearFunc[$dataMonth] + 28).text(29);
      $('.pickerDays .tableDays button').eq($yearFunc[$dataMonth] + 28).css('opacity', '1');
      $('.pickerDays .tableDays button').eq($yearFunc[$dataMonth] + 28).removeClass('disabled');
      for (var i = $yearFunc[$dataMonth] + 29; i < $('.pickerDays .tableDays button').length; i++) { // Заполнение календаря датами будущего месяца
        $('.pickerDays .tableDays button').eq(i).text(i - $yearFunc[$dataMonth] - $daysAmount[$dataMonth]);
        $('.pickerDays .tableDays button').eq(i).css('opacity', '.5');
        $('.pickerDays .tableDays button').eq(i).addClass('disabled');
      }
    }

    if ($('.pickerDays .tableDays button').eq(35).hasClass('disabled')) {  // Если вся строка занята неактивными датами, то...
      for (var i = $('.pickerDays .tableDays button').length; i >= $('.pickerDays .tableDays button').length - 7; i--) {
        $('.pickerDays .tableDays button').eq(i).css('display', 'none');
      }
    }

    // Закрытие старого слайдера и открытие нового
    $('.pickerMonths').css('display', 'none');
    $('.pickerDays').css('display', 'block');

    $('.calendar a.btn.btnRed').removeClass('disabled');  // Кнопка «Подобрать» активна
    $('.calendar .calendar-title').css('display', 'none');  // Удаление заголовка
  })

  // Уменьшение и увеличение года в слайдере с месяцами

  $('.pickerMonths .arrow.prev').on("click", function () { // Уменьшить год
    if ($year != 1910) { // Если еще не минимальный год, то...
      $year--;
      $('.pickerMonths .year').text($year);
      if ($year == 1910) { // Если год стал минимальным, то...
        $(this).css('opacity', '.5');
      }
    }
    $('.pickerMonths .arrow.next').css('opacity', '1');
  })

  $('.pickerMonths .arrow.next').on("click", function () { // Увеличить год
    if ($year != 1999) { // Если еще не максимальный год, то...
      $year++;
      $('.pickerMonths .year').text($year);
      if ($year == 1999) { // Если год стал максимальным, то...
        $(this).css('opacity', '.5');
      }
    }
    $('.pickerMonths .arrow.prev').css('opacity', '1');
  })

  // Stage 3
  $('.pickerDays .tableDays button:not(.disabled)').on("click", function () { // Нажатие по дню
    if (!$(this).hasClass('disabled')) {
      $day = $(this).text();  // $day == день, который выбрал пользователь
      for (var i = 0; i < $('.pickerDays .tableDays button').length; i++) {
        $('.pickerDays .tableDays button').eq(i).removeClass('active');
      }
      $(this).addClass('active');
    }
  })
})