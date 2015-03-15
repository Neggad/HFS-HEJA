// When pages are fully loaded - do this
$(document).ready(function() {
  document.getElementById("startView").style.display = "none";
  document.getElementById("mapView").style.display = "inherit";
});

// When click on enter
$(document).keypress(function(e) {
    if(e.which == 13 && $("startView").is(":visible")) {
        $( "#searchButton" ).click(); // Act like when searchButton is clicked
    }
    if(e.which == 13 && $("mapView").is(":visible")) {
        $( "#control-panel-searchButton" ).click(); // Act like when searchButton is clicked
    }
});

var popupInfo = new popupInfo();
var data = new data();
var tempgraph = new tempgraph();
