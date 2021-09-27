import Actionmenu from "./actionmenu.js";
import Table from "./table.js";

export default class Search {
    #dataType;
    #searchValue;
    constructor(type) {
        this.#dataType = type;
        this.searchInput = document.querySelector(".search_input");
        this.headerCell = document.querySelectorAll(".header_cell");
        this.sortIcon = document.querySelectorAll(".sort_icon");
        this.tableBody = document.querySelector(".table_body");
        this.actionMenu = new Actionmenu();
        this.table = new Table(this.#dataType);
    }

    #getDatatype() {
        return this.#dataType;
    }

    #resetSortValue (index) {
        for (let i = 0; i < this.headerCell.length; i++) {
            if (i < this.headerCell.length - 1 && i != index) {
                this.headerCell[i].dataset.sort = "default";
                this.sortIcon[i].classList.remove("fa-sort-up", "fa-sort-down");
            }
        }
    }

    #readInputValue(e) {
        this.#searchValue = e.target.value;
        if (this.#searchValue == "") {
            this.#resetSortValue(0)
            this.headerCell[0].dataset.sort = "asc";
            this.sortIcon[0].classList.add("fa-sort-up");
            this.#getAllData();
        } else {
            this.#getDataBySearchValue(this.#searchValue)
        }
    }

    #getDataBySearchValue(searchValue) {
        let data = this.#getDatatype();
        $.ajax({
            url: "/" + data+"/Search"+data+"Data",
            type: "get",
            data: {
                searchString: searchValue
            },
            success: (response) => {
                this.table.rebuiltTable(response)
            },
            error: function (xhr) { }
        });
    }

    #getAllData() {
        let data = this.#getDatatype();
        $.ajax({
            url: "/" + data + "/GetDefault" + data +"Data",
            type: "get",
            success: (response) => {
                this.table.rebuiltTable(response)
            },
            error: function (xhr) { }
        });
    }

    inputSearch() {
        this.searchInput.addEventListener('input', this.#readInputValue.bind(this), false);
    }
}