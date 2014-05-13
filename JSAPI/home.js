var map;
var legend;
var layer;
var mapOptions = ["osm", "national-geographic", "gray", "satellite", "hybrid", "oceans", "streets", "topo"];

require([
    "esri/map",
    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "esri/dijit/Legend",
    "esri/dijit/OverviewMap",
    "dojo/_base/array",
    "dojo/parser",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/AccordionContainer",
    "dojo/domReady!"
], function (
    Map,
    InfoTemplate,
    FeatureLayer,
    domClass,
    domConstruct,
    on,
    Legend,
    OverviewMap,
    arrayUtils,
    parser
) {

    parser.parse();

    map = new Map("mapDiv", {
        center: [-75.8, 38.45],
        zoom: 9,
        basemap: "gray"
    });

    var infoTemplate = new InfoTemplate();
    infoTemplate.setTitle("autoBody layer information");
    infoTemplate.setContent("${*}");

    domClass.add(map.infoWindow.domNode, "myTheme");

    layer = new FeatureLayer("http://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/autoBody/FeatureServer/0", {
        visible: true,
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: infoTemplate
    });

    map.on("layers-add-result", function () {
        legend = new Legend({
            map: map,
            autoUpdate: true,
            respectCurrentMapScale: true
        }, "legDiv");
        legend.startup();
        omap.show();
    });

    map.on("zoom-end", function () {
        map.setBasemap(mapSelect());
    });

omap = new OverviewMap({
  attachTo: "bottom-left",
  map:map
})
omap.startup();


    map.addLayers([layer]);

    function mapSelect() {
        num = Math.floor(Math.random() * mapOptions.length);
        console.log(num)
        basemap = mapOptions[num];
        console.log(basemap)
        return basemap;
    };

    function loopLayers() {
        for (var i = 0; i < layer.fields.length; i++) {
            console.log(layer.fields[i].name);
        }
    };

});