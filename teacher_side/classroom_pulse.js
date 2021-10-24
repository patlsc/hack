class Student {
    constructor(status, firstName, lastName, fullName) {
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName; // In cases of more than three names (?)
    }
}

const STATUS_KEYS = ["Behind", "OnTrack", "Ahead"];

const STATUS = {
    "Behind": 0,
    "OnTrack": 1,
    "Ahead": 2
}; 

const GRAY_BG = 'rgba(220, 220, 220, 0.74)';
const RED_COLOR = 'rgb(255, 43, 36)';
const GREEN_COLOR = 'rgb(6, 214, 160)';
const PURPLE_COLOR = 'rgb(228, 73, 222)';

let STUDENTS = [];

function generateRandomStudents(noRandom) {
    let students = []
    for (let i = 0; i <= noRandom; i++) {
        let nameIndex = Math.floor(Math.random() * 99);
        let statusIndex = Math.floor(Math.random() * 3);
        let status = STATUS_KEYS[statusIndex];
        let name = NAMES[nameIndex];
        let splitName = name.split(" "); 
        let firstName = splitName[0];
        let lastName = splitName[1]; 
        students[i] = new Student(STATUS[status], firstName, lastName, name);
    }
    return students;
}


function getStudents() {
    return generateRandomStudents(40); // TODO: Could be replaced with server call
}

function getSkillLearningHistory() {
    const startDate = new Date(2020, 0, 1);
    const data = [];
    for (let i = 0; i < 6; i++) {
        const date = moment(startDate).add(i, 'days').format('YYYY-MM-DD');
        data[i] = {date: date.toString(), data:Math.floor(Math.random() * 99)};
    }
    return data;
}

function createOnTrackModule() {
    const title = document.getElementById("track-title")

    let noStudentsOnTrack = 0;
    for (let i = 0; i<STUDENTS.length; i++) {
        if (STUDENTS[i].status === STATUS["OnTrack"] || STUDENTS[i].status === STATUS["Ahead"]) {
            noStudentsOnTrack += 1;
        }
    }

    title.innerHTML = String(noStudentsOnTrack) + "/" + String(STUDENTS.length) + " students on track"

    createOnTrackChart()
    createTimeSeriesChart()
}

function createTopicsStruggedWithComponent() {
    // A topic can be struggled with on three levels of severity, with 0 being the least severe and 2 being the most severe.
    const STRUGGLE_TOPICS = [
        ["2.A.1 Solving systems of linear equations", 2],
        ["2.A.2 Timesing", 2],
        ["2.B.5 Eating", 1],
        ["2.C.3 Doing something else", 0]
    ]

    const component = document.getElementById("struggle-component")
    
    for (let i = 0; i < STRUGGLE_TOPICS.length; i++) {
        const topic = STRUGGLE_TOPICS[i][0]
        const severity = STRUGGLE_TOPICS[i][1]

        const topicDiv = document.createElement("DIV")

        topicDiv.classList.add("col")
        topicDiv.classList.add("topic")
        topicDiv.innerHTML = topic

        switch (severity) {
            case 0:
                topicDiv.classList.add("minimal")
                break
            case 1:
                topicDiv.classList.add("moderate")
                break
            case 2:
                topicDiv.classList.add("severe")
                break
        }

        component.appendChild(topicDiv)
    }

    const row = document.createElement("DIV")
    row.classList.add("row")
    const plannerButton = document.createElement("BUTTON")
    plannerButton.classList.add("btn")
    plannerButton.classList.add("btn-primary")
    plannerButton.classList.add("course-planner-button")
    plannerButton.innerHTML = "Open course planner"
    plannerButton.setAttribute("type", "button")
    row.appendChild(plannerButton)

    component.appendChild(row)
}

function createOnTrackChart() {
    let noStudentsOnTrack = 0;
    for (let i = 0; i<STUDENTS.length; i++) {
        if (STUDENTS[i].status === STATUS["OnTrack"] || STUDENTS[i].status === STATUS["Ahead"]) {
            noStudentsOnTrack += 1;
        }
    }
    let noStudents = STUDENTS.length;
    const ctx = document.getElementById('ontrack-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Students On Track', 'Students Behind'],
            datasets: [{
                label: 'Students On Track',
                data: [noStudentsOnTrack, noStudents - noStudentsOnTrack],
                backgroundColor: [
                    GREEN_COLOR,
                    RED_COLOR,
                ]
            }]
        }   
    });
}

function createTimeSeriesChart() {
    let skillsLearned = getSkillLearningHistory();

    const ctx = document.getElementById('timeseries-chart').getContext('2d');
    const labels = skillsLearned.map((i) => i.date);
    const data = skillsLearned.map((i) => i.data); 
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: '# of items learned',
                data: data,
                borderWidth: 1,
                backgroundColor: GRAY_BG,
                // pointBackgroundColor: "",
            }]
        },
        options: {}
    });
}

function genericDiv(classes, id) {
    return $("<div>", {"class": classes, "id": id});
}

function iconButton(id, text, icon, extraClasses) {
    let button = $("<button>", {class: `btn ${extraClasses} icon-button`, id:`${id}-button`}).text(text);
    return button.append(
            $("<i>", {class:icon, id:`${id}-icon`})
    );
}

function createItems(id, split1, split2, background) {
    return genericDiv(`div`, `student-view-${id}-students`).append(
        genericDiv(`container rounded-border ${background}`).append(
            genericDiv("row").append(
                genericDiv("col").append(
                    split1
                ),
                genericDiv("col").append(
                    split2
                )
            )

        )
    ).css("display", "none");
}

