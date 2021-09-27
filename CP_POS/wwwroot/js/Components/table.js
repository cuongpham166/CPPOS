import Main from "./main.js";
export default class Table {
    #dataType;
    constructor(type) {
        this.main = new Main();
        this.#dataType = type;
        this.tableBody = document.querySelector(".table_body");
    }

    #getDataType() {
        return this.#dataType;
    }

    rebuiltTable = (valueArr) => {
        let elementID
        this.tableBody.innerHTML = ``;
        let dataType = this.#getDataType();
       
        valueArr.forEach((value, index) => {
            Object.keys(value).map(function (key, index) {
                if (value[key] == null) {
                    value[key] = "";
                }
            });

            let newRow = document.createElement("tr");
            newRow.classList.add("body_row")
            for (let key in value) {
                elementID = value["id"];
                if (key != "id" && key != "states") {
                    let rowCell = document.createElement("td")
                    rowCell.classList.add("body_cell")
                    rowCell.classList.add(key + "_cell");
                    rowCell.innerText = value[key];
                    newRow.appendChild(rowCell)
                }
            }

            let actionCell = document.createElement("td");
            actionCell.classList.add("body_actioncell", "action_cell")
            actionCell.innerHTML = `
                <div class="action_icon">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="action_menu" style="display:none">
                    <a class="action_link" href="/${dataType}/Edit/${elementID}">
                        <span class="menu_icon"><i class="fas fa-pencil-alt fa-fw"></i></span>
                        <span class="menu_text">Edit</span>
                    </a>
                    <a class="action_link" href="/${dataType}/Delete/${elementID}">
                        <span class="menu_icon"><i class="fas fa-trash fa-fw"></i></span>
                        <span class="menu_text">Delete</span>
                    </a>
                    <a class="action_link" href="/${dataType}/Details/${elementID}">
                        <span class="menu_icon"><i class="fas fa-info fa-fw"></i></span>
                        <span class="menu_text">Details</span>
                    </a>
                </div>
            `
            newRow.appendChild(actionCell)
            this.tableBody.appendChild(newRow);
        })
        let actionIcon = document.querySelectorAll(".action_icon");
        for (let i = 0; i < actionIcon.length; i++) {
            actionIcon[i].addEventListener("click", this.bindOpenMenu.bind(this, i))
        }
    }

    bindOpenMenu(index, e) {
        let menu = document.querySelectorAll(".action_menu");
        this.main.checkDisplayNone(menu[index]) ? this.main.toggleDisplayElement(menu[index], "flex") : this.main.toggleDisplayElement(menu[index], "none")
    }


}