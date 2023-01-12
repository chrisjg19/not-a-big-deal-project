var createBtn = document.querySelector("#create");
var watchlistEl = document.querySelector("#watchlist")

function createWatchList() {
    //add functionality to Begin button by changing visible element
    var homeEl = document.getElementById("home");
    homeEl.setAttribute("class", "hide");
    watchlistEl.setAttribute("class", "display");
}

createBtn.onclick = createWatchList;