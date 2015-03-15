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
//d3.csv("data/LongLat_test.csv",function (csv) {
d3.csv("data/nrkp.csv",function (csv) {
  //För att undvika att det blir > 25 anrop (vilket leder till alertbox med error)
  var prevname = "";
      //Add each badplats to badplats array
      csv.forEach(function(d){
        badplatsArray.push(d);

        if(prevname != d.Badplats)
          badplatsDest.push(new google.maps.LatLng(d.Lat, d.Long));
        
        prevname = d.Badplats;
      });
      //console.log("BADPLATSARRAY", badplatsArray)
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
      //console.log(results[i].distance.text);
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
        position: new google.maps.LatLng(badplatsArray[j].Lat, badplatsArray[j].Long),
        map: map,
        icon: destinationIcon
      });

      google.maps.event.addListener(marker, 'click', (function(marker, j) {
        return function() {
          popupInfo.updateWeather(badplatsArray[j]["Lat"]["Long"]);
          document.getElementById("popupInfo").style.display = "inherit";
          document.getElementById("badTitel").innerHTML = badplatsArray[j]["Badplats"];
          document.getElementById("water_temp").innerHTML = badplatsArray[j]["Vattentemp"] + "°";
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
