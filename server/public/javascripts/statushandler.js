function display_skills(skill_type, skills) {
    let skill_list = document.getElementById(skill_type).getElementsByTagName("div")
    for (const skill of skills) {
        let skill_link = document.createElement("a")
        skill_link.setAttribute("class", "list-group-item")
        skill_link.setAttribute("href", "/skills/" + skill.id)
        skill_link.innerText = skill.name
        skill_list[0].appendChild(skill_link)
    }
}

function display_skill_count(status_data) {
    let learnt_count = document.getElementById("learnt-count")
    learnt_count.innerText = status_data.learnt_skills.length.toString()
    let practice_count = document.getElementById("practice-count")
    practice_count.innerText = status_data.wip_skills.length.toString()
    let forgot_count = document.getElementById("forgot-count")
    forgot_count.innerText = status_data.forgotten_skills.length.toString()
}

function display_all_skills(status_data) {
    display_skills("skill-learnt", status_data.learnt_skills)
    display_skills("needs-practice", status_data.wip_skills)
    display_skills("skill-forgot", status_data.forgotten_skills)
    display_skill_count(status_data)
}

function display_questions(questions) {
    let question_block = document.getElementById("question-summary")
    console.log(question_block)
    let i, j, temporary, chunk = Math.ceil(questions.length / 3);
    for (i = 0, j = questions.length; i < j; i += chunk) {
        temporary = questions.slice(i, i + chunk);
        let container = document.createElement("div")
        container.setAttribute("class", "col")
        let sublist = document.createElement("div")
        sublist.setAttribute("class", "list-group col")
        for (const question of temporary) {
            let question_link = document.createElement("a")
            if (question.correctness === 1) {
                question_link.setAttribute("class", "list-group-item list-group-item-success")
            } else if (question.correctness === 0) {
                question_link.setAttribute("class", "list-group-item list-group-item-danger")
            } else {
                question_link.setAttribute("class", "list-group-item list-group-item-warning")
            }

            question_link.setAttribute("href", "/questions/" + question.id)
            question_link.innerText = "Question " + question.number
            container.appendChild(question_link)
            sublist.appendChild(container)
        }
        question_block.appendChild(sublist)
    }

}

function init() {
    display_all_skills(status_data)
    display_questions(status_data.questions)
}

window.onload = init