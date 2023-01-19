const omdbKey = "40e6cec5"
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

    
    if (movieInfoEl) {
        movieInfoEl.push(searchInput);
        window.localStorage.setItem("movieinfo", JSON.stringify(movieInfoEl));
        makeListItem(searchInput);   
    }

    var movieTitle = apiResponse.Title;
    var plot = apiResponse.Plot;
    var imdbRating = apiResponse.imdbRating;
    var poster = apiResponse.Poster;

    movieInfoEl.empty();

    movieInfoEl.append($('<div>').addClass('row'), $('<div>').addClass('row justify-content-between'));
    movieInfoEl.children().eq(0).append($('<div>').addClass('container').attr('id', 'info-box'));
    for (let i = 0; i < 4; i++) {
        $('#info-box').append($('<div>').addClass('row align-items-center'));
    };

    const movie = '<h2>' + movieTitle;
    $('#info-box').children().eq(0).append(movie);
    $('#info-box').children().eq(1).append($('<p>').text(`${plot}`));
    $('#info-box').children().eq(2).append($('<p>').text(`Rating: ${imdbRating}`));
   

    console.log(movieTitle, plot, imdbRating)
    console.log(movielist)
    })
}



var movielist = JSON.parse(window.localStorage.getItem("movielist")) || [];

function makeListItem (movieTitle) {
    var listItem = $("<li>").text(movieTitle);
    $("#movielist").append(listItem);
}

$("#movielist").on("click", "li", function() {
    searchOMDB($(this).text())
    console.log(this)
})

// for (var i=0; i<5; i++) {
//     makeListItem(movielist[i]);
// }

$(function (){
  $('#movielist').sortable({
    placeholder: 'ui-state-highlight',
  });
});

function clearList() {
    window.localStorage.removeItem("movielist");
    window.location.reload();
  }

clearBtn.onclick = clearList;




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