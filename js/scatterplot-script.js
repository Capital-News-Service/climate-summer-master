
/*
 * GLOBAL
 */


  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  /*
   * value accessor - returns the value to encode for a given data object.
   * scale - maps value to a visual display encoding, such as a pixel position.
   * map function - maps from data value to display value
   * axis - sets up axis
   */

  // setup x
  var xValue = function(d) { return d.temp;}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");


      // add the tooltip area to the webpage
      var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);




            function responsivefy(svg) {
                // get container + svg aspect ratio
                var container = d3.select(svg.node().parentNode),
                    width = parseInt(svg.style("width")),
                    height = parseInt(svg.style("height")),
                    aspect = width / height;

                // add viewBox and preserveAspectRatio properties,
                // and call resize so that svg resizes on inital page load
                svg.attr("viewBox", "0 0 " + width + " " + height)
                    .attr("perserveAspectRatio", "xMinYMid")
                    .call(resize);

                // to register multiple listeners for same event type,
                // you need to add namespace, i.e., 'click.foo'
                // necessary if you call invoke this function for multiple svgs
                // api docs: https://github.com/mbostock/d3/wiki/Selections#on
                d3.select(window).on("resize." + container.attr("id"), resize);

                // get width of container and resize svg to fit it
                function resize() {
                    var targetWidth = parseInt(container.style("width"));
                    svg.attr("width", targetWidth);
                    svg.attr("height", Math.round(targetWidth / aspect));
                }
            }


