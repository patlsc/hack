// const Chart = require('chart.js')

function createCourseComponents(courses) {
    for (var i = 0; i < courses.length; i++) {
        console.log("Adding course with name " + courses[i]["name"])
    
        var component = document.createElement("DIV")
        component.classList.add("course-component")

        const course = courses[i]

        // Create course title & left-hand body of course component (student progress info)
        for (const key in course) {
            const value = course[key]
            var div = document.createElement("DIV")

            if (key == "name") {
                div.classList.add("title-text")
                div.innerHTML = value
            } else {
                div.classList.add("status-row")
                div.innerHTML = String(value)
    
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
            }

            component.appendChild(div)
        }

        // Create & add button
        var openCourseButton = document.createElement("BUTTON")
        openCourseButton.setAttribute("class", "btn btn-primary")
        openCourseButton.setAttribute("style", "margin:10px")
        openCourseButton.onclick = function() { openCourse() }
        openCourseButton.innerHTML = "Open Course"
        component.appendChild(openCourseButton)

        document.getElementById("component-area").appendChild(component)
    }
}

function openCourse(courseReference) {
    return null
}

function addChart(courseData) {
    const DATA_COUNT = 3;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data = {
        labels: ['Green', 'Red', 'Blue'],
        datasets: [
        {
            label: 'None',
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Object.values(Utils.CHART_COLORS),
        }
        ]
    }

    const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Doughnut Chart'
            }
          }
        },
    }

    
}

window.onload += function() {
    const teacherName = "Teacher"
    document.getElementById("title").innerHTML = teacherName + "'s Courses"
    document.getElementById("h1").innerHTML = teacherName + "'s Courses"

    const c = [
        {
            "name" : "Math I - 2nd block",
            "on_track" : 26,
            "behind" : 8,
            "ahead" : 5
        },
        {
            "name" : "Math II - 4th block",
            "on_track" : 18,
            "behind" : 4,
            "ahead" : 10
        },
        {
            "name" : "Math II - 4th block",
            "on_track" : 18,
            "behind" : 4,
            "ahead" : 10
        },
        {
            "name" : "Math II - 4th block",
            "on_track" : 18,
            "behind" : 4,
            "ahead" : 10
        },
        {
            "name" : "Math II - 3rd block",
            "on_track" : 15,
            "behind" : 9,
            "ahead" : 6
        }
    ]

    componentArea = document.getElementById("row align-items-start")
    createCourseComponents(c)

    const myChart = new Chart()
}()