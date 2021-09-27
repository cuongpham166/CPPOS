export default class Main {
    constructor() { }

    toggleDisplayElement(element, display) {
        element.style.display = display
    }

    checkDisplayNone(element) {
        if (element.style.display == "none")
            return true;
        return false;
    }

    removeClass(element, classNameArr) {
        classNameArr.forEach((value) => {
            element.classList.remove(value);
        })
    }

    addClass(element, classNameArr) {
        classNameArr.forEach((value) => {
            element.classList.add(value);
        })
    }
}