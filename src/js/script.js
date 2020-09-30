document.addEventListener("DOMContentLoaded", function() {
	const swiper = new Swiper('.reviews__slider', {
		slidesPerView: 1,
		spaceBetween: '-55%',
		pagination: {
			el: '.reviews__pagination',
			clickable: true,
		},
	});
	const arr21 = document.getElementById('arr21');
	const arr22 = document.getElementById('arr22');

	arr21.addEventListener('click', () => swiper.slidePrev(300,false));
	arr22.addEventListener('click', () => swiper.slideNext(300,false));

	const swiper2 = new Swiper('.offers__slider', {
		slidesPerView: 1,
		spaceBetween: '-80%',
		pagination: {
			el: '.offers__pagination',
			clickable: true,
		},
	});
	const arr11 = document.getElementById('arr11');
	const arr12 = document.getElementById('arr12');

	arr11.addEventListener('click', () => swiper2.slidePrev(300,false));
	arr12.addEventListener('click', () => swiper2.slideNext(300,false));


	const header = document.getElementById('header');
	var topY = window.scrollY;
	if (topY >= 100) header.classList.add('fix');
	if (topY < 100) header.classList.remove('fix');
	window.addEventListener('scroll', function(ev) {
		topY = window.scrollY;
		if (topY >= 100) header.classList.add('fix');
		if (topY < 100) header.classList.remove('fix');
	})
});

