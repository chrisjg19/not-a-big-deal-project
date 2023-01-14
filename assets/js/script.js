var createBtn = document.querySelector("#create");
var watchlistEl = document.querySelector("#watchlist")

function createWatchList() {
    //add functionality to Begin button by changing visible element
    var homeEl = document.getElementById("home");
    homeEl.setAttribute("class", "hide");
    watchlistEl.setAttribute("class", "display");
}

createBtn.onclick = createWatchList;
var createBtn = document.querySelector("#create");
var searchBtn = document.querySelector('.search-btn')
var watchlistEl = document.querySelector("#watchlist")
var searchField = document.querySelector('.search-field')
var movies = document.querySelector('.movies')

function createWatchList() {
    var homeEl = document.getElementById("home");
    homeEl.setAttribute("class", "hide");
    watchlistEl.setAttribute("class", "display");
}

searchBtn.addEventListener('click', ()=> {
    if (searchField.value) {
        getData();
        var liEl = document.createElement('li');
        liEl.textContent = searchField.value;
        var olEl = document.getElementById("movies");
        olEl.appendChild(liEl);
    } else {
        return;
    }
})

function getData() {
    let text = searchField.value;
    var omdbKey = "40e6cec5"

fetch("https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + text)
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log(data.Actors);
  })
  .catch(function(error) {
    console.error(error)
  })

}

createBtn.onclick = createWatchList;

$(function (){
    $('#movies').sortable({
      placeholder: 'ui-state-highlight',
    })
});
