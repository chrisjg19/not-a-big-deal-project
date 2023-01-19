const omdbKey = "40e6cec5"
var createBtn = document.querySelector("#create");
var clearBtn = document.querySelector("#clear");
var watchlistEl = document.querySelector("#watchlist")
var movieListEl = $('#movies')

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
    
    searchOMDB(searchInput);
});

$(".search-btn").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val();
    
    console.log(searchInput);
    
    searchOMDB(searchInput);
});

function searchOMDB(searchInput) {
    $.ajax({
        url: "https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchInput,
        method: "GET"
    }).then(function (apiResponse) {
        console.log(apiResponse);

    
    if (movies) {
        movies.push(searchInput);
        window.localStorage.setItem("movies", JSON.stringify(movies));
        makeListItem(searchInput);   
    }

    var movieTitle = apiResponse.Title;
    var plot = apiResponse.Plot;
    var imdbRating = apiResponse.imdbRating;
    var poster = apiResponse.Poster;

    movieListEl.empty();

    movieListEl.append($('<div>').addClass('row'), $('<div>').addClass('row my-3'), $('<div>').addClass('row justify-content-between'));
    movieListEl.children().eq(0).append($('<div>').addClass('container bg-dark text-light mt-2').attr('id', 'info-box'));
    for (let i = 0; i < 4; i++) {
        $('#info-box').append($('<div>').addClass('row align-items-center'));
    };

    const movieInfo = '<h2>' + movieTitle + '<img src=';
    $('#info-box').children().eq(0).append(movieInfo);
    $('#info-box').children().eq(1).append($('<p>').text(`${plot}`));
    $('#info-box').children().eq(2).append($('<p>').text(`Rating: ${imdbRating}`));
   

    console.log(movieTitle, plot, imdbRating)
    console.log(movies)
    })
}



var movies = JSON.parse(window.localStorage.getItem("movies")) || [];

function makeListItem (movieTitle) {
    var listItem = $("<li>").text(movieTitle);
    $("#movies").append(listItem);
}

$("#movies").on("click", "li", function() {
    searchOMDB($(this).text())
})

for (var i=0; i<5; i++) {
    makeListItem(movies[i]);
}




function clearList() {
    window.localStorage.removeItem("movies");
    window.location.reload();
  }

clearBtn.onclick = clearList;



