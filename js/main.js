var pageheader = $("#page-header")[0];
var pageheader2 = $("#page-header2")[0];
var pagecontainer = $("#page-container")[0];
var moviefinder = $("#movie_title")[0];
var submitbtn = $("#submitbtn")[0];
submitbtn.addEventListener("click", function () {
    pageheader.innerHTML = "Just a sec while we are searching...";
    sendmovierequest(function (results, poster) {
        pageheader.innerHTML = results.title;
        pageheader2.innerHTML = results.overview;
        var img = $("#selected-img")[0];
        img.src = "http://image.tmdb.org/t/p/w500" + poster;
        img.style.display = "block";
        submitbtn.style.display = "inline";
        pagecontainer.style.marginTop = "20px";
    });
});
function sendmovierequest(callback) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?query=" + moviefinder.value + "&external_source=imdb_id&api_key=101d42ee5443e5b374710ce0dbd1eb7f",
        type: "GET"
    })
        .done(function (data) {
        if (data.results.length != 0) {
            var results = data.results[0];
            callback(results, results.poster_path);
        }
        else {
            pageheader.innerHTML = "No results for " + moviefinder.value + ".";
        }
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });
}
