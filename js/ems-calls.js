
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
     {group: "Cardiac arrest", value:5.303867403314917},
     //{group: "CHF", value:13.608 },
     {group: "COPD", value: 5.614035087719298},
     {group: "Dehydration", value: 41.73913043478261},
     {group: "Dizziness", value: 6.233766233766234},
     //{group: "Heat exhaustion", value: 104.3333333333},
     {group: "Hypertension", value: 15.238095238095237},
     {group: "Respiratory distress", value: 3.3449477351916377 },
     {group: "Stroke/CVA", value:12.151898734177216},
     {group: "Unconscious", value:8.97196261682243 }
  ];

  var data2 = [
    {group: "Cardiac arrest", value: 	5.154362416107382},
    //{group: "CHF", value:17.088 },
    {group: "COPD", value: 	4.923076923076923},
    {group: "Dehydration", value: 17.86046511627907},
    {group: "Dizziness", value: 3.8984771573604062},
    //{group: "Heat exhaustion", value: 34.9545454545455},
    {group: "Hypertension", value: 11.636363636363637},
    //{group: "Hyperthermia", value: 192.25},
    {group: "Respiratory distress", value: 3.3684210526315788},
    {group: "Stroke/CVA", value: 	9.035294117647059},
    {group: "Unconscious", value:5.408450704225352}
  ];

  var data3 = [
    {group: "Cardiac arrest", value: 4.712765957446808},
    //{group: "CHF", value:15.821 },
    {group: "COPD", value: 	5.091954022988506},
    {group: "Dehydration", value: 7.145161290322581},
    {group: "Dizziness", value: 	3.6611570247933884},
    //{group: "Heat exhaustion", value: 6.32857142857143},
    {group: "Hypertension", value: 8.358490566037736},
    //{group: "Hyperthermia", value: 147.666666666667},
    {group: "Respiratory distress", value: 	2.5170454545454546},
    {group: "Stroke/CVA", value: 6.152777777777778},
    {group: "Unconscious", value:6.068493150684931}
  ];

  var data4 = [
    {group: "Cardiac arrest", value: 2.9444444444444446},
    //{group: "CHF", value:17.666 },
    {group: "COPD", value: 3.3125},
    {group: "Dehydration", value: 2.2083333333333335},
    {group: "Dizziness", value: 2.9444444444444446},
    //{group: "Heat exhaustion", value: 2.65},
    {group: "Hypertension", value: 5.888888888888889},
    //{group: "Hyperthermia", value: 26.5},
    {group: "Respiratory distress", value: 	2.789473684210526},
    {group: "Stroke/CVA", value: 7.571428571428571},
    {group: "Unconscious", value:4.076923076923077}
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
