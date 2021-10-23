//the variable testdata["questions"] has test questions
//this stuff all happens in the div with id test-area

testarea = document.getElementById("test-area");
for (var i = 0; i < testdata["questions"].length; i++) {
	console.log("adding question")
	var qdiv = document.createElement("DIV");
	var qprompt = document.createElement("P");
	qdiv.appendChild(qprompt);
	qprompt.innerHTML = testdata["questions"][i]["prompt"];
	for (var k = 0; k < testdata["questions"][i]["options"].length; k++) {
		var qoptdiv = document.createElement("DIV");
		var qopt = document.createElement("INPUT");
		qopt.setAttribute("type","radio");
		qopt.setAttribute("name","q"+String(i));
		//get answer made via checking value and converting to int
		qopt.setAttribute("value",String(k));
		qtext = document.createElement("SPAN");
		qtext.innerHTML = testdata["questions"][i]["options"][k];
		qoptdiv.appendChild(qopt);
		qoptdiv.appendChild(qtext);
		qdiv.appendChild(qoptdiv);
		console.log(qopt);
		console.log(qtext);
		console.log(qdiv);
	}
	console.log(i);
	var qdivsubmit = document.createElement("BUTTON");
	qdivsubmit.onclick = function(){submitAnswer("q"+String(i));};
	qdivsubmit.innerHTML = "Submit";
	qdiv.appendChild(qdivsubmit);
	document.getElementById("test-area").appendChild(qdiv);
}

function submitAnswer(strname) {
	console.log(strname);
	var checkkey = 'input[name = "'+strname+'"]:checked';
	var checked_ans = document.querySelector(checkkey);

	if(checked_ans != null){  //Test if something was checked
	alert(checked_ans.value); //Alert the value of the checked.
	} else {
	alert('Nothing checked'); //Alert, nothing was checked.
	}
}