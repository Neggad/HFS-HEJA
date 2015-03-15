// When click the serach button
$( "#searchButton" ).click(function() {

  var result = $("#searchField").val();
  var names = data.getAllNames();

  console.log("Res: "+ result);
  console.log("Lat: "+ names[result][0]);
  console.log("Long: "+ names[result][1]);
  popupInfo.updateWeather(parseFloat(names[result][0]), parseFloat(names[result][1]));


  if(result == "" || names[result] == undefined) {
  	$("#searchField").attr("placeholder", "Sök på något råå");
  } else {
  	console.log("Till kartan");
      theMap(names[result]);
      document.getElementById("startView").style.display = "none";
      document.getElementById("mapView").style.display = "inherit";
      document.getElementById("popupInfo").style.display = "inherit";
  }
});

// When click on gps button
$( "#gpsButton" ).click(function() {
  console.log("GPS Clicked");
});

// When click on gps button
$( "#closeButton" ).click(function() {
  document.getElementById("popupInfo").style.display = "none";
});

// Fix autocomplete
$('#searchField').on('input', function() {
  var names = data.getAllNames();
  $( "#searchField" ).autocomplete({
    source: Object.keys(names)
  });
});
