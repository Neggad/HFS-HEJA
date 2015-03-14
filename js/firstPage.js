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

// Autocomplete searchfunction
$(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#searchField" ).autocomplete({
      source: availableTags
    });
  });
