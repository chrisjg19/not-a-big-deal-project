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


//function getVideo() {
  let text = searchField.value;
  var moviedbKey = "9b301761cd1b73ddad01ebb533475ea8"
  
console.log(
fetch("https://api.themoviedb.org/3/movie/tt1285016?api_key=9b301761cd1b73ddad01ebb533475ea8&language=en-US&page=1&region=US")
  .then (function (response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log(data.key);
  })
  .catch(function(error) {
    console.error(error)
  }))
//}

console.log()

createBtn.onclick = createWatchList;

$(function (){
    $('#movies').sortable({
      placeholder: 'ui-state-highlight',
    });
  });

