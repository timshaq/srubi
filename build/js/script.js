"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    spaceBetween: '-55%',
    pagination: {
      el: '.reviews__pagination',
      clickable: true
    }
  });
  var arr21 = document.getElementById('arr21');
  var arr22 = document.getElementById('arr22');
  arr21.addEventListener('click', function () {
    return swiper.slidePrev(300, false);
  });
  arr22.addEventListener('click', function () {
    return swiper.slideNext(300, false);
  });
  var swiper2 = new Swiper('.offers__slider', {
    slidesPerView: 1,
    spaceBetween: '-80%',
    pagination: {
      el: '.offers__pagination',
      clickable: true
    }
  });
  var arr11 = document.getElementById('arr11');
  var arr12 = document.getElementById('arr12');
  arr11.addEventListener('click', function () {
    return swiper2.slidePrev(300, false);
  });
  arr12.addEventListener('click', function () {
    return swiper2.slideNext(300, false);
  });
  var header = document.getElementById('header');
  var topY = window.scrollY;
  if (topY >= 100) header.classList.add('fix');
  if (topY < 100) header.classList.remove('fix');
  window.addEventListener('scroll', function (ev) {
    topY = window.scrollY;
    if (topY >= 100) header.classList.add('fix');
    if (topY < 100) header.classList.remove('fix');
  });
});