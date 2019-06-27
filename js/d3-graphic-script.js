var width = document.getElementById('vis')
    .clientWidth;
var height = document.getElementById('vis')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}

var svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

var x_scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3.scaleLinear()
    .range([height, 0]);

var colour_scale = d3.scaleQuantile()
    .range(["#94B8E0", "#6661AD","#E4A35E","#97DDF7","#91EDED","#5397E6","#234061","#E0C594","#E6B3AE"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');

function draw(temp) {

    var csv_data = data[temp];

    var t = d3.transition()
        .duration(2000);

    var conditions = csv_data.map(function(d) {
        return d.condition;
    });
    x_scale.domain(conditions);

    var max_value = d3.max(csv_data, function(d) {
        return +d.value;
    });

    y_scale.domain([0, max_value]);
    colour_scale.domain([0, max_value]);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x_scale(d.condition);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale(+d.value);
        })
        .attr('height', function(d) {
            return height - y_scale(+d.value)
        })
        .attr('fill', function(d) {
            return colour_scale(+d.value);
        })

    svg.select('.x.axis')
        .call(x_axis);

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}

d3.queue()
    .defer(d3.csv, 'js/temp_data_0.csv')
    .defer(d3.csv, 'js/temp_data_10.csv')
    .defer(d3.csv, 'js/temp_data_20.csv')
    .defer(d3.csv, 'js/temp_data_30.csv')
    .defer(d3.csv, 'js/temp_data_40.csv')
    .defer(d3.csv, 'js/temp_data_50.csv')
    .defer(d3.csv, 'js/temp_data_60.csv')
    .defer(d3.csv, 'js/temp_data_70.csv')
    .defer(d3.csv, 'js/temp_data_80.csv')
    .defer(d3.csv, 'js/temp_data_90.csv')
    .defer(d3.csv, 'js/temp_data_100.csv')
    .await(function(error, d0, d10, d20, d30, d40, d50, d60, d70, d80, d90, d100) {
        data['0'] = d0;
        data['10'] = d10;
        data['20'] = d20;
        data['30'] = d30;
        data['40'] = d40;
        data['50'] = d50;
        data['60'] = d60;
        data['70'] = d70;
        data['80'] = d80;
        data['90'] = d90;
        data['100'] = d100;
        draw('80');
    });

var slider = d3.select('#temp');
slider.on('change', function() {
    draw(this.value);
});
