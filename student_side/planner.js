




window.addEventListener("load", function() {
    document.getElementById("title").innerHTML = "Math II - 2nd block lesson planner"
    console.log("got here");
    $.ajax({
        url: "http://127.0.0.1:3000/get_courses",
        cache: false,
        success: function(json_res){
            createCourseComponents(json_res);
        },
        error: function(err) {
            console.log(err);
        }
      });

});