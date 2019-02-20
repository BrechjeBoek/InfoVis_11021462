// var svgWidth = 500;
// var svgHeight = 300;
// var svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight)
//     .attr("class", "bar-chart");
//
// var one = []

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("meteo.csv", function(error, data) {
if (error) throw error;

// format the data
data.forEach(function(d) {
  d[0].year = +d[0].year;
  console.log(d[['year']])
});

// Scale the range of the data in the domains
x.domain(data.map(function(d) { if (d[0].year == 2011) return d[0].year; }));
y.domain([0, d3.max(data, function(d) {if (d[0].year == 2011) return d[0].temperature; })]);

// append the rectangles for the bar chart
svg.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {if (d[0].year == 2011) return x(d.year); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d[0].temperature); })
    .attr("height", function(d) {if (d[0].year == 2011) return height - y(d.temperature); });

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));

});


    // if (d[i].year == 2011) {
    //   one += d[i].temperature;
    //
    //   }
    // else {
    //   console.log('nope')
    // }



    // var temp = data[0].temperature

    // var barPadding = 5
    // var barWidth = (svgWidth / data.length)
    // var barChart = svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("y", function(d) {
    //         return svgHeight - d
    //     })
    //     .attr("height", function(d) {
    //         return d;
    //     })
    //     .attr("width", barWidth - barPadding)
    //     .attr("transform", function (d, i) {
    //          var translate = [barWidth * i, 0];
    //          return "translate("+ translate +")";})
