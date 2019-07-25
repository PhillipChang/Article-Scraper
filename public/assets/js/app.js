$(document).ready(function() {

    $("#scrape").on("click", function(event) {
        $("#scrape").hide('slow');
        $.get("/scrape", function(data) {
            if (data.status) window.location.href = '/';
        });
    });
    $("#saved").on("click", function(event) {
        $("#saved").hide('slow');
        $.get("/articles/saved", function(data) {});
    });

    //Create Notes function

    $(document).on("click", "#add-note", function() {
        $("modal-content-add").empty();
        var thisI = $(this).attr("data-id");
        console.log("add", thisI);
        $(document).on("click", "#save", function() {
            var thisId = $("#add-note").attr("data-id");
            console.log(thisId);
            var note = {
                title: $("#titleinput").val().trim(),
                body: $("#bodyinput").val().trim()
            }
            $.post("/articles/" + thisId, note, function(response) {
                console.log(response);
                $("#titleinput").val();
                $("#bodyinput").val();
            })
        });
    });
    $('.modal').modal();

    // View Notes
    $(document).on("click", "#view-note", function() {
        var thisId = $(this).attr("data-id");
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId,
            })
            .then(function(data) {
                console.log(data);
                $("#modal-content-view").append("<h6> Title: " + data.title + "</h6>");
                $("#modal-content-view").append("<h6> Notes: " + data.note.body + "</h6>");
            });
    });
    $('.modal').modal();


    // Modals
    $(document).on("click", ".modal-close", function(event) {
        $("#modal-content-view").empty();
        $(".content-add").empty();
    });

    // To save articles
    $(document).on("click", ".change-save", function(event) {
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            method: "PUT",
            url: `/articles/${id}`,
            success: function() {
                location.reload();
            }
        });
    });

});