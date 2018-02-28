//Check whether inline svg is supported
if(Modernizr.inlinesvg) {

pymChild = new pym.Child();

function initialise() {

	dvc = {};
	numberFormat = d3.format(",.0f");
	msoa = null;
	laCode = null;
	MSOA = null;
	LAname = null;
	checkTheSame = null;

	//╭━━╮╱╱╱╱╱╱╱╱╭╮
	//╰┫┣╯╱╱╱╱╱╱╱╭╯╰╮
	//╱┃┃╭━╮╭━━┳╮┣╮╭╋━━╮
	//╱┃┃┃╭╮┫╭╮┃┃┃┃┃┃━━┫
	//╭┫┣┫┃┃┃╰╯┃╰╯┃╰╋━━┃
	//╰━━┻╯╰┫╭━┻━━┻━┻━━╯
	//╱╱╱╱╱╱┃┃
	//╱╱╱╱╱╱╰╯

	$("#pcError").hide();
	$("#successMessage").hide();
	$("#pcGo").click(function( event ) {
		//console.log("helloyou");
			//	event.preventDefault();
			//	event.stopPropagation();
				myValue = $("#pcText").val();
				myValue = myValue.toUpperCase();

				//manual method for area lookup
				myValue2 = myValue.replace(/\s+/g, '');

				getCodes1(myValue2);

	});

	$("#pcText").keypress(function( event ) {
		if (event.which == 13) {
				event.preventDefault();
				event.stopPropagation();
				myValue = $("#pcText").val();
				myValue = myValue.toUpperCase();

				//manual method for area lookup
				myValue2 = myValue.replace(/\s+/g, '');

				getCodes1(myValue2);
		}
	});



	//╭━━━╮╱╱╭╮╱╭━━━╮
	//┃╭━╮┃╱╭╯╰╮┃╭━╮┃
	//┃┃╱╰╋━┻╮╭╯┃┃╱┃┣━┳━━┳━━╮
	//┃┃╭━┫┃━┫┃╱┃╰━╯┃╭┫┃━┫╭╮┃
	//┃╰┻━┃┃━┫╰╮┃╭━╮┃┃┃┃━┫╭╮┃
	//╰━━━┻━━┻━╯╰╯╱╰┻╯╰━━┻╯╰╯

	//your location
	d3.select(".useLocation").on("click",function(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			//x.innerHTML = "Geolocation is not supported by this browser.";
		}
	});
}//end initialise

function showPosition(position) {
    latitudeValue = position.coords.latitude;
	longitudeValue = position.coords.longitude;
	getCodes2(latitudeValue,longitudeValue);
}


function getCodes1(myValue2)    {
    var myURIstring=encodeURI("https://api.postcodes.io/postcodes/"+myValue2);
    $.support.cors = true;
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "jsonp",
        url: myURIstring,
        error: function (xhr, ajaxOptions, thrownError) {
                $("#pcError").text("Sorry, that's not a valid postcode. Try an English or Welsh postcode eg PO15 5RR.").show();
            },
        success: function(data1){
            if(data1.status == 200 ){
                $("#pcError").hide();
                MSOA =data1.result.msoa.replace(/\s/g,'');
								laCode =data1.result.codes.admin_district;

								//fire the function returning statistics
								// drawStats();

								gotoArea(data1.result.latitude,data1.result.longitude);

            } else {
      					$("#successMessage").hide();
                $("#pcError").text("Sorry, that's not a valid postcode. Try an English or Welsh postcode eg PO15 5RR.").show();
            }
        }
    });
}


function getCodes2(lat,lng)    {
    var myURIstring=encodeURI("https://api.postcodes.io/postcodes?lon="+lng+"&lat="+lat);
    $.support.cors = true;
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "jsonp",
        url: myURIstring,
        error: function (xhr, ajaxOptions, thrownError) {
                $("#pcError").text("Sorry, that's not a valid postcode. Try an English or Welsh postcode eg PO15 5RR.").show();
            },
        success: function(data1){
            if(data1.status == 200 ){
                $("#pcError").hide();
                MSOA =data1.result[0].msoa.replace(/\s/g,'');

								//fire the function returning statistics
								// drawStats();

								gotoArea(data1.result[0].latitude,data1.result[0].longitude);
            } else {
					      $("#successMessage").hide();
                $("#pcError").text("Sorry, that's not a valid postcode. Try an English or Welsh postcode eg PO15 5RR.").show();
            }
        }
    });
}




