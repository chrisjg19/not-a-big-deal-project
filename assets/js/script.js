const omdbKey = "40e6cec5"
const moviedbKey = "9b301761cd1b73ddad01ebb533475ea8"
var createBtn = document.querySelector("#create");
var clearBtn = document.querySelector("#clear");
var watchlistEl = document.querySelector("#watchlist")
var movieInfoEl = $('#movieinfo')

function createWatchList() {
    var homeEl = document.getElementById("home");
    homeEl.setAttribute("class", "hide");
    watchlistEl.setAttribute("class", "display");
}

createBtn.onclick = createWatchList;

$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val();
    
    console.log(searchInput);
    
    searchDBs(searchInput);
});

$(".search-btn").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val();
    
    console.log(searchInput);
    
    searchDBs(searchInput);
});

function searchDBs(searchInput) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie?api_key=" + moviedbKey + "&query=" + searchInput,
    method: "GET"
}).then((data) => {
  console.log(data)
  console.log(data.results[0].title)
  console.log(data.results[0].overview)
  const movieTitle = data.results[0].title
  const plot = data.results[0].overview

  movieInfoEl.empty();

  movieInfoEl.append($('<div>').addClass('row'), $('<div>').addClass('row justify-content-between'));
  movieInfoEl.children().eq(0).append($('<div>').addClass('container').attr('id', 'info-box'));
  for (let i = 0; i < 2; i++) {
  $('#info-box').append($('<div>').addClass('row align-items-center'));
  };
      
  $('#info-box').children().eq(0).append($('<h2>').text(`${movieTitle}`));
  $('#info-box').children().eq(1).append($('<p>').text(`${plot}`));

  $.ajax({
        url: "https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchInput,
        method: "GET"
  }).then(({Actors, Poster, imdbRating}) => {
    console.log(Actors)
    console.log(Poster)
    console.log(imdbRating)

    for (let i = 2; i < 5; i++) {
    $('#info-box').append($('<div>').addClass('row align-items-center'));
    };
    $('#info-box').children().eq(2).append($('<p>').text(`Actors: ${Actors}`));
    $('#info-box').children().eq(3).append($('<p>').text(`IMDB Rating: ${imdbRating}`));
    $('#poster').append($('<img src=' + `${Poster}` + '>'));

    if (movieInfoEl) {
      movieInfoEl.push(movieTitle);
      window.localStorage.setItem("movieinfo", JSON.stringify(movieInfoEl));
      makeListItem(movieTitle);   
      }
    });
  });
}

var movielist = JSON.parse(window.localStorage.getItem("movielist")) || [];

function makeListItem (movieTitle) {
    var listItem = $("<li>").text(movieTitle);
    $("#movielist").append(listItem);
}

$("#movielist").on("click", "p", function() {
    searchOMDB($(this).text())
    console.log(this)
})

$(function (){
  $('#movielist').sortable({
    // placeholder: 'ui-state-highlight',
  });
});

function clearList() {
    window.localStorage.removeItem("movielist");
    window.location.reload();
  }

clearBtn.onclick = clearList;