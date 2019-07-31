
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


  // create 2 data_set
  var data1 = [
     {group: "Asthma", value: 3.29473684210526},
     {group: "Cardiac arrest", value:4.6256157635468 },
     //{group: "CHF", value:13.608 },
     {group: "COPD", value: 4.695},
     {group: "Dehydration", value: 30.2903225806452},
     {group: "Dizziness", value: 4.53623188405797},
     //{group: "Heat exhaustion", value: 104.3333333333},
     {group: "Hypertension", value: 10.2065217391304},
     {group: "Respiratory distress", value: 3 },
     {group: "Stroke/CVA", value:8.694444444444 },
     {group: "Unconscious", value:7.0601 }
  ];

  var data2 = [
    {group: "Asthma", value: 4.09042553191489 },
    {group: "Cardiac arrest", value: 5.96124031007752},
    //{group: "CHF", value:17.088 },
    {group: "COPD", value: 6.86607142857143},
    {group: "Dehydration", value: 15.38},
    {group: "Dizziness", value: 4.74691358024691},
    //{group: "Heat exhaustion", value: 34.9545454545455},
    {group: "Hypertension", value: 13.4912280701754},
    //{group: "Hyperthermia", value: 192.25},
    {group: "Respiratory distress", value: 3.38766519823789},
    {group: "Stroke/CVA", value: 10.6805555555556},
    {group: "Unconscious", value:6.2016 }
  ];

  var data3 = [
    {group: "Asthma", value: 3.99099099099099},
    {group: "Cardiac arrest", value: 5.27380952380952},
    //{group: "CHF", value:15.821 },
    {group: "COPD", value: 4.43},
    {group: "Dehydration", value: 7.91071428571429},
    {group: "Dizziness", value: 4.25961538461539},
    //{group: "Heat exhaustion", value: 6.32857142857143},
    {group: "Hypertension", value: 12.6571428571429},
    //{group: "Hyperthermia", value: 147.666666666667},
    {group: "Respiratory distress", value: 2.71779141104294},
    {group: "Stroke/CVA", value: 7.91071428571429},
    {group: "Unconscious", value:5.9066 }
  ];

  var data4 = [
    {group: "Asthma", value: 2.40909090909091},
    {group: "Cardiac arrest", value: 3.53333333333333},
    //{group: "CHF", value:17.666 },
    {group: "COPD", value: 3.3125 },
    {group: "Dehydration", value: 3.11764705882353},
    {group: "Dizziness", value: 3.78571428571429},
    //{group: "Heat exhaustion", value: 2.65},
    {group: "Hypertension", value: 5.3},
    //{group: "Hyperthermia", value: 26.5},
    {group: "Respiratory distress", value: 3.53333333333333 },
    {group: "Stroke/CVA", value: 7.57142857142857},
    {group: "Unconscious", value:8.833 }
  ];

  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 760 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
       .call(responsivefy)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Initialize the X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

  // Initialize the Y axis
  var y = d3.scaleLinear()
    .range([ height, 0]);
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")

  // A function that create / update the plot for a given variable:
  function update(data) {

    // Update the X axis
    x.domain(data.map(function(d) { return d.group; }))
    xAxis.call(d3.axisBottom(x))

    // Update the Y axis
    y.domain([0, d3.max(data, function(d) { return d.value }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("rect")
      .data(data)

    u
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(u) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
        .attr("x", function(d) { return x(d.group); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#Fc4b2c")

    // If less group in the new dataset, I delete the ones not in use anymore
    u
      .exit()
      .remove()
  }

  // Initialize the plot with the first dataset
  update(data1)
  ;
