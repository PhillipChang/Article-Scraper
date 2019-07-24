$(document).ready(function(){
// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     console.log("client" , data);
//     for (var i = 0; i < data.length; i++){
//         $("#articles").append("<p data-id='"+data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
// });

$("#scrape").on("click", function(event) {
    $("#scrape").hide('slow');  
    $.get("/scrape",function(data){
   
    if(data.status) window.location.href = '/';
    console.log("this happened")
    });
});

//Create Notes function

$(document).on("click", "#add-note", function(){
    var thisId = $(this).attr("data-id");
    var title = $(this).attr("data-title");
    $.ajax({
        method:"GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
      $(".modal-content").empty();
      console.log(data);
      $(".modal-content").append("<h6> Would you like to add a Note to: " + data.title + " ?</h6>");
      // An input to enter a new title
      $(".modal-content").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $(".modal-content").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
    $(document).on("click", "#save", function() {
    
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          title: title,
          body: $("#bodyinput").val()
        }
      })
        // .then(function(data) {
        //   // $("#modal-content").empty();
        // });
    
      $("#titleinput").val("");
      $("<input>").val("");
    });

});
$('.modal').modal();

    // View Notes
    $(document).on("click", "#view-note", function() {
      $(".modal-content-view").empty();
      var thisId = $(this).attr("data-id");
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
      })
        .then(function(data) {
          for (var i = 0; i<data.length; i++){
          $("#modal-content-view").append("<p> Notes: " +data.note.body);
          }
        });
    });
  $('#noteModal').modal();


// To save articles


});