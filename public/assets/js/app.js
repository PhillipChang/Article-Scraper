// Grab the articles as a json
$.getJSON("/articles", function(data) {
    console.log("client" , data);
    for (var i = 0; i < data.length; i++){
        $("#articles").append("<p data-id='"+data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//Create Notes function
$(document).ready(function(){

$(document).on("click", "#add-note", function(){
    var thisId = $(this).attr("data-id");
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
          title: data.title,
          body: $("#bodyinput").val()
        }
      })
        // .then(function(data) {
        //   // $("#modal-content").empty();
        // });
    
      $("#titleinput").val("");
      $("#bodyinput").val("");
    });


    // Saved Notes
    $(document).on("click", "#savedNote", function() {
    
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
      })
        .then(function(data) {
          $("#modal-content").empty();
          $("#modal-content").append("<p> Notes: " +data.note.body);
        });
    });
});
$('.modal').modal();



// To save notes

});