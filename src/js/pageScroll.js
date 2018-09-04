const sectionScroll = (element, options) => {
	let defaultSettings = {
		sectionContainer: ".scroll-section",
		initIndex: 0,
		easing: "ease",
		animationTime: 1000,
		lBtn: ".leftBtn",
		rBtn: ".rightBtn",
		pos: 0
	}
	let settings = Object.assign({}, defaultSettings, options);
	let sections = document.querySelectorAll(settings.sectionContainer);
	let qtySections = sections.length;
	let el = document.querySelector(element);
	let lBtn = document.querySelector(settings.lBtn);
	let rBtn = document.querySelector(settings.rBtn);


	/*=================*/
	/* Helper Functions*/
	/*=================*/

	const _hasClass = (_el, _cls) => {
		return _el.classList.contains(_cls);
	}
	const _addClass = (_el, _cls) => {
		if(!_hasClass(_el, _cls)) {
			_el.classList.add(_cls);
		}
	}
	const _removeClass = (_el, _cls) => {
		if (_hasClass(_el, _cls)) {
			_el.classList.remove(_cls);
		}
		if (_el.classList.item(0) === null) {
			_el.removeAttribute("class");
		}

	}

	/*==================*/
	/*Preparing*/
	/*==================*/

	_addClass(el, "scroll-container");
	_addClass(sections[settings.initIndex], "active");
	el.style.position = "relative";
	el.style.fontSize = "0";
	for(let i = 0; i < qtySections; i++) {
		sections[i].dataset.index = i+1;
		sections[i].fontSize = "100%";
	}


	/*==================*/
	/*Transform Sections*/
	/*==================*/

	const _transformSection = (sections,settings,index,nextIndex) => {
		let pos = settings.pos;
		if (index < nextIndex) {
			pos += -100;
		}
		if (index > nextIndex) {
			pos += 100;
		}
		
		let transform = `transform: translate3d(${pos}%,0,0); transition: transform ${settings.animationTime}ms ${settings.easing};`
		for(let i = 0; i < qtySections; i++) {
			sections[i].style.cssText = transform;
		}
		settings.pos = pos;
		
	}

	const moveRight = () => {
		let index = document.querySelector(settings.sectionContainer + ".active").dataset.index;
		let current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']");
		let next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index)+1) + "']");

		if (!next) {
			return
		}
		let nextIndex = next.dataset.index;
		_removeClass(current, "active");
		_addClass(next, "active");
		_transformSection(sections,settings,index,nextIndex);
	}

	const moveLeft = () => {
		let index = document.querySelector(settings.sectionContainer + ".active").dataset.index;
		let current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']");
		let next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index)-1) + "']");

		if (!next) {
			return
		}
		let nextIndex = next.dataset.index;
		_removeClass(current, "active");
		_addClass(next, "active");
		_transformSection(sections,settings,index,nextIndex);
	}
	/*===============*/
	/*Buttons events */
	/*===============*/

	rBtn.onclick = (event) => {
		moveRight();
	}

	lBtn.onclick = (event) => {
		moveLeft();
	}
	
};

