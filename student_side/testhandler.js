let learning_space = [{"id": 0, "self": [], "neighbors": [1], "before": []}, {
	"id": 1,
	"self": ["a"],
	"neighbors": [2, 3, 5, 9],
	"before": [0]
}, {"id": 2, "self": ["a", "b"], "neighbors": [4, 6, 10], "before": [1]}, {
	"id": 3,
	"self": ["c", "a"],
	"neighbors": [4, 7, 11],
	"before": [1]
}, {"id": 4, "self": ["c", "a", "b"], "neighbors": [8, 12], "before": [2, 3]}, {
	"id": 5,
	"self": ["a", "d"],
	"neighbors": [6, 7, 13],
	"before": [1]
}, {"id": 6, "self": ["a", "d", "b"], "neighbors": [8, 14], "before": [2, 5]}, {
	"id": 7,
	"self": ["c", "a", "d"],
	"neighbors": [8, 15],
	"before": [3, 5]
}, {"id": 8, "self": ["c", "a", "d", "b"], "neighbors": [16], "before": [4, 6, 7]}, {
	"id": 9,
	"self": ["a", "e"],
	"neighbors": [10, 11, 13, 17],
	"before": [1]
}, {"id": 10, "self": ["a", "e", "b"], "neighbors": [12, 14, 18], "before": [2, 9]}, {
	"id": 11,
	"self": ["c", "a", "e"],
	"neighbors": [12, 15, 19],
	"before": [3, 9]
}, {"id": 12, "self": ["c", "a", "e", "b"], "neighbors": [16, 20], "before": [4, 10, 11]}, {
	"id": 13,
	"self": ["a", "d", "e"],
	"neighbors": [14, 15, 21],
	"before": [5, 9]
}, {"id": 14, "self": ["a", "d", "e", "b"], "neighbors": [16, 22], "before": [6, 10, 13]}, {
	"id": 15,
	"self": ["c", "a", "d", "e"],
	"neighbors": [16, 23],
	"before": [7, 11, 13]
}, {"id": 16, "self": ["a", "d", "b", "c", "e"], "neighbors": [24], "before": [8, 12, 14, 15]}, {
	"id": 17,
	"self": ["f", "a", "e"],
	"neighbors": [18, 19, 21],
	"before": [9]
}, {"id": 18, "self": ["f", "a", "e", "b"], "neighbors": [20, 22], "before": [10, 17]}, {
	"id": 19,
	"self": ["c", "f", "a", "e"],
	"neighbors": [20, 23],
	"before": [11, 17]
}, {"id": 20, "self": ["a", "b", "f", "c", "e"], "neighbors": [24], "before": [12, 18, 19]}, {
	"id": 21,
	"self": ["f", "a", "d", "e"],
	"neighbors": [22, 23],
	"before": [13, 17]
}, {"id": 22, "self": ["a", "d", "b", "f", "e"], "neighbors": [24], "before": [14, 18, 21]}, {
	"id": 23,
	"self": ["a", "d", "f", "c", "e"],
	"neighbors": [24],
	"before": [15, 19, 21]
}, {"id": 24, "self": ["a", "d", "b", "f", "c", "e"], "neighbors": [], "before": [16, 20, 22, 23]}];

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

function eqSet(as, bs) {
	if (as.size !== bs.size) return false;
	for (var a of as) if (!bs.has(a)) return false;
	return true;
}

function estimate_final_prob(history) {
	let occurrences = new Object()
	for (const h of history) {
		for (const state of h.M) {
			if (!(state.id in occurrences)) {
				occurrences[state.id] = 0
			}
			occurrences[state.id] += 1
		}
	}
	let sum = 0.0
	for (const id in occurrences) {
		sum += occurrences[id]
	}
	for (const id in occurrences) {
		occurrences[id] = occurrences[id] / sum
	}
	return occurrences
}

