import Main from "./main.js";

export default class Setting {
    constructor() {
        this.main = new Main();
        this.classes = new Set();
        this.settingsList = document.querySelector(".settings_list");
        this.settingsButton = document.querySelector(".button_setting");
        this.headerCell = document.querySelectorAll(".header_cell");
        this.columnSettingList = document.querySelector(".columnsettings_list");
        this.checkboxList = [];
    }

    #initSettingsList() {
        this.#buildCheckboxSetting();
        this.settingsList.style.display = "none";
    }

    #getColumnClass () {
        let allClasses = Array.from(this.headerCell).flatMap(e => e.className.toString().split(/\s+/))
        allClasses.forEach(c => this.classes.add(c));
        this.classes.delete("header_cell");
        //this.classes.delete("sorting_asc");
        //this.classes.delete("sorting");
        let checkboxElements = []
        this.classes.forEach(value => {
            checkboxElements.push(value.split("_cell")[0])
        })
        return checkboxElements;
    }

    #buildCheckboxSetting ()  {
        let checkboxElements = this.#getColumnClass();
        checkboxElements.forEach(value => {
            let newElement = document.createElement("div")
            newElement.classList.add("columnsettings_element")
            newElement.innerHTML = `
                <input type="checkbox" name=${value} class="columnsettings_checkbox" checked>
                <label for=${value} class="columnsettings_label">${value}</label>
            `
            this.columnSettingList.appendChild(newElement);
            this.#buildCheckboxChangeEvent();
        })

    }

    #buildCheckboxChangeEvent = () => {
        let settingsCheckbox = document.querySelectorAll(".columnsettings_checkbox")
        for (let i = 0; i < settingsCheckbox.length; i++) {
            if (settingsCheckbox[i].checked) {
                this.checkboxList.push(settingsCheckbox[i].getAttribute("name"));
            }
            settingsCheckbox[i].addEventListener("change", this.#changeSettingEvent.bind(this), false)
        }
    }

    #changeSettingEvent(e) {
        let changeElement = e.target;
        let columnValue = changeElement.getAttribute("name")
        let elementIndex = this.checkboxList.indexOf(columnValue);
        let tableCell = document.querySelectorAll("." + columnValue + "_cell");
        if (changeElement.checked) {
            this.checkboxList.push(columnValue)
            for (let i = 0; i < tableCell.length; i++) {
                this.main.toggleDisplayElement(tableCell[i], "table-cell");
            }
        } else {
            if (elementIndex > -1) {
                this.checkboxList.splice(elementIndex, 1);
            }
            for (let i = 0; i < tableCell.length; i++) {
                this.main.toggleDisplayElement(tableCell[i], "none");
            }
        }
    }

    #changeSettingsDisplay() {
        this.main.checkDisplayNone(this.settingsList) ? this.main.toggleDisplayElement(this.settingsList, "block") : this.main.toggleDisplayElement(this.settingsList, "none")
    }

    openSettingsList() {
        this.#initSettingsList();
        this.settingsButton.addEventListener("click", this.#changeSettingsDisplay.bind(this), false);
    }
}