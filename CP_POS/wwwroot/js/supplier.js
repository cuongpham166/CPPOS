import Export from "./Components/export.js";
import Actionmenu from "./Components/actionmenu.js";
import Search from "./Components/search.js";
import Sort from "./Components/sort.js";
import Settings from "./Components/settings.js";

$(document).ready(function () {
    let exportFile = new Export("Supplier");
    let actionmenu = new Actionmenu();
    let search = new Search("Supplier");
    let sort = new Sort("Supplier");
    let settings = new Settings();

    exportFile.openExportList();
    exportFile.exportFile();
    actionmenu.openActionMenu();
    search.inputSearch();
    sort.sortData();
    settings.openSettingsList();
})