//the variable testdata["questions"] has test questions
//this stuff all happens in the div with id test-area
/*
a = solve linear eq
b = graph linear eq 
c = interpret linear eq 
d = linear eq word problems 
e = solve system of linear eq 
f = probability. formerly system of linear eq word problems
*/
questionDataList = [
	{
		"prompt":"Which choice is the graph of y=(4-x)(x+2)?",
		"options":["<img src='q1graph1.png'>","<img src='q1graph2.png'>"],
		"correct":1,
		"type":"b"
	},
	{
		"prompt":"In which graph does the shaded region represent the solution set for the inequality 2x-y<4",
		"options":["<img src='q2graph1.png'>","<img src='q2graph2.png'>"],
		"correct":1,
		"type":"b"
	},
	{
		"prompt":"A line, y = mx + b, passes through the point (1, 6) and is parallel to y = 4x + 6. What is the value of b? ",
		"options":["1","2","4","6"],
		"correct":1,
		"type":"a"
	},
	{
		"prompt":"A company models its net income, in thousands of dollars, with the function f(x)=9x²-54x-144, where x is the number of units of its product sold. How many units of its product does the company need to sell in order for the net income to equal $0?",
		"options":["5","-2","8","10"],
		"correct":2,
		"type":"d"
	},
	{
		"prompt":"The function f(x)=-0.25x+5 models the height of a candle x seconds after it is lit. What is the meaning of the y-intercept of the function? ",
		"options":["The initial height of the candle","The final height of the candle","The rate at which the candle is burning","The time it will take for the candle to burn"],
		"correct":0,
		"type":"c"
	},
	{
		"prompt":"The total cost, in dollars, of membership in a fitness center is given by the function c(m)=20m+40, where m is the number of months a person is a member. In dollars, how much is the cost of a membership for 1 year? ",
		"options":["20","120","360","240"],
		"correct":3,
		"type":"c"
	},
	{
		"prompt":"Karen has two dogs. The larger dog weighs 1.4 pounds more than the smaller dog. The combined weight of the two dogs is 12.6 pounds. What is the weight, in pounds, of the smaller dog?",
		"options":["6.4","5.6","7","5.4"],
		"correct":1,
		"type":"d"
	},
	{
		"prompt":"Which choice could be modeled by a linear function?",
		"options":["the amount of money, y, in an account after x years earning 4% interest compounded annually","the monthly cost, y, to use a cell phone for x minutes at a rate of 4 cents per minute","the height, y, of a ball after bouncing x times, if each bounce reaches 2/3 the previous height"],
		"correct":1,
		"type":"c"
	},
	{
		"prompt":"The function a(n) = 3n - 7 represents the value of the nth term in a sequence. What is the sum of the 1st and 5th terms of the sequence? ",
		"options":["4","1","2","6"],
		"correct":0,
		"type":"a"
	},
	{
		"prompt":"The width of a rectangle is 3/4 its length. The perimeter of the rectangle is 420 ft. What is the length, in feet, of the rectangle?",
		"options":["160","80","120","150"],
		"correct":2,
		"type":"d"
	},
	{
		"prompt":"What is the value of x in the system of equations 5x+4y=1, y=1-x",
		"options":["x=3, y=-2","x=-3, y=4","x=5, y=2","x=1, y=3"],
		"correct":1,
		"type":"e"
	},
	{
		"prompt":"Which equation represents the line that is perpendicular to the graph of 4x + 3y = 9 and passes through (-2, 3)?",
		"options":["3x-4y=-18","3x+4y=18","3x-4y=-6","3x+4y=6"],
		"correct":0,
		"type":"b"
	},
	{
		"prompt":"A club began with 3 members. Each month, each member brought one new member. Which function can be used to determine the number of members x months after the club began?",
		"options":["2x+3","3x+1","1.5(2)^x","3(2)^x"],
		"correct":3,
		"type":"d"
	},
	{
		"prompt":"Abby scored 87, 93, 96, and 89 on her first four history quizzes. What score does Abby need to get on her fifth quiz to have an average of exactly 91 on her history quizzes?",
		"options":["90","94","98","100"],
		"correct":0,
		"type":"d"
	},
	{
		"prompt":"What is the value of x where the graphs of f(x)=3x+7 and g(x)=2x+12 intersect?",
		"options":["-22","-5","5","2"],
		"correct":2,
		"type":"e"
	},
	{
		"prompt":"A bag contains 50 marbles, 28 red ones and 22 blue ones. A marble is picked at random from the bag. What is the probability of picking a red marble?",
		"options":["22/50","28/50","50/28","50/22"],
		"correct":1,
		"type":"f"
	},
	{
		"prompt":"A one digit number from 1 to 9 is picked, what is the probability it is odd?",
		"options":["4/9","1/2","3/4","5/9"],
		"correct":3,
		"type":"f"
	},
	{
		"prompt":"You roll two 6-sided dice. What is the probability the sum is 3?",
		"options":["2/36","1/36","1/6","4/36"],
		"correct":0,
		"type": "f"
	},
]
currentQuestionData = questionDataList[0];
currentQuestionNumber = 0;

