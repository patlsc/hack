const GREEN_COLOR = 'rgb(255, 43, 36)';
const RED_COLOR = 'rgb(6, 214, 160)';

function getItemInfo() {
    return {"itemsLearned": 34, "totalItems": 52}
}

function getItemLearningHistory() {
    const startDate = new Date(2020, 0, 1);
    const data = [];
    for (let i = 0; i < 6; i++) {
        const date = moment(startDate).add(i, 'days').format('YYYY-MM-DD');
        data[i] = {date: date.toString(), data:Math.floor(Math.random() * 99)};
    }
    return data;
}

function loadItemsLearnedChart() {
    let itemInfo = getItemInfo();
    const ctx = document.getElementById('ontrack-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Items Learned', 'Items Not Learned'],
            datasets: [{
                label: 'Items Learned',
                data: [itemInfo["itemsLearned"],itemInfo["totalItems"]],
                backgroundColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                center: {
                    text: `${itemInfo["itemsLearned"]}/${itemInfo["totalItems"]} On-Track`,
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

function loadItemsExpectedChart() {
    let itemInfo = {"itemsFulfilled": 30, "totalItems": 0}
    const ctx = document.getElementById('expected-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Items Learned', 'Items Not Learned'],
            datasets: [{
                label: 'Items Learned',
                data: [itemInfo["itemsFulfilled"], itemInfo["totalItems"]],
                backgroundColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                center: {
                    text: `${itemInfo["itemsFulfilled"]}/${itemInfo["totalItems"]} On-Track`,
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

function loadItemsAverageChart() {
    let itemInfo = {"myItems": 34, "averageItems": 20}
    const ctx = document.getElementById('average-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['My Items', 'Average Items'],
            datasets: [{
                label: 'Items Learned',
                data: [itemInfo["myItems"], itemInfo["averageItems"]],
                backgroundColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderColor: [
                    RED_COLOR,
                    GREEN_COLOR,
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                center: {
                    text: `${itemInfo["myItems"]}/${itemInfo["averageItems"]} On-Track`,
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

function loadSkillsLearnedTimeSeries() {
    let skillsLearned = getItemLearningHistory();

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
                // pointBackgroundColor: "",
            }]
        },
        options: {
            "legend": {
                "position": "bottom"
            }
        }
    });
}

function getAssessmentHistory() {
    return [{
        "name": "Assessment 1",
        "items_learned": 20,
        "items_tested": 21,
        "id": 0
    }, {
        "name": "Assessment 2",
        "items_learned": 10,
        "items_tested": 15,
        "id": 1
    }, {
        "name": "Assessment 3",
        "items_learned": 5,
        "items_tested": 10,
        "id": 2
    }
];
}


function genAssesmentHTML(assessment) {
    return $("<div>", {"class": "list-group"}).append(
        $("<a>", {"class": "list-group-item", "href": "#"}).on("click", () => {
            // TODO: Go to ass
        }).text(`${assessment.name} ${assessment.items_learned} / ${assessment.items_tested}`)
    );
}

function loadAssessmentHistory() {
    let assements = getAssessmentHistory();
    let htmlAssements = assements.map((ass)=>genAssesmentHTML(ass));
    $("#assessment-history").append(
        htmlAssements
    );
}

function getExpectedItems() {
    return 30;
}

function loadExpectedItems() {
    let expectedItems = getExpectedItems();
    $("#expected-skills").append(
        $("<div>", {class:"container"}).append(
            $("<p>").text("Expected number of skills to keep pace with the course"),
            $("<p>").text(`${expectedItems}`)
        )
    );
}

function getAverageItems() {
    return 20;
}

function loadAverageItems() {
    let averageItems = getAverageItems();
    let avg_skills = $("#average-skills");
    let creation = $("<div>", {class:"container"}).append(
        $("<p>").text("Average number of items learned by your peers"),
        $("<p>").text(`${averageItems}`)
    )
    avg_skills.append(
        creation
    );
}


window.addEventListener("load", () => {
    loadItemsLearnedChart();
    loadItemsExpectedChart();
    loadItemsAverageChart()
    loadSkillsLearnedTimeSeries();
    loadAssessmentHistory();
    loadExpectedItems();
    loadAverageItems();
});onload
