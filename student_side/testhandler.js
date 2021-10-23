//the variable testdata["questions"] has test questions
//this stuff all happens in the div with id test-area

qdataexample = {
	"qnumber":"1",
	"prompt":"sneeds feed and seed or chucks feed and seed?",
	"options":["sneeds","chucks"],
	"correct":0
}
function getCurrentQuestionData() {
	return qdataexample;
}

testarea = document.getElementById("test-area");
function addQuestion(questionData) {
	var qnumbertitle = document.createElement("H3");
	qnumbertitle.innerHTML = "Question Number " + String(questionData["qnumber"]);
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
		qopt.setAttribute("value",String(k));
		qtext = document.createElement("SPAN");
		qtext.innerHTML = questionData["options"][k];
		qoptdiv.appendChild(qopt);
		qoptdiv.appendChild(qtext);
		testarea.appendChild(qoptdiv);
	}
	var qdivsubmit = document.createElement("BUTTON");
	qdivsubmit.setAttribute("class","btn btn-primary");
	qdivsubmit.onclick = function(){submitAnswer();};
	qdivsubmit.innerHTML = "Submit";
	testarea.appendChild(qdivsubmit);
}
addQuestion(getCurrentQuestionData());
function submitAnswer(questionData) {
	var checkkey = 'input[name = "qoption"]:checked';
	var checked_ans = document.querySelector(checkkey);

	if(checked_ans != null){  //Test if something was checked
		if (String(checked_ans.value) == String(getCurrentQuestionData()["correct"])) {
			//user is correct
			alert("Good job");
		} else {
			//user is wrong
			alert("Wrong");
		}
	} else {
	alert('Nothing checked'); //Alert, nothing was checked.
	}
}