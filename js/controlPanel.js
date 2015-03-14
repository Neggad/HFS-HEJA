// When click the serach button
$("#cp").click(function() {
  console.log("Search Clicked in control");
  console.log("Input: "+ $("#searchField").val());

  var result = $("#control-panel-searchField").val();

  if(result == "") {
  	$("#control-panel-searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
  }
});

