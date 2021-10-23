//the variable testdata["questions"] has test questions
//this stuff all happens in the div with id test-area
function loadTest() {
testarea = document.getElementById("test-area");
for (var i = 0; i < testdata["questions"].length; i++) {
	console.log("adding question")
	var qdiv = document.createElement("DIV");
	console.log(testdata["questions"][i]["options"]);
	for (var k = 0; k < testdata["questions"][i]["options"]; k++) {
		var qopt = document.createElement("INPUT");
		qopt.setAttribute("type","radio");
		qopt.setAttribute("name","q"+String(i));
		//get answer made via checking value and converting to int
		qopt.setAttribute("value",String(k));
		qopt.innerHTML = testdata["questions"][i]["options"][k];
		console.log(qopt);
		qdiv.appendChild(qopt);
	}
	testarea.appendChild(qdiv);
}

var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode("Water");         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("test-area").appendChild(node);     // Append <li> to <ul> with id="myList"
		var qopt = document.createElement("INPUT");
		qopt.setAttribute("type","radio");
		qopt.setAttribute("name","sneed");
		//get answer made via checking value and converting to int
		qopt.setAttribute("value","Sneed");
		document.getElementById("test-area").appendChild(qopt);

}
loadTest();

function checkTest() {

}