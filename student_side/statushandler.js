function display_skills(skill_type, skills) {
    let skill_list = document.getElementById(skill_type).getElementsByTagName("ul")
    for (const skill of skills) {
        let list_item = document.createElement("li")
        list_item.setAttribute("class", "list-group-item")
        let skill_link = document.createElement("a")
        skill_link.setAttribute("href", "/skills/" + skill.id)
        skill_link.innerText = skill.name
        list_item.appendChild(skill_link)
        skill_list[0].appendChild(list_item)
    }
}

function display_all_skills(status_data) {
    display_skills("skill-learnt", status_data.learnt_skills)
    display_skills("needs-practice", status_data.wip_skills)
    display_skills("skill-forgot", status_data.forgotten_skills)
}

function display_questions(questions) {
    let question_list = document.getElementById("question-summary").getElementsByTagName("ul")
    for (const question of questions) {
        let question_li = document.createElement("li")
        if (question.correctness === 1) {
            question_li.setAttribute("class", "list-group-item list-group-item-success")
        } else if (question.correctness === 0) {
            question_li.setAttribute("class", "list-group-item list-group-item-danger")
        } else {
            question_li.setAttribute("class", "list-group-item list-group-item-warning")
        }
        let question_link = document.createElement("a")
        question_link.setAttribute("href", "/questions/" + question.id)
        question_link.innerText = "Question " + question.number
        question_li.appendChild(question_link)
        question_list[0].appendChild(question_li)
    }
}

function init() {
    display_all_skills(status_data)
    display_questions(status_data.questions)
}

window.onload = init