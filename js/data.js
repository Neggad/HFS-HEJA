function data() {
	//console.log("IN FUNCTION data()");

	//var file = "data/testdata.csv";
	var file = "data/baddata.csv";
	var data;

	d3.csv(file, function(d) {
		data = d;

		createBathIDs();

	});

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
		console.log("IN FUNCTION getAllBaths");
		console.log("Data in getTempsOfBath: ", data);
		console.log("bp: ", bp);

		var output = [];
		for(i in data) {

			console.log("data[i][Badplats]", data[i]["Badplats"]);

			if(data[i]["Badplats"] == bp) {
				console.log("IN IF");

				output.push([data[i]["Provtid"], data[i]["Vattentemp"]]);
			}
		}
		console.log("output: ", output);
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
}