answerHistory = []

MAX_QUESTIONS = 6
QUESTIONTIMEOUT = 1500;

function find_question_of_type(type) {
	let selector = []
	for (const q of questionDataList) {
		if (q.type === type) {
			selector.push(q)
		}
	}
	return selector[getRandomInt(selector.length)]
}

//updates currentQuestionData and clears screen
function startNewQuestion() {
	if (currentQuestionNumber > 0) {
		history[currentQuestionNumber - 1].R = 0
		if (answerHistory[currentQuestionNumber - 1].correct) {
			history[currentQuestionNumber - 1].R = 1
		}
		let next_belief = update_belief_state(history[currentQuestionNumber - 1].M, history[currentQuestionNumber - 1].Q, history[currentQuestionNumber - 1].R)
		history.push({
			"M": next_belief,
			"Q": "",
			"R": 0,
			"K": "a"
		})
		if (next_belief.size === 1) {
			console.log("Reached 1 knowledge state")
		}
		if (eqSet(next_belief, history[currentQuestionNumber - 1].M)) {
			console.log("Stuck unless alternative input, exiting")
		}
	}
	let question_possibilities = split_states(history[currentQuestionNumber].M)
	let question = question_possibilities[getRandomInt(question_possibilities.length)]
	history[currentQuestionNumber].Q = question
	currentQuestionNumber += 1;
	currentQuestionData = find_question_of_type(question)
	clearQuestionArea();
	addQuestion();
}

testarea = document.getElementById("test-area");
function addQuestion() {
	var qnumbertitle = document.createElement("H3");
	qnumbertitle.innerHTML = "Question " + String(currentQuestionNumber+1) + "/" + String(MAX_QUESTIONS);
	testarea.appendChild(qnumbertitle);

	var qprogressdiv = document.createElement("DIV");
	qprogressdiv.setAttribute("class","progress");
	qprogressdiv.setAttribute("width","50%");
	var qprogressin = document.createElement("DIV");
	qprogressin.setAttribute("class","progress-bar");
	qprogressin.setAttribute("role","progressbar");
	var progressamt = String(parseInt(Math.round(100*parseFloat(currentQuestionNumber+1)/parseFloat(MAX_QUESTIONS))));
	qprogressin.setAttribute("style","width:"+progressamt+"%");
	qprogressin.setAttribute("aria-valuemin","0");
	qprogressin.setAttribute("aria-valuemax","100");
	qprogressdiv.appendChild(qprogressin);
	testarea.appendChild(qprogressdiv);

	var qprompt = document.createElement("P");
	testarea.appendChild(qprompt);
	qprompt.innerHTML = currentQuestionData["prompt"];
	for (var k = 0; k < currentQuestionData["options"].length; k++) {
		var qoptdiv = document.createElement("DIV");
		var qopt = document.createElement("INPUT");
		qopt.setAttribute("type","radio");
		qopt.setAttribute("name","qoption");
		//get answer made via checking value and converting to int
		qopt.setAttribute("id","qopt"+String(k));
		qopt.setAttribute("value","qopt"+String(k));
		qtext = document.createElement("LABEL");
		qtext.setAttribute("for","qopt"+String(k));
		qtext.innerHTML = currentQuestionData["options"][k];
		qoptdiv.appendChild(qopt);
		qoptdiv.appendChild(qtext);
		testarea.appendChild(qoptdiv);
	}
	var qdivsubmit = document.createElement("BUTTON");
	qdivsubmit.setAttribute("class","btn btn-primary");
	qdivsubmit.setAttribute("style","margin:25px");
	qdivsubmit.setAttribute("id","qsubmit");
	qdivsubmit.onclick = function(){submitAnswer();};
	qdivsubmit.innerHTML = "Submit";
	testarea.appendChild(qdivsubmit);
}