/*
 * END GLOBAL
 */







    /*
     * START UNEMPLOYMENT PLOT
     */


    // setup y
    var yValue = function(d) { return d.unemployment_rate;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

        // setup fill color
        var cValue = function(d) { return d.designation;},
            color = d3.scale.category10()
            	.range(['#ffc966']);


    // add the graph canvas to the body of the webpage
    var svg = d3.select("#unemployment_rate-scatterplot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
         .call(responsivefy)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // load data
    d3.csv("js/demographics.csv", function(error, data) {

      // change string (from CSV) into number format
      data.forEach(function(d) {
        d.temp = +d.temp;
        d.unemployment_rate = +d.unemployment_rate;
    //    console.log(d);
      });

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

      // x-axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Average temperature*");

      // y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("unemployment_rate rate");

      // draw dots
      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));})
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html("<div class=\"d3-box\"><strong>" + d.csa2010 + "</strong><br/> Temp = " + xValue(d) +"&#176;"
    	        + "<br>Unemployment= " + yValue(d) + "</div>")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

      // draw legend
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // draw legend colored rectangles
      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      // draw legend text
      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})
    });

    /*
     * END UNEMPLOYMENT PLOT
     */



  /*
   * START LIFE EXP PLOT - ADD 1 TO ALL VARIABLES
   */


  // setup y
  var yValue1 = function(d) { return d.life_expectancy;}, // data -> value
      yScale1 = d3.scale.linear().range([height, 0]), // value -> display
      yMap1 = function(d) { return yScale1(yValue1(d));}, // data -> display
      yAxis1 = d3.svg.axis().scale(yScale1).orient("left");

      // setup fill color
      var cValue1 = function(d) { return d.designation;},
          color1 = d3.scale.category10()
          	.range(['#ff1f0d']);

  // add the graph canvas to the body of the webpage
  var svg1 = d3.select("#life_expectancy-scatterplot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
       .call(responsivefy)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  // load data
  d3.csv("js/demographics.csv", function(error, data) {

    // change string (from CSV) into number format
    data.forEach(function(d) {
      d.temp = +d.temp;
      d.life_expectancy = +d.life_expectancy;
  //    console.log(d);
    });

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
    yScale1.domain([d3.min(data, yValue1)-1, d3.max(data, yValue1)+1]);

    // x-axis
    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Average temperature*");

    // y-axis
    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis1)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("life_expectancy rate");

    // draw dots
    svg1.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap1)
        .style("fill", function(d) { return color1(cValue1(d));})
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html("<div class=\"d3-box\"><strong>" + d.csa2010 + "</strong><br/> Temp = " + xValue(d) +"&#176;"
  	        + "<br>Life expectancy= " + yValue1(d) + "</div>")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });

    // draw legend
    var legend1 = svg1.selectAll(".legend")
        .data(color1.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend1.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color1);

    // draw legend text
    legend1.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
  });

  /*
   * END LIFE EXP PLOT
   */



    /*
     * START CRIME PLOT - ADD 2 TO ALL VARIABLES
     */

     // setup y
     var yValue2 = function(d) { return d.crime;}, // data -> value
         yScale2 = d3.scale.linear().range([height, 0]), // value -> display
         yMap2 = function(d) { return yScale2(yValue2(d));}, // data -> display
         yAxis2 = d3.svg.axis().scale(yScale2).orient("left");

         // setup fill color
         var cValue2 = function(d) { return d.designation;},
             color2 = d3.scale.category10()
             	.range(['#e87d0c']);

     // add the graph canvas to the body of the webpage
     var svg2 = d3.select("#crime-scatterplot").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
          .call(responsivefy)
       .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


     // load data
     d3.csv("js/demographics.csv", function(error, data) {

       // change string (from CSV) into number format
       data.forEach(function(d) {
         d.temp = +d.temp;
         d.crime = +d.crime;
     //    console.log(d);
       });

       // don't want dots overlapping axis, so add in buffer to data domain
       xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
       yScale2.domain([d3.min(data, yValue2)-1, d3.max(data, yValue2)+1]);

       // x-axis
       svg2.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis)
         .append("text")
           .attr("class", "label")
           .attr("x", width)
           .attr("y", -6)
           .style("text-anchor", "end")
           .text("Average temperature*");

       // y-axis
       svg2.append("g")
           .attr("class", "y axis")
           .call(yAxis2)
         .append("text")
           .attr("class", "label")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("crime rate");

       // draw dots
       svg2.selectAll(".dot")
           .data(data)
         .enter().append("circle")
           .attr("class", "dot")
           .attr("r", 3.5)
           .attr("cx", xMap)
           .attr("cy", yMap2)
           .style("fill", function(d) { return color2(cValue2(d));})
           .on("mouseover", function(d) {
               tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
               tooltip.html("<div class=\"d3-box\"><strong>" + d.csa2010 + "</strong><br/> Temp = " + xValue(d) +"&#176;"
     	        + "<br>Crime= " + yValue2(d) + "</div>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
           })
           .on("mouseout", function(d) {
               tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
           });

       // draw legend
       var legend2 = svg2.selectAll(".legend")
           .data(color2.domain())
         .enter().append("g")
           .attr("class", "legend")
           .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

       // draw legend colored rectangles
       legend2.append("rect")
           .attr("x", width - 18)
           .attr("width", 18)
           .attr("height", 18)
           .style("fill", color2);

       // draw legend text
       legend2.append("text")
           .attr("x", width - 24)
           .attr("y", 9)
           .attr("dy", ".35em")
           .style("text-anchor", "end")
           .text(function(d) { return d;})
     });



    /*
     * END CRIME PLOT
     */



 /*
  * START POVERTY PLOT - ADD 3 TO ALL VARIABLES
  */

  // setup y
  var yValue3 = function(d) { return d.poverty;}, // data -> value
      yScale3 = d3.scale.linear().range([height, 0]), // value -> display
      yMap3 = function(d) { return yScale3(yValue3(d));}, // data -> display
      yAxis3 = d3.svg.axis().scale(yScale3).orient("left");

      // setup fill color
      var cValue3 = function(d) { return d.designation;},
          color3 = d3.scale.category10()
            .range(['#ff5f00']);

  // add the graph canvas to the body of the webpage
  var svg3 = d3.select("#poverty-scatterplot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(responsivefy)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  // load data
  d3.csv("js/demographics.csv", function(error, data) {

    // change string (from CSV) into number format
    data.forEach(function(d) {
      d.temp = +d.temp;
      d.poverty = +d.poverty;
  //    console.log(d);
    });

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
    yScale3.domain([d3.min(data, yValue3)-1, d3.max(data, yValue3)+1]);

    // x-axis
    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Average temperature*");

    // y-axis
    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis3)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("poverty rate");

    // draw dots
    svg3.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap3)
        .style("fill", function(d) { return color3(cValue3(d));})
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html("<div class=\"d3-box\"><strong>" + d.csa2010 + "</strong><br/> Temp = " + xValue(d) +"&#176;"
            + "<br>Poverty= " + yValue3(d) + "</div>")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });

    // draw legend
    var legend3 = svg3.selectAll(".legend")
        .data(color3.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend3.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color3);

    // draw legend text
    legend3.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
  });



 /*
  * END POVERTY PLOT
  */
