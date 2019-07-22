// Grab the Movies as a json
$.getJSON("/movies", function(data) {
    for (var i = 0; i < data.length; i++){
        $("#Movies").append("<p data-id='"+data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// Create Notes function
// $(document).on("click", "p", function(){
//     $("#notes").empty();
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method:"GET",
//         url: "/movies/" + thisId
//     })
//     .then(function(data) {
//         console.log(data);
//         // $("#notes").append("<h2>" + data.title + "</h2>");
//         // $()
//     })
// })