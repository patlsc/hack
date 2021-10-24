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
		"prompt":"Which choice is the graph of y=(4–x)(x+2)?",
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
		"prompt":"A company models its net income, in thousands of dollars, with the function f(x)=9x²–54x–144, where x is the number of units of its product sold. How many units of its product does the company need to sell in order for the net income to equal $0?",
		"options":["5","-2","8","10"],
		"correct":2,
		"type":"d"
	},
	{
		"prompt":"The function f(x)=–0.25x+5 models the height of a candle x seconds after it is lit. What is the meaning of the y-intercept of the function? ",
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
		"prompt":"The function a(n) = 3n – 7 represents the value of the nth term in a sequence. What is the sum of the 1st and 5th terms of the sequence? ",
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
		"prompt":"Which equation represents the line that is perpendicular to the graph of 4x + 3y = 9 and passes through (–2, 3)?",
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
		"type":"f"
	},
]
currentQuestionData = questionDataList[0];
currentQuestionData["qnumber"] = 1;
currentQuestionData["qmax"] = String(questionDataList.length);
currentQuestionNumber = 0;

answerHistory = [];

QUESTIONTIMEOUT = 1500;

//updates currentQuestionData and clears screen
function startNewQuestion() {
	currentQuestionNumber += 1;
	currentQuestionData = questionDataList[currentQuestionNumber];
	currentQuestionData["qnumber"] = String(currentQuestionNumber+1);
	currentQuestionData["qmax"] = String(questionDataList.length);
	clearQuestionArea();
	addQuestion(currentQuestionData);
}

testarea = document.getElementById("test-area");
function addQuestion(questionData) {
	var qnumbertitle = document.createElement("H3");
	qnumbertitle.innerHTML = "Question " + String(questionData["qnumber"]) + "/" + String(questionData["qmax"]);
	testarea.appendChild(qnumbertitle);

	var qprogressdiv = document.createElement("DIV");
	qprogressdiv.setAttribute("class","progress");
	qprogressdiv.setAttribute("width","50%");
	var qprogressin = document.createElement("DIV");
	qprogressin.setAttribute("class","progress-bar");
	qprogressin.setAttribute("role","progressbar");
	var progressamt = String(parseInt(Math.round(100*parseFloat(questionData["qnumber"])/parseFloat(questionData["qmax"]))));
	qprogressin.setAttribute("style","width:"+progressamt+"%");
	qprogressin.setAttribute("aria-valuemin","0");
	qprogressin.setAttribute("aria-valuemax","100");
	qprogressdiv.appendChild(qprogressin);
	testarea.appendChild(qprogressdiv);

	var qprompt = document.createElement("P");
	testarea.appendChild(qprompt);
	qprompt.innerHTML = questionData["prompt"];
	for (var k = 0; k < questionData["options"].length; k++) {
		var qoptdiv = document.createElement("DIV");
		var qopt = document.createElement("INPUT");
		qopt.setAttribute("type","radio");
		qopt.setAttribute("name","qoption");
		//get answer made via checking value and converting to int
		qopt.setAttribute("id","qopt"+String(k));
		qopt.setAttribute("value","qopt"+String(k));
		qtext = document.createElement("LABEL");
		qtext.setAttribute("for","qopt"+String(k));
		qtext.innerHTML = questionData["options"][k];
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
		if (currentQuestionNumber == questionDataList.length-1) {
			console.log(answerHistory);
			setTimeout(endTest, QUESTIONTIMEOUT);
		} else {
		}

	} else {
		alert('Nothing checked'); //Alert, nothing was checked.
	}
}

function endTest() {
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
