var map;
var legend;
var mapOptions = ["osm", "national-geographic", "gray", "satellite", "hybrid", "oceans", "streets", "topo"];
var legOpt = {
	map:map,
	autoUpdate: true,
	respectCurrentMapScale: true
};
    require([
      "esri/map", "esri/layers/FeatureLayer", "esri/dijit/Legend",
      "dojo/_base/array", "dojo/parser",
      "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
      "dijit/layout/AccordionContainer", "dojo/domReady!"
    ], function(
      Map, FeatureLayer, Legend,
      arrayUtils, parser
    ) {
      
      parser.parse();

        map = new Map("mapDiv", {
            center: [-75.8, 38.45],
            zoom: 9,
            basemap: "gray",
        });

var layer = new FeatureLayer("http://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/autoBody/FeatureServer/0",
	{visible: true
	,mode:FeatureLayer.MODE_ONDEMAND
	,outFields:["*"]
});

      map.on("layers-add-result", function () {
          legend = new Legend({
	map:map,
	autoUpdate: true,
	respectCurrentMapScale: true
}, "legDiv");
          legend.startup();
      });

      map.on("zoom-end", function() {
      	map.setBasemap(mapSelect());
      });

map.addLayers([layer]);

function mapSelect(){
	num = Math.floor(Math.random() * mapOptions.length);
	console.log(num)
	basemap = mapOptions[num];
	console.log(basemap)
	return basemap;
};

});
