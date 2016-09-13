var searchmovie;
// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0];
// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var moviefinder = $("#movie_title")[0];
var submitbtn = $("#submitbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].
// Register button listeners
submitbtn.addEventListener("click", function () {
    pageheader.innerHTML = "Just a sec while we are searching...";
    sendmovierequest(function (results) {
        pageheader.innerHTML = results.title;
        var img = $("#selected-img")[0]; //getting a predefined area on our webpage to show the emoji
        img.src = results.poster_path; //link that area to the emoji of our currentMood.
        img.style.display = "block"; //just some formating of the emoji's location
        //Display song refresh button
        submitbtn.style.display = "inline";
        //Remove offset at the top
        pagecontainer.style.marginTop = "20px";
        pageheader.innerHTML = results.overview;
    });
});
// Refer to http://stackoverflow.com/questions/35565732/implementing-microsofts-project-oxford-emotion-api-and-file-upload
// and code snippet in emotion API documentation
function sendmovierequest(callback) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?query=" + moviefinder.value + "&external_source=imdb_id&api_key=101d42ee5443e5b374710ce0dbd1eb7f",
        type: "GET"
    })
        .done(function (data) {
        if (data.results.length != 0) {
            var results = data.results[0];
            callback(results);
        }
        else {
            pageheader.innerHTML = "No results for " + moviefinder + ".";
        }
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });
}
var Movie = (function () {
    function Movie(movie, movieplot) {
        this.movie = movie;
        this.movieplot = movieplot;
        this.name = movie;
        this.plot = movieplot;
    }
    return Movie;
}());
