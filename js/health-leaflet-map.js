
// START MAP 1: TEMPERATURE MAP

  //this function calls in Data source 1 and adds in Data source 2, matching by zipcode1
  baltimoreZipsData.features.map(res => Object.assign(res, {
  properties: {
      ...res.properties,
      ...data2[res.properties.ZIPCODE1]
  }
  }))


  var tempMap = L.map('mapid1').setView([39.3, -76.62], 11);

  //call mapbox map with my access token
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      //use mapbox.satellite, mapbox.streets, mapbox.light, others
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiYW1hcnRvbiIsImEiOiJjajgzdDFrdTcwMXIwMzJubmthd25jY3V2In0.01j1w1cZs1S7b7a4tiMvfg'
  }).addTo(tempMap);

  //this adds the basic goemetry to the map
  //L.geoJson(baltimoreZipsData).addTo(tempMap);

  //select the color ramp
  function getColorTemp(d) {
      return d > 92 ? '#800026' :
             d > 91  ? '#BD0026' :
             d > 90  ? '#E31A1C' :
             d > 89  ? '#FC4E2A' :
             d > 88   ? '#FD8D3C' :
             d > 87   ? '#FEB24C' :
             d > 86   ? '#FED976' :
                        '#FFEDA0';
  }

  //select the initial feature from the geojson to add colors to
  function styleTemp(feature) {

      return {
          fillColor: getColorTemp(feature.properties.temp),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }


  // Create a function for the initial map popups
  function onEachFeatureTemp(feature, layer) {

      // Create custom popups for two zip codes with no data
    if (feature.properties.ZIPCODE1 == 21251){
        layer.bindPopup("<p style = \"text-align:center;\"> " + "Zip Code: " + feature.properties.ZIPCODE1 + "<br>  Morgan State University <br> No data</p>");
    }else if (feature.properties.ZIPCODE1 == 21287){
        layer.bindPopup("<p style = \"text-align:center;\"> " + " Zip Code: " + feature.properties.ZIPCODE1 + "<br>  Johns Hopkins University <br> No data</p>");
    } else
          // Create default pop up. Some math functions here turn the decimals into percents and show up to one decimal in the number
          layer.bindPopup("<p style = \"text-align:center;\">" + "Zip code: " + feature.properties.ZIPCODE1 + "<br> Median temp: "  + parseFloat((feature.properties.temp)).toFixed(1) + "&#8457;</p>");
  }


  //Add the color ramps and popup to the selected initial feature
  var geojsonLayerTemp = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeatureTemp, style: styleTemp});

  geojsonLayerTemp.addTo(tempMap);



//Create the legend

  var legendTemp = L.control({position: 'bottomright'});

  legendTemp.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [86, 87, 88, 89, 90, 91, 92],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColorTemp(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legendTemp.addTo(tempMap);


// END MAP 1: TEMPERATURE MAP





// START MAP 2: HEALTH MAP



var healthMap = L.map('mapid2').setView([39.3, -76.62], 11);

//call mapbox map with my access token
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //use mapbox.satellite, mapbox.streets, mapbox.light, others
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiYW1hcnRvbiIsImEiOiJjajgzdDFrdTcwMXIwMzJubmthd25jY3V2In0.01j1w1cZs1S7b7a4tiMvfg'
}).addTo(healthMap);

//this adds the basic goemetry to the map
//L.geoJson(baltimoreZipsData).addTo(healthMap);

//select the color ramp for asthma
function getColor(d) {
    return d > 16 ? '#800026' :
           d > 14  ? '#BD0026' :
           d > 12  ? '#E31A1C' :
           d > 10  ? '#FC4E2A' :
           d > 8   ? '#FD8D3C' :
           d > 6   ? '#FEB24C' :
           d > 4   ? '#FED976' :
                      '#FFEDA0';
}


//select the color ramp for copd
function getColorCodp(d) {
  return d > 32 ? '#800026' :
         d > 29  ? '#BD0026' :
         d > 26  ? '#E31A1C' :
         d > 23  ? '#FC4E2A' :
         d > 20   ? '#FD8D3C' :
         d > 17   ? '#FEB24C' :
         d > 14   ? '#FED976' :
                    '#FFEDA0';
}



//select the color ramp
function getColorHeart(d) {
  return d > 62 ? '#800026' :
         d > 60  ? '#BD0026' :
         d > 58  ? '#E31A1C' :
         d > 56  ? '#FC4E2A' :
         d > 54   ? '#FD8D3C' :
         d > 52   ? '#FEB24C' :
         d > 50   ? '#FED976' :
                    '#FFEDA0';
}



