    var map;
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
        basemap:"topo",
        center: [-96.53, 38.374],
        zoom: 13
      });

      var rivers = new FeatureLayer("http://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/autoBody/FeatureServer/0", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields:["*"]
      });

      //add the legend
      map.on("layers-add-result", function () {
          var legendDijit = new Legend({
            map: map,
          }, "legDiv");
          legendDijit.startup();
        });

      map.addLayers([rivers]);
    });