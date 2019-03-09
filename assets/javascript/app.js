

// <!-- Create an array of strings, each one related to a topic . Save it to a variable called topics. -->
var topics = ["Maltese Dog", "Bichon Frise", "Greyhound", "French Buldog", "Golden Retriever", "Poodle", "Bulldog"];

function displayTopicInfo() {
    var topic = $(this).attr("data-name");
    console.log(topic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=s2t6sbYfPlLNJYFH83IkH3GqJFT7dG08&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var topicDiv = $("<div class='movie'>");
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].images.original.url);
                var imgURL = response.data[i].images.original.url;
                var img = $('<img>').attr("src", imgURL)
                topicDiv.append(img);
                console.log(topicDiv);
            }
            $("#breed-view").prepend(topicDiv);
        });
}
function renderButtons() {
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("topic-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
renderButtons();

$("#add-breed").on("click", function (event) {
    event.preventDefault();
    var topic = $("#breed-input").val().trim();
    topics.push(topic);
    renderButtons();

});
$(document).on("click", ".topic-btn", displayTopicInfo);
  