// function areaName() {
// 	d3.select("#placeNameDisplay").style("display",null);
// 	d3.select("#placeNameName").text("Local Authority: "+LAname);
// }



//╭━━━╮╱╱╱╱╱╱╱╱╱╱╭━━━╮╭╮╱╱╱╭╮
//╰╮╭╮┃╱╱╱╱╱╱╱╱╱╱┃╭━╮┣╯╰╮╱╭╯╰╮
//╱┃┃┃┣━┳━━┳╮╭╮╭╮┃╰━━╋╮╭╋━┻╮╭╋━━╮
//╱┃┃┃┃╭┫╭╮┃╰╯╰╯┃╰━━╮┃┃┃┃╭╮┃┃┃━━┫
//╭╯╰╯┃┃┃╭╮┣╮╭╮╭╯┃╰━╯┃┃╰┫╭╮┃╰╋━━┃
//╰━━━┻╯╰╯╰╯╰╯╰╯╱╰━━━╯╰━┻╯╰┻━┻━━╯

// function drawStats() {
// 		//reading in the data
// 		//d3.csv("data/Cut/" + laCode + ".csv", function(data) {
// 	    d3.csv("data/Cut2/" + MSOA + ".csv", function(data) {
// 			dvc.dataObj = data;
// //
// // 			//filter the data
// 			filtereddata = dvc.dataObj.filter(function(d) {return d.MSOA_name == MSOA});
// 			LAname = filtereddata[0].Local_authority_name;
//       areaName();
// 	});
// }

//╭━╮╭━╮
//┃┃╰╯┃┃
//┃╭╮╭╮┣━━┳━━┳━━┳┳━╮╭━━╮
//┃┃┃┃┃┃╭╮┃╭╮┃╭╮┣┫╭╮┫╭╮┃
//┃┃┃┃┃┃╭╮┃╰╯┃╰╯┃┃┃┃┃╰╯┃
//╰╯╰╯╰┻╯╰┫╭━┫╭━┻┻╯╰┻━╮┃
//╱╱╱╱╱╱╱╱┃┃╱┃┃╱╱╱╱╱╭━╯┃
//╱╱╱╱╱╱╱╱╰╯╱╰╯╱╱╱╱╱╰━━╯

    // Copyright (c) 2013 Ryan Clark
    // https://gist.github.com/rclark/5779673
  function ready (error, topoMSOA, topoLAD, boundsData, config){

      L.TopoJSON = L.GeoJSON.extend({
      addData: function(jsonData) {
        if (jsonData.type === "Topology") {
          for (key in jsonData.objects) {
            geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          }
        }
        else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }
    });

	dvc.config = config

	d3.select("#graphic").remove();
	//dvc = {};
	dataLayer = [];
	dataObj = [];

	if(dvc.config.ons.varcolour instanceof Array) {
		dvc.colour = dvc.config.ons.varcolour
	} else {
		dvc.colour = eval("colorbrewer." + dvc.config.ons.varcolour);
	}

	highlighted = 0;
	dvc.curr = dvc.config.ons.varload;
	a = 0;
	dvc.unittext = dvc.config.ons.varunit[a];
	dvc.label = dvc.config.ons.varlabel[a];
	dvc.prefix = dvc.config.ons.varprefix[a];

	//data2 = data;
	config2 = dvc.config;

	if(dvc.config.ons.varlabel.length > 1)
		{navigation(config2);}
	else {d3.selectAll("#varsel").attr("class","hidden")};

	if(dvc.config.ons.breaks =="jenks")
		{breaks = ss.jenks(values, 5);}
	else {breaks = dvc.config.ons.breaks[a];};

	layerx = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',{
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB background</a>'
	});

    map = L.map('map',{maxZoom:18,minZoom:9}),


	//Set-up colour scale
	color = d3.scale.threshold()
			.domain(breaks.slice(1,5))
			.range(dvc.colour);

    //Set initial centre view and zoom layer
  map.setView(eval(dvc.config.ons.centre), dvc.config.ons.zoom).addLayer(layerx);

	map.on("zoomstart", leaveLayer)
	map.on("zoomend", function(){setTimeout(function(){highlightArea()},150)})

	d3.select(".leaflet-top").style("top","70px");
	createKey(dvc.config);

	//Set-up new Topojson layer (for LAs)
	  topoLayerLA= new L.TopoJSON();
	  topoLayerLA.addData(topoLAD);
    topoLayerLA.eachLayer(handleLayerLAD);
    topoLayerLA.addTo(map);
		topoLayer = [];
		boundarySearch(boundsData.regions);

	//Get bounds of map
	// Handle map movement
	map.on('moveend', function(e) {
		boundarySearch(boundsData.regions);
	});

  } // end ready
	function handleLayerLAD(layer){
		x = layer.feature.properties.LAD13CD;
        layer.setStyle({
		  fillColor: '#fff',
          fillOpacity: 0,
          color:'#fff',
          weight:0,
          opacity:1,
		  className: x
        });
    }

	function handleLayerMSOA(layer){

		x = layer.feature.properties.msoa11cd + " MSOA";
		x2 = layer.feature.properties.msoa11cd;
		x3 = layer.feature.properties.msoa11nm.replace(/\s/g,'');

		fillColor = color(rateById[x2]);
        layer.setStyle({
		  		fillColor: fillColor,
          fillOpacity: 0.7,
          color:'#fff',
          weight:0.7,
          opacity:1,
		  		className: x + " " + x3
        });
    }

