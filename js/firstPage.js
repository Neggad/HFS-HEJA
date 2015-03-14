// When click the serach button
$( "#searchButton" ).click(function() {
  console.log("Serach Clicked");
  console.log("INput: "+ $("#searchField").val());

  var result = $("#searchField").val();
  var names = data.getAllNames();
  console.log("EYah: " + names[result]);


  if(result == "" || names[result] == undefined) {
  	$("#searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
  }
});

// When click on gps button
$( "#gpsButton" ).click(function() {
  console.log("GPS Clicked");
});

// Fix autocomplete
$('#searchField').on('input', function() {
  var names = data.getAllNames();
  $( "#searchField" ).autocomplete({
    source: Object.keys(names)
  });
});
