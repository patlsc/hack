const beta = {
    "a": 0.05,
    "b": 0.05,
    "c": 0.05,
    "d": 0.05,
    "e": 0.05,
    "f": 0.05
}

const eta = {
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0,
    "e": 0,
    "f": 0
}

const fs = require('fs');

let raw_json = fs.readFileSync('../ls.json');
let learning_space = JSON.parse(raw_json);

let priors = []

for (const state of learning_space) {
    priors[state.id] = 1 / learning_space.length
}

function* range(start, end, step) {
    while (start < end) {
        yield start;
        start += step;
    }
}

let history = [{
    "K": "a",
    "R": 0,
    "Q": "",
    "M": new Set(learning_space)
}]

function get_neighbors(state) {
    let epsilon_neighborhood = []
    epsilon_neighborhood.push(state)
    for (const id of state.before) {
        epsilon_neighborhood.push(learning_space[id])
    }
    for (const id of state.neighbors) {
        epsilon_neighborhood.push(learning_space[id])
    }
    return new Set(epsilon_neighborhood)
}

function split_states(possible_states) {
    let occurrence_count = new Object()
    if (possible_states.size === 1) {
        possible_states = get_neighbors(possible_states.values().next().value)
    }
    for (const state of possible_states) {
        for (const item of state.self) {
            if (!(item in occurrence_count)) {
                occurrence_count[item] = 0
            }
            occurrence_count[item] += 1
        }
    }
    let min_diff = possible_states.size + 1
    let min_occur = -1
    for (const item in occurrence_count) {
        let complement = possible_states.size - occurrence_count[item]
        let diff = Math.abs(complement - occurrence_count[item])
        if (diff <= min_diff) {
            min_diff = diff
            min_occur = occurrence_count[item]
        }
    }

    let result = []
    for (const item in occurrence_count) {
        if (occurrence_count[item] === min_occur) {
            result.push(item)
        }
    }
    return result
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const readline = require('readline');
const Console = require("console");

const rl = readline.createInterface({
    input: process.stdin, //or fileStream
    output: process.stdout
});

async function prompt_question(current_time) {
    let question_possibilities = split_states(history[current_time].M)
    let question = question_possibilities[getRandomInt(question_possibilities.length)]
    history[current_time].Q = question
    console.log(question + "? (1-Correct/0-Incorrect)")
    const it = rl[Symbol.asyncIterator]();
    const answer = await it.next()
    history[current_time].R = parseInt(answer.value)
    return history[current_time].R
}

function posterior_prob_r(current_state,) {

}

function updates_priors(current_state, response) {

}

function filter_by_question(belief_state, question) {
    let filtered = []
    for (const state of belief_state) {
        if (state.self.includes(question)) {
            filtered.push(state)
        }
    }
    return filtered
}

function filter_by_complement_question(belief_state, question) {
    let filtered = []
    for (const state of belief_state) {
        if (!(state.self.includes(question))) {
            filtered.push(state)
        }
    }
    return filtered
}

function state_contains_question(belief_state, question) {
    for (const item of belief_state) {
        if (item.self.includes(question)) {
            return true
        }
    }
    return false
}

function update_belief_state(current_belief, question, response) {
    if (response === 0) {
        Console.log("check")
    }
    if (response === 1 && !state_contains_question(current_belief, question) && current_belief.size === 1) {
        current_belief = get_neighbors(current_belief.values().next().value)
    }
    if (response === 0 && state_contains_question(current_belief, question) && current_belief.size === 1) {
        current_belief = get_neighbors(current_belief.values().next().value)
    }

    let next_belief = []
    if (response === 1) {
        next_belief = filter_by_question(current_belief, question)
    } else {
        next_belief = filter_by_complement_question(current_belief, question)
    }
    return new Set(next_belief)
}

const max_step = 20;

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

(async () => {
    for (var i = 1; i <= max_step; ++i) {
        console.log("Belief State Size: " + history[i - 1].M.size)
        let current_answer = await prompt_question(i - 1)
        let next_belief = update_belief_state(history[i - 1].M, history[i - 1].Q, current_answer)
        history.push({
            "M": next_belief,
            "Q": "",
            "R": 0,
            "K": "a"
        })
        if (next_belief.size === 1) {
            console.log("Reached 1 knowledge state")
        }
        if (eqSet(next_belief, history[i - 1].M)) {
            console.log("Stuck unless alternative input")
        }
    }
    console.log(history[max_step].M)
})()