function mouseEvents(){
	  var xy = d3.select(".leaflet-overlay-pane").selectAll(".MSOA");
	  xy.on("mouseout",leaveLayer).on("mouseover",enterLayer).on("click",clicked);
}

function clicked(d) {
	  if (d3.event.defaultPrevented) return;
	  selectArea(this);
	  MSOA = d3.select(this).attr("class").split(' ')[2];
	  // drawStats();
}

function selectArea(xx) {
				selected=true;
				myId = d3.select(xx).attr("class").split(' ')[0];
				currclass = d3.select(xx).attr("class").split(' ')[0];

				highlightArea();
				d3.select(".leaflet-overlay-pane").selectAll(".MSOA").on("mouseout",null).on("mouseover",null);
}

function enterLayer(){
		currclass = d3.select(this).attr("class").split(' ')[0];
		highlightArea();
}

function highlightArea(){
	d3.select('#selected').remove();
		var currpath = d3.select("." + currclass).attr("d");

		d3.select(".leaflet-overlay-pane").select("svg").append("path")
				.attr("d",currpath)
				.attr("id","selected")
				.attr("class", "arcSelection")
				.attr("pointer-events", "none")
				.attr("fill", "none")
				.attr("stroke", "#b4005a")
				.attr("stroke-width", "2");

		/* Display name of area*/
		d3.select("#areanm").text(areaById[currclass]);
		d3.select("#areainfo").html(function(d,i){if (!isNaN(rateById[currclass]))  {return "<span>" + dvc.unittext + "</span>" + dvc.prefix + rateById[currclass]} else {return "Data unavailable"}});
}

    function leaveLayer(){
		d3.select('#selected').remove();
		d3.select("#areanm").text("");
		d3.select("#areainfo").text("");
    }

	function boundarySearch(regions) {
	oldDistricts = dvc.districtsInView;
	districtsInView = [];
	updateBoundaryData();

	function updateBoundaryData(mapBounds) {

		mapBounds = map.getBounds();

		var districtsInView = [],
			regionCodes = Object.keys(regions),
			regionBounds,
			districts,
			districtCodes,
			districtBounds,
			bounds;


		for (var i = 0; i < regionCodes.length; i++) {

			regionBounds = regions[regionCodes[i]].bounds;

			//console.log(mapBounds);

			if (mapBounds.intersects(regionBounds)) {

				districts = regions[regionCodes[i]].districts;
				districtCodes = Object.keys(districts);

				for (var j = 0; j < districtCodes.length; j++) {

					districtCode = districtCodes[j];
					districtBounds = districts[districtCode].bounds;

					if (mapBounds.intersects(districtBounds)) {

						districtsInView.push(districtCode);
					}
				}
			}
		}

		districtsInView = districtsInView;
		dvc.districtsInView = districtsInView;


		addRemoveAreas(oldDistricts,districtsInView);
	};
};

