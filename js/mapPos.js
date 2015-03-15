var map;
var marker;
var markersArray = [];
var badplatsArray = [];
var badplatsDest = [];

var origin1 = 'Norrkoping';

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

//load longlat data
d3.csv("data/LongLat_test.csv",function (csv) {
      //Add each badplats to badplats array
      csv.forEach(function(d){
          badplatsDest.push(new google.maps.LatLng(d.Latitud, d.Longitud));
          badplatsArray.push(d);
      });
  });

/*badplatsArray = data.getLatLongName("Norrköping");

badplatsArray.forEach(function(bp){
  badplatsDest.push(new google.maps.LatLng(bp.Latitud, bp.Longitud));
});*/
 
function initialize() {
  var opts = {
    center: new google.maps.LatLng(58.58774, 16.19242),
    zoom: 10
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
    /*var outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML = '';*/
    deleteOverlays();

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //avstånd till alla mål från origo
      console.log(results[i].distance.text);
    }

    //Origin marker
    marker = new google.maps.Marker({
            position: new google.maps.LatLng(58.58774, 16.19242),
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
