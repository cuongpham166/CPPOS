$(document).ready(function () {
    const userMenuList = document.querySelector(".user_menu");
    const userButton = document.querySelector(".user_button");

    userButton.addEventListener("click", function () {
        if (userMenuList.style.display === "none") {
            userMenuList.style.display = "block";
        } else {
            userMenuList.style.display = "none";
        }
    })
});

getDateTime = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    let d = today.getDate();
    let mon = today.getMonth() + 1;
    let y = today.getFullYear();

    let timeText = document.querySelector('.time_txt')
    let dateText = document.querySelector(".date_txt");

    m = checkDateTime(m);
    s = checkDateTime(s);
    d = checkDateTime(d);
    mon = checkDateTime(mon);
    timeText.innerHTML = h + ":" + m + ":" + s;
    dateText.innerHTML = d + "/" + mon + "/" + y;
    setTimeout(getDateTime, 1000);
}

checkDateTime = (i) => {
    if (i < 10) { i = "0" + i };
    return i;
}
