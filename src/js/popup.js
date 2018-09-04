const popup = (options) => {

    let defaultSettings = {
        container: ".popup-container",
        elements: ".popup-element",
        closeElements: ".popup-close",
        animationTime: 400,
        animationType: "ease",
    };

    let settings = Object.assign({}, defaultSettings, options);
    let isOpen = false;
    let modalBg = document.querySelector(".modal-bg");
    let container = document.querySelector(settings.container);

    const _hasClass = (_el, _cls) => {
        return _el.classList.contains(_cls);
    };
    const _addClass = (_el, _cls) => {
        if (!_hasClass(_el, _cls)) {
            _el.classList.add(_cls);
        }
    };
    const _removeClass = (_el, _cls) => {
        if (_hasClass(_el, _cls)) {
            _el.classList.remove(_cls);
        }
        if (_el.classList.item(0) === null) {
            _el.removeAttribute("class");
        }
    };

    const openPopup = (_el, _popupModal, _content, _buttons) => {
        let modalContent = _popupModal.querySelector(".modal-content");

        _popupModal.style.width = _el.offsetWidth + 'px';
        _popupModal.style.height = _el.offsetHeight + 'px';
        _popupModal.style.top = _el.getBoundingClientRect().top + 'px';
        _popupModal.style.left = _el.getBoundingClientRect().left + 'px';
        _popupModal.style.transition = `all .${settings.animationTime}s ${settings.animationType}`;

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

        setTimeout(() => {
            _popupModal.style.backgroundColor = "transparent";
            _addClass(_content, "open");
            _addClass(_buttons, "open");
            modalBg.style.display = "block";
            modalBg.offsetHeight; // И здесь тоже
            _addClass(modalBg, "open");
        }, settings.animationTime);

        /*===============*/
    };

    const closePopup = (_el, _popupModal, _content, _buttons) => {
        if (_hasClass(_popupModal, "open")) {
            _popupModal.style.backgroundColor = "#fff";
            _removeClass(modalBg, "open");
            _removeClass(_content, "open");
            _removeClass(_buttons, "open");
            _removeClass(_popupModal, "open");
        }
        setTimeout(() => {
            _popupModal.style.display = "none";
            modalBg.style.display = "none";
        }, settings.animationTime);
    };

    container.onclick = (event) => {
        let target = event.target.closest(".popup-element");

        if (_hasClass(target, "popup-element") && isOpen === false) {
            let popupId = target.dataset.modalId;
            let popupModal = document.querySelector(`.modal[data-id="${popupId}"]`);
            let content = popupModal.querySelector('.modal-content');
            let buttons = popupModal.querySelector('.modal-buttons');
            console.log(buttons);
            console.log(popupId);
            openPopup(target, popupModal, content, buttons);
            isOpen = true;
        }
    };
    window.onclick = (event) => {
        console.log(event.target);
        let target = event.target;
        if ((_hasClass(target, "modal-closeIcon") || _hasClass(event.target, "modal-bg") )&& isOpen === true) {
            let activePopup = document.querySelector('.modal.open');
            console.log(activePopup);
            let content = activePopup.querySelector('.modal-content');
            let buttons = activePopup.querySelector('.modal-buttons');
            closePopup(target, activePopup, content, buttons);
            isOpen = false;
        }
    }

};

popup({
    animation: "ease",
    animationTime: 400
});