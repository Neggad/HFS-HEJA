// When click the serach button
$( "#searchButton" ).click(function() {
  console.log("Serach Clicked");
  console.log("INput: "+ $("#searchField").val());

  var result = $("#searchField").val();

  if(result == "") {
  	$("#searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
  }
});

// When click on enter
$(document).keypress(function(e) {
    if(e.which == 13) {
        $( "#searchButton" ).click(); // Act like when serachButton is clicked
    }
});

// When click on gps button
$( "#gpsButton" ).click(function() {
  console.log("GPS Clicked");
});