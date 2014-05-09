var map;
var mapOptions = ["osm", "national-geographic", "gray", "satellite", "hybrid", "oceans", "streets", "topo"];
var legOpt = {
	map:map,
	autoUpdate: true,
	respectCurrentMapScale: true
};
require(["esri/map", "esri/dijit/Legend", "esri/layers/FeatureLayer", "dijit/layout/ContentPane", "dojo/domReady!"],
function (Map, Legend, FeatureLayer) {
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
          var legend = new Legend({
            map: map
          }, "legDiv");
          legend.startup();
      });

      map.on("zoom-end", function() {
      	map.setBasemap(mapSelect());
      })


map.addLayers([layer]);

function mapSelect(){
	num = Math.floor(Math.random() * mapOptions.length);
	console.log(num)
	basemap = mapOptions[num];
	console.log(basemap)
	return basemap;
};

});