//select the color ramp
function getColorKidney(d) {
  return d > 28 ? '#800026' :
         d > 26  ? '#BD0026' :
         d > 24  ? '#E31A1C' :
         d > 22  ? '#FC4E2A' :
         d > 20   ? '#FD8D3C' :
         d > 18   ? '#FEB24C' :
         d > 16   ? '#FED976' :
                    '#FFEDA0';
}


//select the color ramp
function getColorDiabetes(d) {
  return d > 32 ? '#800026' :
         d > 30  ? '#BD0026' :
         d > 28  ? '#E31A1C' :
         d > 26  ? '#FC4E2A' :
         d > 24   ? '#FD8D3C' :
         d > 22   ? '#FEB24C' :
         d > 20   ? '#FED976' :
                    '#FFEDA0';
}




//select the initial feature from the geojson to add colors to
function style(feature) {

  var property = parseFloat((feature.properties.Asthma) * 100).toFixed(1);

    return {
        fillColor: getColor(property),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


// Create a function for the initial map popups
function onEachFeature(feature, layer) {

    // Create custom popups for two zip codes with no data
  if (feature.properties.ZIPCODE1 == 21251){
      layer.bindPopup("<p style = \"text-align:center;\"> " + feature.properties.ZIPNAME + " <br>" + feature.properties.ZIPCODE1 + "<br>  Morgan State University <br> No data</p>");
  }else if (feature.properties.ZIPCODE1 == 21287){
      layer.bindPopup("<p style = \"text-align:center;\"> " + feature.properties.ZIPNAME + " <br>" + feature.properties.ZIPCODE1 + "<br>  Johns Hopkins University <br> No data</p>");
  } else
        // Create default pop up. Some math functions here turn the decimals into percents and show up to one decimal in the number
        layer.bindPopup("<p style = \"text-align:center;\">" + "Zip code: " + feature.properties.ZIPCODE1 + " <br> Asthma prevalence: " + parseFloat((feature.properties.Asthma) * 100).toFixed(1) + "% <br> Median temp: "  + parseFloat((feature.properties.temp)).toFixed(1) + "&#8457;</p>");
}


//Add the color ramps and popup to the selected initial feature
var geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature, style: style});

geojsonLayer.addTo(healthMap);




//Create the legends

  //Create the asthma legend
  var asthmaLegend = L.control({position: 'bottomright'});

  asthmaLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [4, 6, 8, 10, 12, 14, 16],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  //Create the copd legend
  var copdLegend = L.control({position: 'bottomright'});

  copdLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [14, 17, 20, 23, 26, 29, 32],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColorCodp(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };


  //Create the heart disease legend
  var heartLegend = L.control({position: 'bottomright'});

  heartLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [50, 52, 54, 56, 58, 60, 62],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColorHeart(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };


  //Create the kidney legend
  var kidneyLegend = L.control({position: 'bottomright'});

  kidneyLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [16, 18, 20, 22, 24, 26, 28],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColorKidney(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };


  //Create the diabetes legend
  var diabetesLegend = L.control({position: 'bottomright'});

  diabetesLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 22, 24, 26, 28, 30, 32],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColorDiabetes(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };


  //Add the default asthma legend to the map
  asthmaLegend.addTo(healthMap);

  //Create a variable for the current legend and set to asthma
  var currentLegend = asthmaLegend;

//DROPDOWNS *******************************

//Add the dropdowns to the map
var dropdown = L.control({position: 'topright'});
dropdown.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<select id="select1"><option>Asthma</option><option>COPD</option><option>Heart disease</option><option>Diabetes</option><option>Kidney disease</option></select>';
div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};
dropdown.addTo(healthMap);



