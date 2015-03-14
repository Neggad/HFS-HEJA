// When click the serach button
$("#cp").click(function() {
  console.log("Search Clicked in control");
  console.log("Input: "+ $("#control-panel-searchField").val());

  var result = $("#control-panel-searchField").val();

  if(result == "") {
  	$("#control-panel-searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
  }
});

// When click on le button to get le control-panel
$("#control-panel-help").click(function() {
	// OM den är inne
	if(document.getElementById("control-panel").style.left == "-250px") {
		document.getElementById("control-panel").style.left = "0px";
		document.getElementById("control-panel-help").style.left = "250px";
	} else { // Om den är ute
		document.getElementById("control-panel").style.left = "-250px";
		document.getElementById("control-panel-help").style.left = "0px";
	}
});

