// Actions regarding le popup info

function popupInfo() {
	var temperatureData = [];

	this.updateWeather = function(lat, lon) {
		d3.json("//opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/"+lat+"/lon/"+lon+"/data.json", function(data) {
			for(var i = 0; i < data.timeseries.length; i++) {
				// console.log("Date:" + data.timeseries[i]["validTime"].split("T")[0].split("-")[2]);
				// console.log("Time:" + data.timeseries[i]["validTime"].split("T")[1].replace("Z", "").split(":")[0]);
				var temp = {
					temp : data.timeseries[i]["t"],
					time : data.timeseries[i]["validTime"].split("T")[1].replace("Z", "").split(":")[0],
					date : data.timeseries[i]["validTime"].split("T")[0]
				};
				tempData.push(temp);
				if((i+1) == data.timeseries.length) {
					// Updatera din fina graf Emma, Kalla på den här lixx
				}
			}
		});
	};

	this.getTemperatureData = function() {
		return temperatureData;
	}
}