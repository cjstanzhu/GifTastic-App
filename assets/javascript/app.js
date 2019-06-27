$(document).ready(function() {
    
    var topics = ["car", "basketball", "cat"];

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("btn btn-primary topic-button");
            topicButton.attr("data-topic", topics[i]);
            topicButton.text(topics[i]);
            $("#buttons-view").append(topicButton);
        };
    };

    renderButtons();

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        
        var topic = $("#topic-input").val().trim().toLowerCase();

        if (topic === "") {
            alert("Please enter a topic.")
        } else {
            topics.push(topic);
            renderButtons();
        };

        $("#topic-input").val("");
    });

    $(document).on("click", ".topic-button", function() {
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var topicDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var topicImage = $("<img>");

                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-state", "still");
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.addClass("gif img-fluid");
                
                topicDiv.append(topicImage);
                topicDiv.append(rating);
                topicDiv.css("float", "left");
                topicDiv.css("margin-right", "15px");

                $("#results-view").prepend(topicDiv);
            };
          });
    });
    
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
      
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

});


