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














// var moviedbKey = "9b301761cd1b73ddad01ebb533475ea8"
// fetch ("https://api.themoviedb.org/3/movie/" + movieTitle.innerHTML.text + "/videos?api_key=" + moviedbKey + "&language=en-US")
//       .then(response => response.json())
//       .then(data => {
//     console.log(data);
//     console.log(data.results[0].key)
//       });





// var searchBtn = document.querySelector('.search-btn')
// var searchField = document.querySelector('#search')
// var movies = document.querySelector('.movies')
// const omdbKey = "40e6cec5"
// const searchInput = $('#search')

// function getData() {
//     const text = searchInput.val();
//     let omdbURL = `https://www.omdbapi.com/?apikey=" + ${omdbKey} + "&t=" + ${text}`

//     fetch(omdbURL)
//     .then(response => response.json())
//     .then(data => {
//         title = data[0].title;
//         console.log(title)
//     })
// }

// $(function (){
//     $('#movies').sortable({
//       placeholder: 'ui-state-highlight',
//     });
//   });

// searchBtn.addEventListener('click', ()=> {
//     if (searchInput.value) {
//         getData();
//         var liEl = document.createElement('li');
//         liEl.textContent = searchField.value;
//         var olEl = document.getElementById("movies");
//         olEl.appendChild(liEl);
//     } else {
//         return;
//     }
// })

// var moviedbKey = "9b301761cd1b73ddad01ebb533475ea8"
// fetch ("https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=" + moviedbKey + "&language=en-US")
//       .then(response => response.json())
//       .then(data => {
//     console.log(data);
//     console.log(data.results[0].key)
//       });

// function searchMovieDB(searchInput) {
//     $.ajax({
//         url: "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=" + moviedbKey + "&language=en-US"
//         method: "GET"
//     }).then(function (apiResponse) {
//         console.log(apiResponse);


//     if (movieInfoEl) {
//         movieInfoEl.push(searchInput);
//         window.localStorage.setItem("movieinfo", JSON.stringify(movieInfoEl));
//         makeListItem(searchInput);
//     }

//     var movieTitle = apiResponse.Title;
//     var plot = apiResponse.Plot;
//     var imdbRating = apiResponse.imdbRating;
//     // var poster = apiResponse.Poster;

//     movieInfoEl.empty();

//     movieInfoEl.append($('<div>').addClass('row'), $('<div>').addClass('row justify-content-between'));
//     movieInfoEl.children().eq(0).append($('<div>').addClass('container').attr('id', 'info-box'));
//     for (let i = 0; i < 3; i++) {
//         $('#info-box').append($('<div>').addClass('row align-items-center'));
//     };

//     const movie = '<h2>' + movieTitle;

//     $('#info-box').children().eq(0).append(movie);
//     $('#info-box').children().eq(1).append($('<p>').text(`${plot}`));
//     $('#info-box').children().eq(2).append($('<p>').text(`Rating: ${imdbRating}`));

//     console.log(i)
//     console.log(movieTitle, plot, imdbRating)
//     console.log(movielist)
//     })
