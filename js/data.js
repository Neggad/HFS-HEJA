data = new data();

function data() {

	//var file = "data/testdata.csv"; //data/baddata.csv";
	var jsonFile = "data/jaharra.json";
	var data;

	d3.csv(file, function(data) {
		this.data = data;

		createBathIDs(this.data);

		console.log(this.data);
	});

	function createBathIDs(data) {

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
	// input: array[]
	this.getAllBaths = function(k) {
		var output = [];

		for(i in data) {

			if(data[i]["Kommun"] == k) {

				output.push(data[i]["Badplats"]);
			}
		}

		console.log("getAllBaths", output);
	}
}

