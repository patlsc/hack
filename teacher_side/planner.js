function buildTopicsStruggledWith() {
    const component = document.getElementById("struggle-topics")

    // Add struggle topics component
    // A topic can be struggled with on three levels of severity, with 0 being the least severe and 2 being the most severe.
    const STRUGGLE_TOPICS = [
        ["2.A.1 Solving systems of linear equations", 2],
        ["2.A.2 Timesing", 2],
        ["2.B.5 Eating", 1],
        ["2.C.3 Doing something else", 0]
    ]
    
    var topicDivs = buildStruggleTopics(STRUGGLE_TOPICS)
    var wrappers = []
    for (var i = 0; i < topicDivs.length; i++) {
        component.appendChild(topicDivs[i])
        wrappers.push(new TopicWrapper(topicDivs[i], component))
    }

    // Add caption
    const caption = document.createElement("DIV")
    caption.classList.add("caption-text")
    caption.innerHTML = "Select a topic to view more detailed insights on your students' strengths and weaknesses."
    component.appendChild(caption)

    return wrappers
}

function subtitledSection(title, students) {
    const section = document.createElement("DIV")
    section.classList.add("insight-component")

    const titleDiv = document.createElement("DIV")
    titleDiv.classList.add("subtitle-text")
    titleDiv.innerHTML = title
    section.appendChild(titleDiv)

    for (let i = 0; i < students.length; i++) {
        const name = students[i]

        const student = document.createElement("DIV")

        student.classList.add("col")
        student.classList.add("student")
        student.innerHTML = name

        section.appendChild(student)
    }

    return section
}

class TopicWrapper {
    constructor(div, parent) {
        this.div = div
        this.parent = parent
        this.selected = false
    }

    select() {
        if (this.selected) {
            this.selected = false
        } else {
            this.selected = true
        }
    }
}

function buildStruggleTopics(topics) {
    var divs = []
    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i][0]
        const severity = topics[i][1]

        const topicDiv = document.createElement("DIV")

        topicDiv.classList.add("col")
        topicDiv.classList.add("topic")
        topicDiv.innerHTML = topic
        const wrapper = new TopicWrapper(topicDiv)
        topicDiv.addEventListener("click", function() {
            if (wrapper.selected) {
                topicDiv.classList.remove("selected")
            } else {
                topicDiv.classList.add("selected")
            }

            wrapper.select()
        })

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

        divs.push(topicDiv)
    }

    return divs
}

function buildInsights(wrappers) {
    const component = document.getElementById("insight-content")
    const STRUGGLE_TOPICS = [
        ["2.A.1 Solving systems of linear equations", 2],
        ["2.A.2 Timesing", 2]
    ]
    const newTopicDivs = buildStruggleTopics(STRUGGLE_TOPICS)
    var selectedWrappers = []
    for (var i = 0; i < newTopicDivs.length; i++) {
        component.appendChild(newTopicDivs[i])
        selectedWrappers.push(new TopicWrapper(newTopicDivs[i], component))
    }

    component.appendChild(subtitledSection("Students struggling most", ["John Doe", "Tyrone Smalls", "Jeremy Wood"]))
    component.appendChild(subtitledSection("Students with content mastery", ["Kyle Mike", "Shell Sea"]))
}


window.addEventListener("load", function() {
    document.getElementById("title").innerHTML = "Math II - 2nd block lesson planner"

    var wrappers = buildTopicsStruggledWith()
    buildInsights(wrappers)
});