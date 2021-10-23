//the variable testdata["questions"] has test questions
//this stuff all happens in the div with id test-area
questionDataList = [
	{
		"prompt":"sneeds feed and seed or chucks feed and seed?",
		"options":["sneeds","chucks"],
		"correct":0,
		"associatedknowledge":["sneed","chuck"]
	},
	{
		"prompt":"question 2",
		"options":["sneeds","chucks"],
		"correct":1,
		"associatedknowledge":["sneed","chuck"]
	},
	{
		"prompt":"question 3",
		"options":["sneeds","chucks"],
		"correct":0,
		"associatedknowledge":["sneed","chuck"]
	}
]
currentQuestionData = questionDataList[0];
currentQuestionData["qnumber"] = 1;
currentQuestionData["qmax"] = String(questionDataList.length);
currentQuestionNumber = 0;

answerHistory = [];

QUESTIONTIMEOUT = 1000;

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
			correcttext.innerHTML = "Correct!";
			testarea.appendChild(correcttext);
			answerCorrect = true;
		} else {
			//user is wrong
			var wrongtext = document.createElement("H3");
			wrongtext.style.color = "red";
			var corans = currentQuestionData["options"][parseInt(currentQuestionData["correct"])];
			wrongtext.innerHTML = "Incorrect. Correct answer is '" + corans + "'.";
			testarea.appendChild(wrongtext);
		}

		answerHistory.push({
			"prompt":currentQuestionData["prompt"],
			"correct":answerCorrect,
			"associatedknowledge":currentQuestionData["associatedknowledge"]
		});

		//checking if test is over
		if (currentQuestionNumber == questionDataList.length-1) {
			console.log(answerHistory);
			setTimeout(endTest, QUESTIONTIMEOUT);
		} else {
			setTimeout(startNewQuestion, QUESTIONTIMEOUT);
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