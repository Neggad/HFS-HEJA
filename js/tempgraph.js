function tempgraph(){
	var divId = $("#temp_graph");
  // Set the dimensions of the canvas / graph
  var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = divId.width() - margin.left - margin.right,
      height = divId.height() - margin.top - margin.bottom;

  // Parse the date / time
  var parseDate = d3.time.format("%Y-%m-%d").parse;

  // Set the ranges
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(2);

  var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(4);

  // Define the line
  var valueline = d3.svg.line()
      .x(function(d) { return x(d.Datum); })
      .y(function(d) { return y(d.Temp); });
      
  // Adds the svg canvas
  var svg = d3.select("#temp_graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var swimplace = [];
  var check = data.getTempsOfBath("Lillsjöbadet");
  console.log("hej", check)
  // Get the data
  d3.csv("data/baddata.csv", function(error, data) {
      data.forEach(function(d) {
          if(d.Badplats == "Lillsjöbadet"){            
              d.Vattentemp = parseFloat(d.Vattentemp.slice(2));
              d.Provtid = parseDate(d.Provtid);
              swimplace.push({Datum: d.Provtid, Temp: d.Vattentemp});
          }
      });

      // Scale the range of the data
      draw(swimplace);
  });

  function draw(swimdata) {
      console.log("jo", swimdata);
      x.domain(d3.extent(swimdata, function(d) { return d.Datum; }));
      y.domain([10, d3.max(swimdata, function(d) { return (d.Temp+2); })]);

      // Add the valueline path.
      svg.append("path")
          .attr("class", "line")
          .attr("d", valueline(swimdata));
          //.attr("d", valueline(swimdata));

      // Add the X Axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // Add the Y Axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
  }

}