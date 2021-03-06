const RED_COLOR = 'rgb(255, 43, 36)'
const GREEN_COLOR = 'rgb(6, 214, 160)'
const PURPLE_COLOR = 'rgb(228, 73, 222)'

function createCourseComponents(courses) {
    for (var i = 0; i < courses.length; i++) {
        console.log("Adding course with name " + courses[i]["name"])
    
        var component = document.createElement("DIV")
        component.classList.add("course-component")

        const course = courses[i]

        // Create course title
        var nameRow = document.createElement("DIV")
        nameRow.classList.add("row")

        var div = document.createElement("DIV")
        div.classList.add("title-text")
        div.innerHTML = course["name"]
        nameRow.appendChild(div)
        component.appendChild(nameRow)

        // Create left-hand body of course component (student progress info)
        var contentRow = document.createElement("DIV")
        contentRow.classList.add("row")

        var textColumn = document.createElement("DIV")
        textColumn.classList.add("col")
        const keys = ["on_track", "behind", "ahead"]
        for (var j = 0; j < 3; j++) {
            const key = keys[j]
            var div = document.createElement("DIV")

            div.classList.add("status-row")
            div.innerHTML = String(course[key])

            switch (key) {
                case "on_track":
                    div.innerHTML += " students on track"
                    break
                case "ahead":
                    div.innerHTML += " students ahead"
                    break
                case "behind":
                    div.innerHTML += " students behind"
                    break
                default:
                    console.log("Poorly formed course dict")
                    break
            }

            textColumn.appendChild(div)
        }

        // Create & add button
        var openCourseButton = document.createElement("BUTTON")
        openCourseButton.classList.add("row")
        openCourseButton.classList.add("btn")
        openCourseButton.classList.add("btn-primary")
        openCourseButton.setAttribute("style", "margin:10px")
        openCourseButton.onclick = function() { openCourse() }
        openCourseButton.innerHTML = "Open Course"
        textColumn.appendChild(openCourseButton)

        contentRow.appendChild(textColumn)

        // Set up space for chart
        var chartColumn = document.createElement("DIV")
        chartColumn.classList.add("col")
        var canvas = document.createElement("CANVAS")
        // if you resize your window things get fucked up and i don't know how to fix it
        // canvas.setAttribute("height", "300")
        // canvas.setAttribute("width", "260")
        chartColumn.appendChild(canvas)
        contentRow.appendChild(chartColumn)

        component.appendChild(contentRow)

        document.getElementById("component-area").appendChild(component)

        // Add chart
        addChart({
            labels: ['On Track', 'Behind', 'Ahead'],
            datasets: [
            {
                label: 'None',
                data: [course["on_track"], course["behind"], course["ahead"]],
                backgroundColor: [GREEN_COLOR, RED_COLOR, PURPLE_COLOR],
            }
            ]
        }, canvas)
    }
}

function openCourse(courseReference) {
    window.location.href = "http://127.0.0.1:3000/classroom_pulse"
    console.log("ya")
    return null
}

function addChart(courseData, context) {
    new Chart(
        context,
        {
            type: 'doughnut',
            data: courseData,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Student progress'
                }
              },
              layout: {
                  padding: 0
              }
            },
        }
    )
}

window.addEventListener("load", function() {
    const teacherName = "Teacher"
    document.getElementById("title").innerHTML = teacherName + "'s Courses"
    document.getElementById("breadcrumb").innerHTML = teacherName + "'s Courses"
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