addQuestion(currentQuestionData);

function clearQuestionArea() {
	testarea.innerHTML = "";
}

function submitAnswer() {
	var checkkey = 'input[name = "qoption"]:checked';
	var checked_ans = document.querySelector(checkkey);
	var answerCorrect = false;

	if(checked_ans != null){  //Test if something was checked
		if (String(checked_ans.value) == "qopt" + String(currentQuestionData["correct"])) {
			//user is correct
			var correcttext = document.createElement("H3");
			correcttext.style.color = "green";
			document.getElementById("qsubmit").disabled = true;
			correcttext.innerHTML = "Correct!";
			testarea.appendChild(correcttext);
			answerCorrect = true;

			setTimeout(startNewQuestion, QUESTIONTIMEOUT);
		} else {
			//user is wrong
			var wrongtext = document.createElement("H3");
			wrongtext.style.color = "red";
			document.getElementById("qsubmit").disabled = true;
			var corans = currentQuestionData["options"][parseInt(currentQuestionData["correct"])];
			wrongtext.innerHTML = "Incorrect. Correct answer is '" + corans + "'.";
			testarea.appendChild(wrongtext);

			var wrongcontinuebtn = document.createElement("BUTTON");
			wrongcontinuebtn.setAttribute("class","btn btn-secondary");
			wrongcontinuebtn.setAttribute("style","margin:25px");
			wrongcontinuebtn.innerHTML = "Continue";
			wrongcontinuebtn.onclick = function(){startNewQuestion();};
			testarea.appendChild(wrongcontinuebtn);
		}

		answerHistory.push({
			"prompt":currentQuestionData["prompt"],
			"correct":answerCorrect,
			"type":currentQuestionData["type"]
		});

		//checking if test is over
		if (currentQuestionNumber == MAX_QUESTIONS - 1) {
			console.log(answerHistory);
			setTimeout(endTest, QUESTIONTIMEOUT);
		} else {
		}

	} else {
		alert('Nothing checked'); //Alert, nothing was checked.
	}
}

function endTest() {
	history[answerHistory.length - 1].R = 0
	if (answerHistory[answerHistory.length - 1].correct) {
		history[answerHistory.length - 1].R = 1
	}
	let next_belief = update_belief_state(history[answerHistory.length - 1].M, history[answerHistory.length - 1].Q, history[answerHistory.length - 1].R)
	history.push({
		"M": next_belief,
		"Q": "",
		"R": 0,
		"K": "a"
	})
	if (next_belief.size === 1) {
		console.log("Reached 1 knowledge state")
	}
	if (eqSet(next_belief, history[answerHistory.length - 1].M)) {
		console.log("Stuck unless alternative input, exiting")
	}

	console.log("Last State: " + history[answerHistory.length].M)
	console.log("Estimated Distribution:" + estimate_final_prob(history))

	clearQuestionArea();
	var testendtitle = document.createElement("H2");
	testendtitle.innerHTML = "Test Results";
	testarea.appendChild(testendtitle);

	var sumCorrect = 0;
	for (var j = 0; j < answerHistory.length; j++) {
		var anstext = document.createElement("P");
		var txtcorrectindicator = answerHistory[j]["correct"] ? "Correct" : "Incorrect";
		var txtpromptindicator = answerHistory[j]["prompt"].length > 20 ? answerHistory[j]["prompt"].substring(0,20)+"..." : answerHistory[j]["prompt"];
		anstext.innerHTML = txtpromptindicator + "\t" + txtcorrectindicator;
		sumCorrect += answerHistory[j]["correct"] ? 1 : 0;
		testarea.appendChild(anstext);
	}
	var testendscore = document.createElement("H3");
	testendscore.innerHTML = "Total Score: " + String(sumCorrect) + "/" + String(answerHistory.length);
	testarea.appendChild(testendscore);
}