//When the dropdown is changed, execute this function
$('#select1').change(function(){


//Create a variable called property and assign what feature property from the GeoJson to show based on the dropdown
var property;

//For each dropdown option, set the property to display from the GeoJson
if (this.value == "Asthma") {
    property = "Asthma";

}

else if (this.value == "COPD") {
    property = "COPD";

}

else if (this.value == "Heart disease") {
    property = "Heart disease";

}

else if (this.value == "Kidney disease") {
    property = "Kidney disease";

}

else if (this.value == "Diabetes") {
    property = "Diabetes";

}



//select the feature from the geojson to add colors to based on the dropdown, using the property variable
function styleAsthma(feature) {

  //This takes the property variable from above and does some math to turn decimal into percent and show the number to one decimal point
  property2 = parseFloat(feature['properties'][property] * 100).toFixed(1);

    return {
        fillColor: getColor(property2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };


}


//select the feature from the geojson to add colors to based on the dropdown, using the property variable
function styleCopd(feature) {

  //This takes the property variable from above and does some math to turn decimal into percent and show the number to one decimal point
  property2 = parseFloat(feature['properties'][property] * 100).toFixed(1);

    return {
        fillColor: getColorCodp(property2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };


}


//select the feature from the geojson to add colors to based on the dropdown, using the property variable
function styleHeart(feature) {

  //This takes the property variable from above and does some math to turn decimal into percent and show the number to one decimal point
  property2 = parseFloat(feature['properties'][property] * 100).toFixed(1);

    return {
        fillColor: getColorHeart(property2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };


}


//select the feature from the geojson to add colors to based on the dropdown, using the property variable
function styleKidney(feature) {

  //This takes the property variable from above and does some math to turn decimal into percent and show the number to one decimal point
  property2 = parseFloat(feature['properties'][property] * 100).toFixed(1);

    return {
        fillColor: getColorKidney(property2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };


}


//select the feature from the geojson to add colors to based on the dropdown, using the property variable
function styleDiabetes(feature) {

  //This takes the property variable from above and does some math to turn decimal into percent and show the number to one decimal point
  property2 = parseFloat(feature['properties'][property] * 100).toFixed(1);

    return {
        fillColor: getColorDiabetes(property2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };


}


// Create a function for the map popups based on the dropdown selection / property variable
function onEachFeature2(feature, layer) {

  // Create custom popups for two zip codes with no data
  if (feature.properties.ZIPCODE1 == 21251){
      layer.bindPopup("<p style = \"text-align:center;\"> " + feature.properties.ZIPNAME + " <br>" + feature.properties.ZIPCODE1 + "<br>  Morgan State University <br> No data</p>");
  }else if (feature.properties.ZIPCODE1 == 21287){
      layer.bindPopup("<p style = \"text-align:center;\"> " + feature.properties.ZIPNAME + " <br>" + feature.properties.ZIPCODE1 + "<br>  Johns Hopkins University <br> No data</p>");
  } else
    // this is the default popup
        layer.bindPopup("<p style = \"text-align:center;\">" + "Zip code: " + feature.properties.ZIPCODE1 + " <br>" + property + " prevalence: " + parseFloat((feature['properties'][property]) * 100).toFixed(1) + "% <br> Median temp: "  + parseFloat((feature.properties.temp)).toFixed(1) + "&#8457;</p>");
}


// Depending on dropdown choice
  // Remove the old GeoJson layer
  // Add the new GeoJson layer to the map
  //Remove the current legend from the map
  // Reassign the current legend variable
  //Add the new legend to the map based on the dropdown choice

if (this.value == "Asthma") {

healthMap.removeLayer(geojsonLayer);
geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature2, style: styleAsthma});
geojsonLayer.addTo(healthMap);

healthMap.removeControl(currentLegend);
currentLegend = asthmaLegend;
asthmaLegend.addTo(healthMap);

}

else if (this.value == "COPD") {

healthMap.removeLayer(geojsonLayer);
geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature2, style: styleCopd});
geojsonLayer.addTo(healthMap);

healthMap.removeControl(currentLegend);
currentLegend = copdLegend;
copdLegend.addTo(healthMap);

}

else if (this.value == "Heart disease") {
  healthMap.removeLayer(geojsonLayer);
  geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature2, style: styleHeart});
  geojsonLayer.addTo(healthMap);

  healthMap.removeControl(currentLegend);
  currentLegend = heartLegend;
  heartLegend.addTo(healthMap);
}


else if (this.value == "Kidney disease") {
  healthMap.removeLayer(geojsonLayer);
  geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature2, style: styleKidney});
  geojsonLayer.addTo(healthMap);

  healthMap.removeControl(currentLegend);
  currentLegend = kidneyLegend;
  kidneyLegend.addTo(healthMap);
}


else if (this.value == "Diabetes") {
  healthMap.removeLayer(geojsonLayer);
  geojsonLayer = new L.geoJson(baltimoreZipsData, {onEachFeature: onEachFeature2, style: styleDiabetes});
  geojsonLayer.addTo(healthMap);

  healthMap.removeControl(currentLegend);
  currentLegend = diabetesLegend;
  diabetesLegend.addTo(healthMap);
}

});



// END MAP 2: HEALTH MAP
