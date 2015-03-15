var map;
var marker;
var markersArray = [];
var badplatsArray = [];
var badplatsDest = [];

var origin1 = 'Norrköping';

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function theMap(latlong) {

  var x = latlong[0];
  var y = latlong[1];

//load longlat data
d3.csv("data/LongLat_test.csv",function (csv) {
      //Add each badplats to badplats array
      csv.forEach(function(d){
          badplatsDest.push(new google.maps.LatLng(d.Latitud, d.Longitud));
          badplatsArray.push(d);
      });
  });


initialize();

 
function initialize() {
  var opts = {
    center: new google.maps.LatLng(x, y),
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('mapView'), opts);
  calculateDistances();
}

function calculateDistances() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: badplatsDest,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    deleteOverlays();

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //avstånd till alla mål från origo
      console.log(results[i].distance.text);
    }

    //Origin marker
    marker = new google.maps.Marker({
            position: new google.maps.LatLng(x, y),
            map: map,
            icon: originIcon
    });

    //Destination markers
    for (j = 0; j < badplatsArray.length; j++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(badplatsArray[j].Latitud, badplatsArray[j].Longitud),
        map: map,
        icon: destinationIcon
      });

      google.maps.event.addListener(marker, 'click', (function(marker, j) {
        return function() {
          console.log(badplatsArray[j]["Badplats"]);
          popupInfo.updateWeather(badplatsArray[j]["Latitud"]["Longitud"]);
          document.getElementById("popupInfo").style.display = "inherit";
          document.getElementById("badTitel").innerHTML = badplatsArray[j]["Badplats"];
        }
      })(marker, j));

    }            
  }
}

function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

google.maps.event.addDomListener(window, 'load', initialize);
}
