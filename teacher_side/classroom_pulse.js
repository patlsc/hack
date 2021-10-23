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
            labels: ['Students On-track', 'Students Behind'],
            datasets: [{
                label: 'Students On-track',
                data: [noStudentsOnTrack, noStudents - noStudentsOnTrack],
                backgroundColor: [
                    '#117c0b',
                    '#ffff10',
                ],
                borderColor: [
                    '#117c0b',
                    '#ffff10',
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: {
              center: {
                text: `${noStudentsOnTrack}/${noStudents} On-Track`,
                color: '#000000', // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 20, // Default is 20 (as a percentage)
                minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25 // Default is 25 (in px), used for when text wraps
              }
            }
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
            label: '# Items Learned',
            data: data,
            borderWidth: 1,
            backgroundColor: 'rgba(17, 124, 11, 0.74)',
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
    let button = $("<button>", {class: `btn ${extraClasses}`, id:`${id}-button`}).text(text);
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
                $(`#student-view-${id}-students`).show(400);
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
        genericStudentView("Ontrack", onTrackDropDownItems, "background-ontrack"),
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
    createOnTrackChart();
    createTimeSeriesChart();
    createStudentDropDowns();
    createDifficultItems();
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


