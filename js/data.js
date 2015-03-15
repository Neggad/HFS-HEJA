function data() {
	//console.log("IN FUNCTION data()");

	//var file = "data/testdata.csv";
	var file = "data/baddata.csv";
	var data;

	d3.csv(file, function(d) {
		data = d;

		createBathIDs();

	});

	this.getLatLong = function(city) {
		var lng, lat;
		var output = [];

		for(i in data) {

			if(data[i]["Kommun"] == city) {
				output.push({Latitud: data[i]["Lat"], Longitud: data[i]["Long"]});
			}
		}

	}

	this.getLatLongName = function(city) {
		var lng, lat;
		var output = [];

		for(i in data) {

			if(data[i]["Kommun"] == city) {
				output.push({Badplats: data[i]["Badplats"], Latitud: data[i]["Lat"], Longitud: data[i]["Long"]});
			}
		}

	}
	
	function createBathIDs() {
		//console.log("IN FUNCTION createBathIDs()");
		
		var bpID = 1;
		var bp = data[0]["Badplats"];
		
		for(i in data) {

			if(data[i]["Badplats"] == bp) {

				data[i]["BadplatsID"] = bpID;
			}
			else {

				bpID++;
				data[i]["BadplatsID"] = bpID;

				bp = data[i]["Badplats"];
			}
		}
	}

	// input: bp = Badplats;
	// retrun: array with [date, temp];
	this.getTempsOfBath = function(bp) {
		//console.log("IN FUNCTION getAllBaths");
console.log("yo", data)
		var output = [];
		for(i in data) {

			if(data[i]["Badplats"] == bp) {

				output.push([data[i]["Provtid"], data[i]["Vattentemp"]]);
			}
		}

		return output;
	}

	// input: k = Kommun
	// return: array with names of all baths 
	this.getAllBaths = function(k) {
		//console.log("IN FUNCTION getAllBaths");

		var output = [];
		var bpID = 0;
		for(i in data) {

			if(data[i]["Kommun"] == k) {

				if(bpID != data[i]["BadplatsID"]) {

					output.push(data[i]["Badplats"]);
					bpID = data[i]["BadplatsID"];
				}
			}
		}

		return output;
	}

	//return: {key = Badplats, value = [Lat, Long]}
	this.getAllNames = function() {
		//console.log("IN FUNCTION getAllNames");

		names = {};
		for(i in data) {

			names[data[i]["Badplats"]] = [data[i]["Lat"], data[i]["Long"]];
		}

		return names;
	}
}

