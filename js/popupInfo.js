// Actions regarding le popup info

function popupInfo() {
	var temperatureData = [];

	this.updateWeather = function(lat, lon) {
		temperatureData = [];

		document.getElementById("temp_graph").innerHTML = "";

		d3.json("//opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/"+lat+"/lon/"+lon+"/data.json", function(data) {
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