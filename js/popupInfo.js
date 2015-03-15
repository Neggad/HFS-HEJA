// Actions regarding le popup info

function popupInfo() {
	var temperatureData = [];

	this.updateWeather = function(lat, lon) {
		temperatureData = [];

		document.getElementById("temp_graph").innerHTML = "";
		var htmlString = "//opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/"+lat.toFixed(2)+"/lon/"+lon.toFixed(2)+"/data.json";

		d3.json(htmlString, function(data) {
			for(var i = 0; i < 24; i++) {
			//for(var i = 0; i < data.timeseries.length; i++) {
				// console.log("Date:" + data.timeseries[i]["validTime"].split("T")[0].split("-")[2]);
				//console.log("Time:" + data.timeseries[i]["validTime"].split("T")[1].replace("Z", ""));
				var temp = {
					temp : parseInt(data.timeseries[i]["t"]),
					time : i,
					date : parseInt(data.timeseries[i]["validTime"].split("T")[0].split("-")[2])
				};
				temperatureData.push(temp);
				if((i+1) == 24) {
				//if((i+1) == data.timeseries.length) {
					// Updatera din fina graf Emma, Kalla på den här lixx
					tempgraph();
				}
			}
		});
	};

	this.getTemperatureData = function() {
		return temperatureData;
	}
}