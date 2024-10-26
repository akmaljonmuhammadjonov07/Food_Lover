/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tab_content'),
		tabParents = document.querySelector('.tabheader__items');

	function hideTabContents() {
		tabContents.forEach(tabContent => {
			tabContent.classList.add('hide');
			tabContent.classList.remove('show');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(index = 0) {
		tabContents[index].classList.add('show', 'fade');
		tabContents[index].classList.remove('hide');
		tabs[index].classList.add('tabheader__item_active');
	}

	hideTabContents();
	showTabContent();

	tabParents.addEventListener('click', event => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContents();
					showTabContent(index);
				}
			});
		}
	});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
const { default: tabs } = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");

window.addEventListener('DOMContentLoaded', () => {
	// Tabs
	tabs();
	// Loader

	const loaderWrapper = document.querySelector('.loader-wrapper');

	setTimeout(() => {
		loaderWrapper.style.display = 'none';
	}, 1500);

	// Timer

	const deadline = '2025-02-01';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const time = Date.parse(endtime) - Date.parse(new Date());

		if (time <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			(days = Math.floor(time / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((time / (1000 * 60)) % 60)),
				(seconds = Math.floor((time / 1000) % 60));
		}

		return {
			totalTime: time,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`;
		} else {
			return number;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const time = getTimeRemaining(endtime);

			days.textContent = formatNumber(time.days);
			hours.textContent = formatNumber(time.hours);
			minutes.textContent = formatNumber(time.minutes);
			seconds.textContent = formatNumber(time.seconds);

			if (time.totalTime <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modalOpenBtns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalContent = document.querySelector('.modal__content');

	function openModal() {
		modalContent.classList.add('modal_fade');
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal();
		}
	});

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	// Class

	class OfferMenu {
		constructor(src, alt, title, descr, discount, sale, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.discount = discount;
			this.sale = sale;
			this.parent = document.querySelector(parentSelector);
			this.formatToUSD();
		}

		formatToUSD() {
			this.discount = this.discount.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
			this.sale = this.sale.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<img src="${this.src}" alt="${this.alt}">
				<div>
					<h3>${this.title}</h3>
					<p>${this.descr}</p>
					<p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
				</div>
			`;

			this.parent.append(element);
		}
	}

	const offers = [
		{
			src: './img/offer1.png',
			alt: 'Quattro Pasta',
			title: 'Quattro Pasta',
			descr:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
			discount: 55,
			sale: 20,
		},
		{
			src: './img/offer2.png',
			alt: 'Vegertarian Pasta',
			title: 'Vegertarian Pasta',
			descr:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
			discount: 75,
			sale: 25,
		},
		{
			src: './img/offer3.png',
			alt: 'Gluten-Free Pasta',
			title: 'Gluten-Free Pasta',
			descr:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
			discount: 25,
			sale: 15,
		},
	];

	offers.forEach(offer => {
		const { src, alt, descr, discount, sale, title } = offer;
		new OfferMenu(
			src,
			alt,
			title,
			descr,
			discount,
			sale,
			'.offers-items'
		).render();
	});

	// FORM

	const form = document.querySelector('form'),
		telegramTokenBot = '7799982496:AAFid4jHjJQ3IfLHIqTWdBPGawE-_Hqo6xA',
		chatId = '6189351050';

	const message = {
		loading: 'Loading...',
		success: 'Thanks for contacting with us',
		failure: 'Something went wrong',
	};

	form.addEventListener('submit', event => {
		event.preventDefault();
		const loader = document.createElement('div');
		loader.classList.add('loader');
		loader.style.width = '20px';
		loader.style.height = '20px';
		loader.style.marginTop = '20px';
		form.append(loader);

		const formData = new FormData(form);

		const object = {};
		formData.forEach((value, key) => {
			object[key] = value;
		});

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name: ${object.name}. Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success);
				form.reset();
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => loader.remove());
	});

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog');

		modalDialog.classList.add('hide');
		openModal();

		const statusModal = document.createElement('div');
		statusModal.classList.add('modal__dialog');
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(statusModal);

		setTimeout(() => {
			statusModal.remove();
			modalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Slider

	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesInner = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1,
		offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesInner.style.width = 100 * slides.length + '%';
	slidesInner.style.display = 'flex';
	slidesInner.style.transition = 'all .5s ease';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	next.addEventListener('click', () => {
		if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}
		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}
		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map