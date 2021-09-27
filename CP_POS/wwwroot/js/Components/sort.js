import Main from "./main.js";
import Table from "./table.js";
export default class Sort {
    #dataType;
    constructor(type) {
        this.#dataType = type;
        this.main = new Main();
        this.table = new Table(this.#dataType);
        this.headerCell = document.querySelectorAll(".header_cell");
        this.sortIcon = document.querySelectorAll(".sort_icon");
        this.searchInput = document.querySelector(".search_input");
    }

    #getDatatype() {
        return this.#dataType;
    }

    #resetSortValue (index) {
        for (let i = 0; i < this.headerCell.length; i++) {
            if (i < this.headerCell.length - 1 && i != index) {
                this.headerCell[i].dataset.sort = "default";
                this.main.removeClass(this.sortIcon[i], ["fa-sort-up", "fa-sort-down"])
            }
        }
    }

    sortData() {
        for (let i = 0; i < this.headerCell.length; i++) {
            if (i < this.headerCell.length - 1) {
                this.headerCell[i].addEventListener("click", this.#sortDataEvent.bind(this, i), false)
            }
        }
    }

    #sortDataEvent(index, e) {
        let i = index;
        let columnName = this.headerCell[i].dataset.columnName;
        let sortValue = this.headerCell[i].dataset.sort;
        let searchValue = this.searchInput.value;
        switch (sortValue) {
            case "asc":
                sortValue = "desc";
                this.headerCell[i].dataset.sort = sortValue;
                this.main.removeClass(this.sortIcon[i], ["fa-sort-up"])
                this.main.addClass(this.sortIcon[i], ["fa-sort-down"])
                //sortIcon[i].classList.remove("fa-sort-up");
                //sortIcon[i].classList.add("fa-sort-down");
                this.#resetSortValue(i);
                break;
            case "desc":
                sortValue = "asc";
                this.headerCell[i].dataset.sort = sortValue;
                this.main.removeClass(this.sortIcon[i], ["fa-sort-down"])
                this.main.addClass(this.sortIcon[i], ["fa-sort-up"])
                //sortIcon[i].classList.remove("fa-sort-down");
                //sortIcon[i].classList.add("fa-sort-up");
                this.#resetSortValue(i);
                break;
            case "default":
                sortValue = "asc";
                this.headerCell[i].dataset.sort = sortValue;
                this.main.removeClass(this.sortIcon[i], ["fa-sort-down"])
                this.main.addClass(this.sortIcon[i], ["fa-sort-up"])
                //sortIcon[i].classList.remove("fa-sort-down");
                //sortIcon[i].classList.add("fa-sort-up");
                this.#resetSortValue(i);
                break;
            default:
                sortValue = "asc";
                this.headerCell[i].dataset.sort = sortValue;
                this.main.removeClass(this.sortIcon[i], ["fa-sort-down"])
                this.main.addClass(this.sortIcon[i], ["fa-sort-up"])
                //sortIcon[i].classList.remove("fa-sort-down");
                //sortIcon[i].classList.add("fa-sort-up");
                this.#resetSortValue(i);
                break;
        }

        this.#getDataBySortValue(columnName, sortValue, searchValue)
    }

    #getDataBySortValue(columnName, sortValue, searchValue) {
        let dataType = this.#getDatatype();
        $.ajax({
            url: "/" + dataType + "/Sort" + dataType+"Data",
            type: "get",
            data: {
                name: columnName,
                sort: sortValue,
                search: searchValue
            },
            success: (response) => {
                this.table.rebuiltTable(response)
            },
            error: function (xhr) { }
        });
    }

}