function addRemoveAreas(oldDistricts, newDistricts) {


	areasToAdd = $(newDistricts).not(oldDistricts).get();
	var areasToRemove = $(oldDistricts).not(newDistricts).get();


	areasToRemove.forEach(function(d,i) {
		 map.removeLayer(topoLayer[d]);

		 removeData(d);

	});

	leng = areasToAdd.length;

	areasToAdd.forEach(function(d,i) {
		//var jsonPath = 'lsoa_by_lad/topo_' + d + '.json';
		//console.log(jsonPath);
		//d3.json('https://cdn.ons.gov.uk/assets/topojson/msoa_by_lad/topo_' + d + '.json', function(error, distData) {
		d3.json('https://raw.githubusercontent.com/henryjameslau/msoa-by-lad16-topojson/master/topo_'+d+'.json', function(error, distData) {
			//console.log('https://cdn.ons.gov.uk/assets/topojson/msoa_by_lad/topo_' + d + '.json');

			d3.csv('data/Cut/' + d + '.csv', function(error, csvData) {

			  buildDataInView(d,csvData);

			  topoLayer[d] = new L.TopoJSON();
			  topoLayer[d].on('click', function(e) {
				  gotoArea(e.latlng.lat,e.latlng.lng);
			   });

			  topoLayer[d].addData(distData);
			  topoLayer[d].eachLayer(handleLayerMSOA);
			  topoLayer[d].addTo(map);

			  mouseEvents();

			  if(highlighted == d) {
				  areaHigh = leafletPip.pointInLayer([storeLong,storeLat], topoLayer[d]);
				  currclass = areaHigh[0].options.className.split(' ')[0];
				highlightArea();
			  }

			 if(i == leng-1 && highlighted !=0) {
				d3.select(".leaflet-overlay-pane").selectAll(".MSOA").on("mouseout",null).on("mouseover",null);
			 }
			});
		});
	});
}


	function buildDataInView(d,csvData) {
			dataObj[d] = csvData;
			dataLayer.push(dataObj[d]) ;
			flattenedData = [].concat.apply([],dataLayer);
			rateById = {};
			areaById = {};
			flattenedData.forEach(function(d) {rateById[d.MSOA_code] = +eval("d.estimateinactive"); areaById[d.MSOA_code] = d.MSOA_name});
	}

	function removeData(d,csvData) {
		 	delete dataLayer[d];
			flattenedData = [].concat.apply([],dataLayer);
}




	function createKey(config){
		// var mapTitle = d3.select("#mapTitleText")
		// 	.append("svg")
		// 		.attr("id","mapDescription")
		// 		.attr("width","295px")
		// 		.attr("height","40px")
		// 		.attr("z-index","6")
		// 		.style("padding-left","10px")
		// 		.attr("fill","#007F7F")
		// 			.append("text")
		// 			.text("Physical inactivity (%)")
		// 			.attr("text-anchor","start")
		// 			.attr("font-size","20px")
		// 			.attr("transform","translate(0,30)");

		var svgkey = d3.select("#keydiv")
			.append("svg")
			.attr("id", "key")
		    .attr("height", 300);

		newbreaks = breaks;

		var color = d3.scale.threshold()
		   .domain(newbreaks)
		   .range(dvc.colour);

		//console.log(color.domain());

		y = d3.scale.linear()
		    .domain([newbreaks[0], breaks[5]]) /*range for data*/
		    .range([250, 0]); /*range for pixels*/

		keywidth = $("#keydiv").width();

		x = d3.scale.linear()
		    .domain([newbreaks[0], breaks[5]]) /*range for data*/
		    .range([0,keywidth-50]); /*range for pixels*/

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
    		.tickSize(15)
		    .tickValues(color.domain())
			.tickFormat(d3.format(",.2f"));


		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
    		.tickSize(15)
		    .tickValues(color.domain())
			.tickFormat(d3.format(",.2f"));

		var g = svgkey.append("g").attr("id","vert").attr("class","hidden-xs")
			.attr("transform", "translate(70,20)");


		g.selectAll("rect")
			.data(color.range().map(function(d, i) {
			  return {
				y0: i ? y(color.domain()[i]) : y.range()[0],
				y1: i < color.domain().length ? y(color.domain()[i+1]) : y.range()[1],
				z: d
			  };
			}))
			.enter().append("rect")
			.attr("width", 8)
			.attr("y", function(d) {return d.y1; })
			.attr("height", function(d) {return d.y0 - d.y1; })
			.style("opacity",0.8)
			.style("fill", function(d) {return d.z; });

		g.call(yAxis).append("text");

		g.append("line")
			.attr("x1","8")
			.attr("x2","55")
			.attr("y1",function(d,i){return y(config.ons.average[a])})
			.attr("y2",function(d,i){return y(config.ons.average[a])})
			.attr("stroke","blue")
			.attr("stoke-width",1);

		g.append("text")
			.attr("x","10")
			.attr("y",function(d,i){return y(config.ons.average[a]) - 4})
			.attr("class","average")
			.text(dvc.config.ons.averagelabel);

		g.append("text")
			.attr("x","10")
			.attr("y",function(d,i){return y(config.ons.average[a]) + 11})
			.attr("class","average")
			.text(numberFormat(dvc.config.ons.average[a]));

		//add units
		g.append("text").attr("id","keyunit").text(dvc.unittext).attr("transform","translate(0,-5)");
		//horizontal key

		var g2 = svgkey.append("g").attr("id","horiz").attr("class","visible-xs")
			.attr("transform", "translate(25,5)");

		keyhor = d3.select("#horiz");

		g2.selectAll("rect")
			.data(color.range().map(function(d, i) {
			  return {
				x0: i ? x(color.domain()[i]) : x.range()[0],
				x1: i < color.domain().length ? x(color.domain()[i+1]) : x.range()[1],
				z: d
			  };
			}))
		  .enter().append("rect")
			.attr("height", 8)
			.attr("x", function(d) { return d.x0; })
			.attr("width", function(d) { return d.x1 - d.x0; })
			.style("opacity",0.8)
			.style("fill", function(d) { return d.z; });


		keyhor.selectAll("rect")
			.data(color.range().map(function(d, i) {
			  return {
				x0: i ? x(color.domain()[i]) : x.range()[0],
				x1: i < color.domain().length ? x(color.domain()[i+1]) : x.range()[1],
				z: d
			  };
			}))
			.attr("x", function(d) { return d.x0; })
			.attr("width", function(d) { return d.x1 - d.x0; })
			.style("fill", function(d) { return d.z; });

		keyhor.call(xAxis).append("text")
			.attr("id", "caption")
			.attr("x", -63)
			.attr("y", -20)
			.text("");

		keyhor.append("rect")
			.attr("id","keybar")
			.attr("width",8)
			.attr("height",0)
			.attr("transform","translate(15,0)")
			.style("fill", "#ccc")
			.attr("x",x(0));
		d3.select("#horiz").selectAll("text").attr("transform",function(d,i){if(i % 2){return "translate(0,10)"}});
		g2.append("text").attr("id","keyunit").text(dvc.unittext).attr("transform","translate(0,-10)");
		}


	function gotoArea(lat,lng) {

			map.setView([lat,lng], dvc.config.ons.zoom)

			storeLong = lng;
			storeLat = lat;

			var results = leafletPip.pointInLayer([storeLong,storeLat], topoLayerLA);

			if(results.length > 0) {
					highlighted = results[0].options.className;
			}
	}


	function updateMap(config){
		//var values =  data.map(function(d) { return +eval("d." + dvc.curr); }).filter(function(d) {return !isNaN(d)}).sort(d3.ascending);

		// Generate some breaks based on the Jenks algorithm - http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization
		if(config.ons.breaks =="jenks")
			{breaks = ss.jenks(values, 5);}
		else {breaks = config.ons.breaks[a];};

		// Set up a colour scaling variable
		// This time using the jenks breaks we've defined
		color = d3.scale.threshold()
			.domain(breaks.slice(1,5))
			.range(dvc.colour);

		d3.select("#keydiv").select("svg").remove();

		// Create an object to give yourself a pair of values for the parlicon code and data value

		rateById = {};
		flattenedData.forEach(function(d) { rateById[d.areaCD] = +eval("d." + dvc.curr); });

		dvc.districtsInView.forEach(function(d,i) {
			topoLayer[d].eachLayer(handleLayerMSOA);
		});

		var xy = d3.select(".leaflet-overlay-pane").selectAll(".MSOA");

		xy.on("mouseout",leaveLayer).on("mouseover",enterLayer).on("click",click);

	}

	initialise();
	//Load data and config file
	queue()
		//.defer(d3.csv, "data/data.csv")
		.defer(d3.json, "data/topo_E06000008.json")
		.defer(d3.json, "data/topo_lad.json")
		.defer(d3.json, "data/bounds.json")
		.defer(d3.json, "data/config.json")
		.await(ready);

	} else {
		d3.select("#graphic").html("Sorry your browser does not support this interactive graphic");
		d3.select("#graphic")
			.append("img")
			.attr("src","./images/altlife.png")
			.attr("width","100%")
			.attr("height","100%");
	}
