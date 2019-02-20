// This code is made by Brechje Boeklagen (11021462)
//sources used: Stackoverflow, bl.ocks.org. 


var eleven = [];
var twelve = [];
var thirteen = [];
var fourteen = [];
var fifteen = [];



function loaddata(callback){
// var data = d3.csv('meteo.csv', (function(d) {

  //load the data
  d3.csv("meteo.csv", function(error, csv_data) {
   var data = d3.nest()

    //search the year
    .key(function(y) {return y.year;})

    //search the month
    .key(function(y) {return y.month;})

    .rollup(function(d) {

     //take the mean of the temperature in the months and round the number
     return Math.round(d3.mean(d, function(g) {; return g.temperature; })*100)/100;
    }).entries(csv_data);

    //push the data to the predefined variable to transfer it to the next function
    eleven.push(data[0]);
    twelve.push(data[1]);
    thirteen.push(data[2]);
    fourteen.push(data[3]);
    fifteen.push(data[4]);

    //for synchronicity
    callback();
  });
};


// the drawing of the barplot
function barplot(){

  //set the height and width of the plot
  var svgWidth = 500;
  var svgHeight = 300;
  var barPadding = 20;

    //nested function of building the graph
    function showGraph(data) {

      //add bars in the plot
      var svg = d3.select('svg')

          //set the svg where the graph will be plotted in
          .attr("width", svgWidth + barPadding*3)
          .attr("height", svgHeight + barPadding)
          .attr("class", "bar-chart");

      //remove all things in the svg before building the 'new' barplot (because of updating of data according to label and arrows)
      svg.selectAll("*").remove();

      //prepare csv_data
      var months = d3.keys(d3.values(data[0])[1]);

      //in the range of the months, run the function (explained below)
      var temp = d3.range(months.length).map(function(d) {

      //extraction of the deeply nested average temperatures
        return d3.values(d3.values(data[0])[1][d])[1];
      });

      var barWidth = (svgWidth / months.length)

      // set the months
      var dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


      // set the scales and the axis
      var yScale = d3.scaleLinear()
        .range([svgHeight, 0]);
      var xScale = d3.scaleBand().rangeRound([0, svgWidth]).padding(.1).round(true);
      var xAxis = d3.axisBottom(xScale);
      var x_coordinates = [];
      var yAxis = d3.axisLeft(yScale);

      xScale.domain(dates.map(function(d) {  return d; }));
      yScale.domain([0, d3.max(temp, function(d) { return d;})]);

      //draw the axis with groups
      var xaxis = svg.append("g")

          .attr("class", "x axis")
          .attr("transform", "translate(" + barPadding*1.2 +" ," + svgHeight + ")")
          .call(xAxis);

      var yaxis = svg
      .append("g")
          .attr("class", "y axis")
          .attr("transform", "translate("+[barPadding*1.2]+")")
          .call(yAxis);


      //This makes the bars
      var barChart = svg.selectAll("rect")
      .data(temp)
      .enter()
      .append("rect")
      .attr('class', 'rectangles')

      //set the location of the bars
      .attr("y", function (d) {
        return svgHeight - d
      })

      //set the length of bars
      .attr("height", function (d) {
        return d;
      })

      //set the width of bars
      .attr("width", barWidth - (barPadding/2))

      //place the bars on the x-axis
      .attr("transform", function (d, i) {
        var translate = [barPadding*1.45 + barWidth * i, 0];
        return "translate(" + translate + ")";

      })

      //this makes the x-labels
      barChart.selectAll("svg")
             .data(dates)
             .enter()
             .append("text")
               .attr("class", ".text")
               .text(function(d){return d;})
               .attr("text-anchor", "middle")
               .attr("x", function(d){return xScale(d) + xScale.bandwidth();})

      //this makes the y labels
      barChart.selectAll('svg')
               .data(temp)
               .enter()
               .append('text')
               .attr('class', '.y-text')
               .text(function(d){ return d; })
               .attr('y', function(d){return yScale(d);})


      //this makes the captions above the bars
      svg.selectAll('.bartext')
                .data(temp)
                .enter()
                .append('text')
                .attr('class', 'bartext')

                .attr("y", function (d) {
                  return svgHeight - d - 5
                })
                  .attr("x", function (d, i) {
                    var translate = [barPadding*1.6 + barWidth * i];
                    return translate;})
                    .text(function(d){return d; });


    };



    //this makes sure that the correct year is loaded when the button to the right is clicked
    d3.select(".right")
          .on("click", function() {
            var year = d3.select('#year').text();
            year = parseInt(year) + 1;

            //if the year exceeds the amount of years available, set the year to the maximum (2015)
            if (year >= 2016){
              year = 2015;
              }

          // if not, check which year is selected in the label/navigated to and show the corresponding graph.
           d3.selectAll('#year').text(year);

           if (year == 2011){
             // the data is set at the top of this file
             showGraph(eleven);
           }
           if (year == 2012){
             showGraph(twelve);
           }
           if (year == 2013){
             showGraph(thirteen);
           }
           if (year == 2014){
             showGraph(fourteen);;
           }
           if (year == 2015){
             showGraph(fifteen);
           };

          });

        //the same yields for the left arrow
        d3.select(".left")
              .on("click", function() {
                var year = d3.select('#year').text();
                year = parseInt(year) - 1;

                //if the year is smaller than allowed (2011), set it to the minimum of 2011
                if (year <= 2010){
                  year = 2011;
                  }
               d3.selectAll('#year').text(year);

               // if not, show the label with the accompanied plot.
               if (year == 2011){
                 showGraph(eleven);
               }
               if (year == 2012){
                 showGraph(twelve);
               }
               if (year == 2013){
                 showGraph(thirteen);
               }
               if (year == 2014){
                 showGraph(fourteen);;
               }
               if (year == 2015){
                 showGraph(fifteen);
               };

              });



  //  d3.select('.left')


showGraph(eleven);




};



loaddata(barplot);
