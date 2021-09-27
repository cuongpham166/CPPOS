import Main from "./main.js";
export default class Export {
    #dataType;
    constructor(type) {
        this.main = new Main();
        this.#dataType = type;
        this.exportButton = document.querySelector(".button_export");
        this.exportList = document.querySelector(".export_list");
    }

    #initExportList() {
        this.exportList.style.display = "none";
    }

    #changeListDisplay(e) {
        this.main.checkDisplayNone(this.exportList) ? this.main.toggleDisplayElement(this.exportList, "block") : this.main.toggleDisplayElement(this.exportList, "none")
    }

    openExportList() {
        this.#initExportList()
        this.exportButton.addEventListener('click', this.#changeListDisplay.bind(this), false); 
    }

    exportFile() {
        let exportData = this.#dataType
        let exportItems = document.querySelectorAll(".export_item")
        for (let i = 0; i < exportItems.length; i++) {
            exportItems[i].addEventListener("click", function (e) {
                let exportType = exportItems[i].dataset.exportFile;
                let url = "/" + exportData + "/ExportTo" + exportType;
                switch (exportType) {
                    case "Json":
                        window.location = url;
                        break;
                    case "CSV":
                        window.location = url;
                        break;
                    case "Excel":
                        window.location = url;
                        break;
                    case "Txt":
                        window.location = url;
                        break;
                    default:
                        break;
                }
            })
        }
    }
}
