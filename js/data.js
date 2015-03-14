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

	// input: k = kommun
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

