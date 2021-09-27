$(document).ready(function () {
    let exportItems = document.querySelectorAll(".export_item"),
        exportList = document.querySelector(".export_list"),
        exportButton = document.querySelector(".button_export"),
        settingsList = document.querySelector(".settings_list"),
        settingsButton = document.querySelector(".button_setting"),
        headerCell = document.querySelectorAll(".header_cell"),
        sortIcon = document.querySelectorAll(".sort_icon"),
        searchInput = document.querySelector(".search_input"),
        actionIcon = document.querySelectorAll(".action_icon"),
        actionMenu = document.querySelectorAll(".action_menu"),
        checkboxList = [];

    //exportList.style.display = "none"
    settingsList.style.display = "none";

    //exportFile = (url, type) => {
    //    window.location = url + type;
    //}

    toggleDisplayElement = (element, display) => {
        element.style.display = display
    }

    checkDisplayNone = (element) => {
        if (element.style.display == "none")
            return true;
        return false;
    }

    //exportButton.addEventListener("click", function () {
    //    if (checkDisplayNone(exportList)) {
    //        toggleDisplayElement(exportList, "block");
    //    } else {
    //        toggleDisplayElement(exportList, "none");
    //    }
    //})

    settingsButton.addEventListener("click", function () {
        if (checkDisplayNone(settingsList)) {
            toggleDisplayElement(settingsList, "block");
        } else {
            toggleDisplayElement(settingsList, "none");
        }
    })
   
    //for (let i = 0; i < exportItems.length; i++) {
    //    exportItems[i].addEventListener("click", function (e) {
    //        let exportType = exportItems[i].dataset.exportFile;
    //        let url = "/Supplier/ExportTo"
    //        switch (exportType) {
    //            case "Json":
    //                exportFile(url,"Json")
    //                break;
    //            case "CSV":
    //                exportFile(url, "CSV")
    //                break;
    //            case "Excel":
    //                exportFile(url, "Excel")
    //                break;
    //            case "Txt":
    //                exportFile(url, "Txt")
    //                break;
    //            default:
    //                break;
    //        }
    //    })
    //}



    setHeightElement = (element, value) => {
        element.style.height = value
    }

    getColumnClass = () => {
        let allClasses = Array.from(document.querySelectorAll(".header_cell")).flatMap(e => e.className.toString().split(/\s+/))
        let classes = new Set();
        allClasses.forEach(c => classes.add(c));
        classes.delete("header_cell");
        classes.delete("sorting_asc");
        classes.delete("sorting");
        let checkboxElements = []
        classes.forEach(value => {
            checkboxElements.push(value.split("_cell")[0])
        })
        return checkboxElements;
    }

    buildCheckboxSetting = () => {
        let checkboxElements = getColumnClass();
        let columnSettingList = document.querySelector(".columnsettings_list")
        checkboxElements.forEach(value => {
            let newElement = document.createElement("div")
            newElement.classList.add("columnsettings_element")
            newElement.innerHTML = `
                <input type="checkbox" name=${value} class="columnsettings_checkbox" checked>
                <label for=${value} class="columnsettings_label">${value}</label>
            `
            columnSettingList.appendChild(newElement);
            buildCheckboxChangeEvent();
        })

    }

    buildCheckboxChangeEvent = () => {
        let settingsCheckbox = document.querySelectorAll(".columnsettings_checkbox")
        for (let i = 0; i < settingsCheckbox.length; i++) {
            if (settingsCheckbox[i].checked) {
                checkboxList.push(settingsCheckbox[i].getAttribute("name"));
            }
            settingsCheckbox[i].addEventListener("change", function (e) {
                let changeElement = e.target;
                let columnValue = changeElement.getAttribute("name")
                let elementIndex = checkboxList.indexOf(columnValue);
                let tableCell = document.querySelectorAll("." + columnValue + "_cell");
                if (changeElement.checked) {
                    //show column (cells)
                    checkboxList.push(columnValue)
                    for (let i = 0; i < tableCell.length; i++) {
                        toggleDisplayElement(tableCell[i], "table-cell");
                    }
                } else {
                    //hide column (cells)
                    if (elementIndex > -1) {
                        checkboxList.splice(elementIndex, 1);
                    }
                    for (let i = 0; i < tableCell.length; i++) {
                        toggleDisplayElement(tableCell[i], "none");
                    }
                }
            })
        }
    }

    buildCheckboxSetting();

    ////Action menu
    //openActionMenu = () => {
    //    for (let i = 0; i < actionIcon.length; i++) {
    //        actionMenu[i].style.display = "none"
    //        actionIcon[i].addEventListener("click", function () {
    //            if (actionMenu[i].style.display == "none") {
    //                toggleDisplayElement(actionMenu[i], "flex");
    //            } else {
    //                toggleDisplayElement(actionMenu[i], "none");
    //            }
    //        });
    //    }
    //}
    //openActionMenu();
    ////Action menu

    //Sort Function
    resetSortValue = (index) => {
        for (let i = 0; i < headerCell.length; i++) {
            if (i < headerCell.length - 1 && i != index) {
                headerCell[i].dataset.sort = "default";
                sortIcon[i].classList.remove("fa-sort-up", "fa-sort-down");
            }
        }
    }

    for (let i = 0; i < headerCell.length; i++) {
        if (i < headerCell.length - 1) {
            headerCell[i].addEventListener("click", function (e) {
                let columnName = headerCell[i].dataset.columnName;
                let sortValue = headerCell[i].dataset.sort;
                let searchValue = searchInput.value;
                switch (sortValue) {
                    case "asc":
                        sortValue = "desc";
                        headerCell[i].dataset.sort = sortValue;
                        sortIcon[i].classList.remove("fa-sort-up");
                        sortIcon[i].classList.add("fa-sort-down");
                        resetSortValue(i);
                        break;
                    case "desc":
                        sortValue = "asc";
                        headerCell[i].dataset.sort = sortValue;
                        sortIcon[i].classList.remove("fa-sort-down");
                        sortIcon[i].classList.add("fa-sort-up");
                        resetSortValue(i);
                        break;
                    case "default":
                        sortValue = "asc";
                        headerCell[i].dataset.sort = sortValue;
                        sortIcon[i].classList.remove("fa-sort-down");
                        sortIcon[i].classList.add("fa-sort-up");
                        resetSortValue(i);
                        break;
                    default:
                        sortValue = "asc";
                        headerCell[i].dataset.sort = sortValue;
                        sortIcon[i].classList.remove("fa-sort-down");
                        sortIcon[i].classList.add("fa-sort-up");
                        resetSortValue(i);
                        break;
                }

                getDataBySortValue(columnName, sortValue, searchValue)
            })
        }
    }

    getDataBySortValue = (columnName, sortValue, searchValue) => {
        $.ajax({
            url: "/Supplier/SortSupplierData",
            type: "get",
            data: {
                name: columnName,
                sort: sortValue,
                search: searchValue
            },
            success: function (response) {
                rebuiltTable(response)
            },
            error: function (xhr) { }
        });
    }

    rebuiltTable = (valueArr) => {
        let tableBody = document.querySelector(".table_body");
        tableBody.innerHTML = ``;
        valueArr.forEach((value, index) => {
            Object.keys(value).map(function (key, index) {
                if (value[key] == null) {
                    value[key] = "";
                }
            });

            for (let key in value) {
                console.log(`${key}: ${value[key]}`);
            }

            let newRow = document.createElement("tr");
            newRow.classList.add("body_row")
            newRow.innerHTML = `
                <td class="body_cell main_cell name_cell">${value.name}</td>
                <td class="body_cell phone_cell">${value.phone}</td>
                <td class="body_cell email_cell">${value.email}</td>
                <td class="body_cell street_cell">${value.street}</td>
                <td class="body_cell number_cell">${value.number}</td>
                <td class="body_cell postcode_cell">${value.postcode}</td>
                <td class="body_cell city_cell">${value.city}</td>
                <td class="body_cell state_cell">${value.state}</td>
                <td class="body_actioncell action_cell">
                    <div class="action_icon">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="action_menu">
                        <a class="action_link" href="/Supplier/Edit/${value.id}">
                            <span class="menu_icon"><i class="fas fa-pencil-alt fa-fw"></i></span>
                            <span class="menu_text">Edit</span>
                        </a>
                        <a class="action_link" href="/Supplier/Delete/${value.id}">
                            <span class="menu_icon"><i class="fas fa-trash fa-fw"></i></span>
                            <span class="menu_text">Delete</span>
                        </a>
                        <a class="action_link" href="/Supplier/Details/${value.id}">
                            <span class="menu_icon"><i class="fas fa-info fa-fw"></i></span>
                            <span class="menu_text">Details</span>
                        </a>
                    </div>
                </td>
            `
            tableBody.appendChild(newRow);
        })
    }

    rebuiltTableTest = (valueArr) => {
        let tableBody = document.querySelector(".table_body");
        let elementID
        tableBody.innerHTML = ``;
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
                <div class="action_menu">
                    <a class="action_link" href="/Supplier/Edit/${elementID}">
                        <span class="menu_icon"><i class="fas fa-pencil-alt fa-fw"></i></span>
                        <span class="menu_text">Edit</span>
                    </a>
                    <a class="action_link" href="/Supplier/Delete/${elementID}">
                        <span class="menu_icon"><i class="fas fa-trash fa-fw"></i></span>
                        <span class="menu_text">Delete</span>
                    </a>
                    <a class="action_link" href="/Supplier/Details/${elementID}">
                        <span class="menu_icon"><i class="fas fa-info fa-fw"></i></span>
                        <span class="menu_text">Details</span>
                    </a>
                </div>
            `
            newRow.appendChild(actionCell)
            tableBody.appendChild(newRow);
        })
    }
    //Sort function

    //Search Function
    //searchInput.addEventListener('input', updateSearchValue);
    //function updateSearchValue(e) {
    //    let searchValue = e.target.value;
    //    if (searchValue == "") {
    //        resetSortValue(0)
    //        headerCell[0].dataset.sort = "asc";
    //        sortIcon[0].classList.add("fa-sort-up");
    //        getAllData();
    //    } else {
    //        getDataBySearchValue(searchValue);
    //    }
    //}

    //getDataBySearchValue = (searchValue) => {
    //    $.ajax({
    //        url: "/Supplier/SearchSupplierData",
    //        type: "get", 
    //        data: {
    //            searchString: searchValue
    //        },
    //        success: function (response) {
    //            rebuiltTableTest(response)
    //        },
    //        error: function (xhr) { }
    //    });
    //}

    //getAllData = () => {
    //    $.ajax({
    //        url: "/Supplier/GetDefaultSupplierData",
    //        type: "get",
    //        success: function (response) {
    //            rebuiltTableTest(response)
    //        },
    //        error: function (xhr) { }
    //    });
    //}
    //Search function
});