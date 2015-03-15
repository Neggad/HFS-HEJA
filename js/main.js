// When pages is fully loaded- do this
$(document).ready(function() {
  document.getElementById("startView").style.display = "inherit";
  document.getElementById("mapView").style.display = "none";
});

// When click on enter
$(document).keypress(function(e) {
    if(e.which == 13 && $("startView").is(":visible")) {
        $( "#searchButton" ).click(); // Act like when serachButton is clicked
    }
    if(e.which == 13 && $("mapView").is(":visible")) {
        $( "#control-panel-searchButton" ).click(); // Act like when serachButton is clicked
    }
});

var popupInfo = new popupInfo();
var data = new data();

