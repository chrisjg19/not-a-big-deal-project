//
const omdbKey = "40e6cec5"
const moviedbKey = "9b301761cd1b73ddad01ebb533475ea8"
var createBtn = document.querySelector("#create");
var clearBtn = document.querySelector("#clear");
var watchlistEl = document.querySelector("#watchlist")
var movieInfoEl = $('#movieinfo')
var movieListEl = $('#movielist')
var searchbuttons = document.querySelector(".searchbuttons")


//intro screen hides, search displays
function createWatchList() {
    var homeEl = document.getElementById("home");
    homeEl.setAttribute("class", "hide");
    watchlistEl.setAttribute("class", "display");
}

createBtn.onclick = createWatchList;


//search via enter button
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val();
    searchDBs(searchInput);
    searchHistory(searchInput);
});

//search via button
$(".search-btn").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val();
    searchDBs(searchInput);
    searchHistory(searchInput);
});


//search both databases
function searchDBs(searchInput) {
  //The Movie DB search
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie?api_key=" + moviedbKey + "&query=" + searchInput,
    method: "GET"
  }).then((data) => {
    const movieTitle = data.results[0].title
    const plot = data.results[0].overview

    movieInfoEl.empty();
    movieListEl = [];

    movieInfoEl.append($('<div>').addClass('row'), $('<div>').addClass('row justify-content-between'));
    movieInfoEl.children().eq(0).append($('<div>').addClass('container').attr('id', 'info-box'));
    for (let i = 0; i < 2; i++) {
    $('#info-box').append($('<div>').addClass('row align-items-center'));
    };    
    $('#info-box').children().eq(0).append($('<h2>').text(`${movieTitle}`));
    $('#info-box').children().eq(1).append($('<p>').text(`${plot}`));

  //OMDB search
  $.ajax({
      url: "https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchInput,
      method: "GET"
  }).then(({Actors, Poster, imdbRating}) => {
    for (let i = 2; i < 5; i++) {
    $('#info-box').append($('<div>').addClass('row align-items-center'));
    };
    $('#info-box').children().eq(2).append($('<p>').text(`Actors: ${Actors}`));
    $('#info-box').children().eq(3).append($('<p>').text(`IMDB Rating: ${imdbRating}`));
    $('#poster').append($('<img src=' + `${Poster}` + '>'));

  //local storage
    var getStorage = localStorage.getItem("movielist")
    if (getStorage) {
      movieListEl = JSON.parse(localStorage.getItem("movielist"))
      movieListEl.push(movieTitle);
      localStorage.setItem("movielist", JSON.stringify(movieListEl));
    }else{
      movieListEl.push(movieTitle);
      localStorage.setItem("movielist", JSON.stringify(movieListEl));
    }

    });
  });
}

//create and retain search history list
var searchHistory = function(searchInput) {
  $("#movielist").append($('<li>').text(searchInput));
  $('li').addClass("searchbuttons")
  
  var searchbuttons = document.querySelector(".searchbuttons")
  searchbuttons.addEventListener("click", function(click) {
    searchDBs(click.target);
  })
}



// DEAD CODE








// function clearList() {
//   movieListEl.removeChild(movieListEl.firstChild);
//   }

// clearBtn.addEventListener("click", clearList);

// var historyClick = function

// if (movieListEl) {
      // movieListEl.push(movieTitle);
    //   // window.localStorage.setItem("movieinfo", JSON.stringify(movieListEl));
    //   // makeListItem(movieTitle);   
    //   }

    // function makeListItem (movieTitle) {
//     // var listItem = $("<li>").text(movieTitle);
//     // $("#movielist").append(listItem);
//     // movieListEl.push(listItem);
//     // console.log(movieListEl)

//     var listItem = movieTitle
//     movieList.push(movieTitle)
//     $("#movielist").append($('<li>').text(listItem));
//     localStorage.setItem("movie", JSON.stringify(movieList))
// }

// $("#movielist").click (function(searchDBs) {
//     $(this).text();
//     console.log(this)
// })