function genericStudentView(id, dropdownItems, background) {
    let currentlyDisplaying = false; 
    let split = Math.floor(dropdownItems.length / 2 );
    let list1 = dropdownItems.splice(0, split);
    let items = createItems(id, dropdownItems, list1, background);
    return genericDiv("full-width", `student-view-${id}`).append(
        iconButton(`student-view-${id}`, `Students ${id}`, "bi bi-arrow-down", `full-width ${background}`).on("click", () => {
            if (currentlyDisplaying) {
                $(`#student-view-${id}-students`).hide(400);
                $(`#student-view-${id}-icon`).removeClass("bi-arrow-up").addClass("bi-arrow-down")
                currentlyDisplaying = false; 
            } else {
                $(`#student-view-${id}-students`).show(200);
                console.log("showing")
                $(`#student-view-${id}-icon`).removeClass("bi-arrow-down").addClass("bi-arrow-up")
                currentlyDisplaying = true;
            }
        }),
        items
    );
}

function createDropdownItems(itemLabels) {
    return itemLabels.map((label)=>$("<a>", {class:"dropdown-item", href:"#"}).text(label.fullName));
}


function createStudentDropDowns() {
    let behindStudents = STUDENTS.filter((student) => student.status === STATUS["Behind"]);
    let onTrackStudents = STUDENTS.filter((student)=> student.status === STATUS["OnTrack"]);
    let aheadStudents = STUDENTS.filter((student) => student.status === STATUS["Ahead"]);
    
    let behindDropDownItems = createDropdownItems(behindStudents);
    let onTrackDropDownItems = createDropdownItems(onTrackStudents);
    let aheadDropDownItems = createDropdownItems(aheadStudents);

    $("#student-dropdowns").append(
        genericStudentView("Behind", behindDropDownItems, "background-behind"),
        genericStudentView("On Track", onTrackDropDownItems, "background-ontrack"),
        genericStudentView("Ahead", aheadDropDownItems, "background-ahead")
    );
}

function difficultItemsToElements(itemList) {
    return itemList.map((itemText) => $("<p>", {class: "text-center"}).text(itemText));
}

function getDifficultItems() {
    return difficultItemsToElements(["Item1", "Item2", "Item3"]);
}

function createDifficultItems() {
    $("#difficult-items").append(
        genericDiv("container ").append(
            genericDiv("row").append(
                genericDiv("col background-behind").append(
                    getDifficultItems()
                ),
                genericDiv("col").append(
                    $("<button>", {class:"button"}).text("Lesson Planner")
                )
            )
        )
    );
}


window.addEventListener("load", ()=>{genericDiv
    STUDENTS = getStudents(); // Singleton moment, could be changed to server call 

    createOnTrackModule();
    createTopicsStruggedWithComponent();

    createStudentDropDowns();
});


















































// HELPER ITEMS
const NAMES = ["Sara Fields",
"Sean Mullen",
"Jenna Vance",
"Anabella Owen",
"Raquel Pacheco",
"Reagan Woodard",
"Juliana Mcconnell",
"Corbin Baker",
"Leon Hodges",
"Douglas Yu",
"Reagan Dorsey",
"Reginald Roy",
"Journey Stewart",
"Monica Robinson",
"Sloane Ryan",
"Eva Morris",
"Odin Paul",
"Mike Brandt",
"Mattie Knox",
"Sarah Hinton",
"Finnegan Stone",
"Gael Arias",
"Derrick Sutton",
"Madelynn Estrada",
"Jared Hunt",
"Kaiya Trujillo",
"Keaton Spence",
"Jonathon Stout",
"Agustin Osborn",
"German Massey",
"Mariela Avila",
"Bo Beck",
"Ellie Randall",
"Gianna Gardner",
"Jadiel Wang",
"Gia Lowe",
"Issac Macias",
"Jocelynn Keller",
"Fisher Mcclain",
"Ean Roy",
"Carly Cummings",
"Reynaldo Mcfarland",
"Eliezer Dennis",
"James Wheeler",
"Rebekah Richmond",
"Arely Potter",
"Layla Vincent",
"Jaylyn Burns",
"Trent Dorsey",
"Gerardo Warren",
"Donald Cherry",
"Amani Cooley",
"Jennifer Cervantes",
"Kierra Peterson",
"Jacoby Kidd",
"Gavin Munoz",
"Aliana Meyer",
"Aldo Horne",
"Clinton Solomon",
"Brenda Woods",
"Charity Estrada",
"Dane Duran",
"Juliet Davies",
"Hadley Davidson",
"Madyson Cunningham",
"Gordon Holmes",
"Malcolm Mills",
"Giuliana Mejia",
"Tori Frazier",
"Harper Pollard",
"Alicia Mccoy",
"Izabelle Smith",
"Trevin Lewis",
"Kane Ochoa",
"Neveah Meyers",
"Lilyana Carroll",
"Caden Blackburn",
"Aydin Alexander",
"Bethany Keith",
"Nathen Lynch",
"Libby Mcbride",
"Liberty Andersen",
"Heaven Coffey",
"Korbin Rosales",
"America Rivers",
"Corey Dawson",
"Janessa Kent",
"Natasha Bullock",
"Lana Case",
"Dayana Allison",
"Destiney Haney",
"Rohan Thompson",
"Quinton Adkins",
"Evelyn Rowe",
"Ellis Booth",
"Anabelle Gates",
"Steven Mullen",
"Richard Torres",
"Tess Woodward",
]

Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
  });


