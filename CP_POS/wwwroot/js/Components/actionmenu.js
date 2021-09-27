import Main from "./main.js";
export default class Actionmenu {
    constructor() {
        this.actionMenu = document.querySelectorAll(".action_menu");
        this.actionIcon = document.querySelectorAll(".action_icon");
        this.main = new Main();
    }

    #initActionMenu() { 
        for (let i = 0; i < this.actionMenu.length; i++) {
            this.actionMenu[i].style.display = "none";
        }
    }

    openActionMenu() {
        this.#initActionMenu();
        let index;
        for (let i = 0; i < this.actionIcon.length; i++) {
            index = i;
            this.actionIcon[index].addEventListener('click', this.#changeMenuDisplay.bind(this,index), false);
        }
    }

    #changeMenuDisplay(index, e) {
        this.main.checkDisplayNone(this.actionMenu[index]) ? this.main.toggleDisplayElement(this.actionMenu[index], "flex") : this.main.toggleDisplayElement(this.actionMenu[index], "none")
    }
}