"use strict";

//import sectionScroll from "./pageScroll.js";
//import popup from "./popup.js";
sectionScroll(".scroll-container", {
	ease: "ease-out"
});
popup({
	animation: "ease-out"
});
"use strict";

var sectionScroll = function sectionScroll(element, options) {
	var defaultSettings = {
		sectionContainer: ".scroll-section",
		initIndex: 0,
		easing: "ease",
		animationTime: 1000,
		lBtn: ".leftBtn",
		rBtn: ".rightBtn",
		pos: 0
	};
	var settings = Object.assign({}, defaultSettings, options);
	var sections = document.querySelectorAll(settings.sectionContainer);
	var qtySections = sections.length;
	var el = document.querySelector(element);
	var lBtn = document.querySelector(settings.lBtn);
	var rBtn = document.querySelector(settings.rBtn);

	/*=================*/
	/* Helper Functions*/
	/*=================*/

	var _hasClass = function _hasClass(_el, _cls) {
		return _el.classList.contains(_cls);
	};
	var _addClass = function _addClass(_el, _cls) {
		if (!_hasClass(_el, _cls)) {
			_el.classList.add(_cls);
		}
	};
	var _removeClass = function _removeClass(_el, _cls) {
		if (_hasClass(_el, _cls)) {
			_el.classList.remove(_cls);
		}
		if (_el.classList.item(0) === null) {
			_el.removeAttribute("class");
		}
	};

	/*==================*/
	/*Preparing*/
	/*==================*/

	_addClass(el, "scroll-container");
	_addClass(sections[settings.initIndex], "active");
	el.style.position = "relative";
	el.style.fontSize = "0";
	for (var i = 0; i < qtySections; i++) {
		sections[i].dataset.index = i + 1;
		sections[i].fontSize = "100%";
	}

	/*==================*/
	/*Transform Sections*/
	/*==================*/

	var _transformSection = function _transformSection(sections, settings, index, nextIndex) {
		var pos = settings.pos;
		if (index < nextIndex) {
			pos += -100;
		}
		if (index > nextIndex) {
			pos += 100;
		}

		var transform = "transform: translate3d(" + pos + "%,0,0); transition: transform " + settings.animationTime + "ms " + settings.easing + ";";
		for (var _i = 0; _i < qtySections; _i++) {
			sections[_i].style.cssText = transform;
		}
		settings.pos = pos;
	};

	var moveRight = function moveRight() {
		var index = document.querySelector(settings.sectionContainer + ".active").dataset.index;
		var current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']");
		var next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) + 1) + "']");

		if (!next) {
			return;
		}
		var nextIndex = next.dataset.index;
		_removeClass(current, "active");
		_addClass(next, "active");
		_transformSection(sections, settings, index, nextIndex);
	};

	var moveLeft = function moveLeft() {
		var index = document.querySelector(settings.sectionContainer + ".active").dataset.index;
		var current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']");
		var next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) - 1) + "']");

		if (!next) {
			return;
		}
		var nextIndex = next.dataset.index;
		_removeClass(current, "active");
		_addClass(next, "active");
		_transformSection(sections, settings, index, nextIndex);
	};
	/*===============*/
	/*Buttons events */
	/*===============*/

	rBtn.onclick = function (event) {
		moveRight();
	};

	lBtn.onclick = function (event) {
		moveLeft();
	};
};
"use strict";

var popup = function popup(options) {

    var defaultSettings = {
        container: ".popup-container",
        elements: ".popup-element",
        closeElements: ".popup-close",
        animationTime: 400,
        animationType: "ease"
    };

    var settings = Object.assign({}, defaultSettings, options);
    var isOpen = false;
    var modalBg = document.querySelector(".modal-bg");
    var container = document.querySelector(settings.container);

    var _hasClass = function _hasClass(_el, _cls) {
        return _el.classList.contains(_cls);
    };
    var _addClass = function _addClass(_el, _cls) {
        if (!_hasClass(_el, _cls)) {
            _el.classList.add(_cls);
        }
    };
    var _removeClass = function _removeClass(_el, _cls) {
        if (_hasClass(_el, _cls)) {
            _el.classList.remove(_cls);
        }
        if (_el.classList.item(0) === null) {
            _el.removeAttribute("class");
        }
    };

    var openPopup = function openPopup(_el, _popupModal, _content, _buttons) {
        var modalContent = _popupModal.querySelector(".modal-content");

        _popupModal.style.width = _el.offsetWidth + 'px';
        _popupModal.style.height = _el.offsetHeight + 'px';
        _popupModal.style.top = _el.getBoundingClientRect().top + 'px';
        _popupModal.style.left = _el.getBoundingClientRect().left + 'px';
        _popupModal.style.transition = "all ." + settings.animationTime + "s " + settings.animationType;

        /*ВНИМАНИЕ КОСТЫЛЬ*/
        /*_popupModal.style.display = "block";
         _popupModal.style.visibility = "hidden";
         setTimeout(()=>{
           _popupModal.style.visibility = "visible";
           _addClass(_popupModal, "open");
         },100);*/

        _popupModal.style.display = "block";
        _popupModal.offsetHeight; // И тут костыль\
        _addClass(_popupModal, "open");

        setTimeout(function () {
            _popupModal.style.backgroundColor = "transparent";
            _addClass(_content, "open");
            _addClass(_buttons, "open");
            modalBg.style.display = "block";
            modalBg.offsetHeight; // И здесь тоже
            _addClass(modalBg, "open");
        }, settings.animationTime);

        /*===============*/
    };

    var closePopup = function closePopup(_el, _popupModal, _content, _buttons) {
        if (_hasClass(_popupModal, "open")) {
            _popupModal.style.backgroundColor = "#fff";
            _removeClass(modalBg, "open");
            _removeClass(_content, "open");
            _removeClass(_buttons, "open");
            _removeClass(_popupModal, "open");
        }
        setTimeout(function () {
            _popupModal.style.display = "none";
            modalBg.style.display = "none";
        }, settings.animationTime);
    };

    container.onclick = function (event) {
        var target = event.target.closest(".popup-element");

        if (_hasClass(target, "popup-element") && isOpen === false) {
            var popupId = target.dataset.modalId;
            var popupModal = document.querySelector(".modal[data-id=\"" + popupId + "\"]");
            var content = popupModal.querySelector('.modal-content');
            var buttons = popupModal.querySelector('.modal-buttons');
            console.log(buttons);
            console.log(popupId);
            openPopup(target, popupModal, content, buttons);
            isOpen = true;
        }
    };
    window.onclick = function (event) {
        console.log(event.target);
        var target = event.target;
        if ((_hasClass(target, "modal-closeIcon") || _hasClass(event.target, "modal-bg")) && isOpen === true) {
            var activePopup = document.querySelector('.modal.open');
            console.log(activePopup);
            var content = activePopup.querySelector('.modal-content');
            var buttons = activePopup.querySelector('.modal-buttons');
            closePopup(target, activePopup, content, buttons);
            isOpen = false;
        }
    };
};

popup({
    animation: "ease",
    animationTime: 400
});