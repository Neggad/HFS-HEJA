// When click the serach button
$( "#searchButton" ).click(function() {
  console.log("Serach Clicked");
  console.log("INput: "+ $("#searchField").val());

  var test = data.getAllNames();
  console.log("TEST: ", test);

  var result = $("#searchField").val();

  if(result == "") {
  	$("#searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
  }
});

// When click on gps button
$( "#gpsButton" ).click(function() {
  console.log("GPS Clicked");
});