// mapboxgl.accessToken = 'pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A';
// var map = new mapboxgl.Map({
// container: 'map',
// center : [ 36.81667, -1.28333],
// zoom : 8,
// style: 'mapbox://styles/mapbox/dark-v9'
// });

// map.on('load', function(e){
//     map.addSource('accident',{'type':'geojson','data':"http://127.0.0.1:8000/data"});
//     map.addLayer({'id':'accident','source':'accident','type':'circle',
//     'paint': {
//         'circle-opacity': 0.8,
//         'circle-color': 'orange'
//     }
//     })
// })

var mymap;
var ctlSidebar;
var rightSidebar;
var accidents;
var counties;
var point;
var ctlRouting;
var animatedMarker;
$(document).ready(function(){
    mymap = L.map('map', {center:[-1.300561, 36.784549], zoom:5, zoomControl:false, attributionControl:false});
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>';

    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A';

    var base_layer = L.tileLayer(mbUrl, {
    id: 'mapbox.dark',
    attribution: mbAttr
    }).addTo(mymap);
            // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(mymap);

    mymap.on('click', function(e){
        var x = e.latlng;
       
        point = {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [x.lng,x.lat]
            }
          };
        if(accidents){
            var another = accidents.toGeoJSON();
            
            for(var i=0; i<another.features.length; i++){
                var jsnBuffer = turf.buffer(another.features[i], 1, 'kilometers');
                var searchWithin = turf.polygon(jsnBuffer.geometry.coordinates);
                if (point){
                    if (turf.inside(point, searchWithin) == true){
                        alert('Accident zone')
                    }
                    else{
                        // pass for now
                    }
    
                }

            }
        }
    })
   
    
    rightSidebar = L.control.sidebar('sidebar-right', {
        position: 'right'
    });
    ctlSidebar = L.control.sidebar('side-bar', {position:'left'});
    
    
    

    accidents = L.geoJSON.ajax('http://127.0.0.1:8000/data',
     {
        pointToLayer: function (feature, latlng) {
            var att = feature.properties
            return L.circleMarker(latlng, {radius:10, color:'orange',opacity:1});
        },
        onEachFeature: function (feature, layer) {
            var rd =  new Date(feature.properties.report_date);
            var ad =  new Date(feature.properties.accident_date)
            var content = "<table class='table table-striped table-bordered table-condensed'>" +
            "</td></tr>" + "<tr><th>Id</th><td>" + feature.properties.pk + 
            "</td></tr>" + "<tr><th>report date</th><td>" +rd  + 
             "<tr><th>Accident Date</th><td>" +ad  + 
             "</td></tr>" + "<tr><th>Cause</th><td>" + feature.properties.cause + 
             "</td></tr>" + "<tr><th>Persons</th><td>" + feature.properties.persons + 
             "</td></tr>" + "<tr><th>Victims</th><td>" + feature.properties.victims + 
             "</td></tr>" + "<tr><th>Road</th><td>" + feature.properties.road + 
             "</td></tr>" + "<tr><th>Category</th><td>" + feature.properties.categories + 
             "</td></tr>" + "<tr><th>Description</th><td>" + feature.properties.description + 
             "</td></tr>" + "<tr><th>Cars involved</th><td>" + feature.properties.cars_involved + 
             "</td></tr>" + "<table>";
            layer.on({click: function(e){
                mymap.addControl(rightSidebar);
                $('#feature-list').html(content)
              
            }});

            // var jsnBuffer = turf.buffer(feature, 0.5, 'kilometers');
            // var pointlyrbuffer = L.geoJSON(jsnBuffer,{style:{color:'pink', dashArray:'5,5', fillOpacity:0.3}}).addTo(mymap);
        //     var searchWithin = turf.polygon(jsnBuffer.geometry.coordinates);
        //     // console.log(searchWithin)
        //     console.log(point)
        //     if (point){
        //         if (turf.inside(point, searchWithin) == true){
        //             alert('Accident zone')
        //         }
        //         else{
        //             alert('outside')
        //         }

        //     }
        //     // for(var i=0; i<another.features.length; i++){
        //     //     //     console.log(another.features[i])
        //     //     }
            

        }

     }).addTo(mymap);

     counties = L.geoJSON.ajax('http://127.0.0.1:8000/counties',
     {
        style: function (feature) {
          return {
            color: "green",
            fill: false,
            opacity: 0.8,
            clickable: false
          };
        },
        onEachFeature: function (feature, layer) {
     
           layer.on('click', function(e){
           
               
            $.ajax({
                url:'/individual_data/'+feature.properties.pk,
                dataType: 'json',
                success: function (datax) {
                    var accs;
                    if(datax === 'null'){
                        accs = 0
                    }else{
                        var newx = JSON.parse(datax)
                        accs = newx.features.length

                        
                        
                    }
  
                    var att = feature.properties
                    layer.bindPopup("<h4>Accident details about "+ att.county+" County</h4><h5> Accidents count "+accs+".</h5><div id='cont'></div>").openPopup();
            
                   
                }

                
            });
                   
           })

            layer.on({
                mouseover: function (e) {
                  var layer = e.target;
                  layer.setStyle({
                    weight: 3,
                    color: "blue",
                    opacity: 0.7
                  });
                  if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                  }
                },
                mouseout: function (e) {
                    counties.resetStyle(e.target);
                    // this.closePopup()
                }
               
              });
             
            
            
        
        }
        
      }).addTo(mymap);

        var waypoints =  [
            L.latLng(-1.300838,36.784675),
            L.latLng(-1.292831,36.789042)
          ]
        
        ctlRouting = L.Routing.control({waypoints,
            router: L.Routing.mapbox('pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A')}).addTo(mymap);
    

        ctlRouting.on('routeselected', function(e) {
                    // mymap.removeControl(ctlRouting)
                    var route = e.route;
                    var car = '/static/images/car.svg'
                    var line = L.polyline(route.coordinates);
                    var myIcon = L.icon({
                        iconUrl: car,
                        iconSize:[40, 60],
                        iconAnchor:[20, 60],
                        popupAnchor: [0, -53]
                      });
                
                    if(animatedMarker){
                        mymap.removeLayer(animatedMarker)
                        animatedMarker = L.animatedMarker(line.getLatLngs(),{icon: myIcon});
                        mymap.addLayer(animatedMarker)
                    }else{
                        animatedMarker = L.animatedMarker(line.getLatLngs(),{icon: myIcon});
                        mymap.addLayer(animatedMarker)
                    }


                    for(var i=0; i<animatedMarker._latlngs.length; i++){
                        var newPoint = L.marker(animatedMarker._latlngs[i]);
                        
                        var point = {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                              "type": "Point",
                              "coordinates": [newPoint._latlng.lng,newPoint._latlng.lat]
                            }
                          };
                        var jsnIncidenceBuffer = turf.buffer(accidents.toGeoJSON(), 0.5, 'kilometers');
                      
                        var points=[]
                        for(var x=0; x<jsnIncidenceBuffer.features.length; x++){
                            // L.geoJSON(jsnIncidenceBuffer.features[x], {style:{color:'black', dashArray:'5,5', fillOpacity:0.3}}).addTo(mymap);
                            var searchWithin = turf.polygon(jsnIncidenceBuffer.features[x].geometry.coordinates);
                            if (turf.inside(point, searchWithin) == true){
                                points.push(point);
                                
                                }
                            else{
                                // console.log('no point')
                            }

                        }
                        if(points){
                            for(var y=0; y<points.length; y++){
                                var myIcon = L.icon({
                                    iconUrl:"/static/images/cool.svg",
                                    iconSize:[40, 60],
                                    iconAnchor:[20, 60],
                                    popupAnchor: [0, -53]
                                    });
                            
                                var myn = L.marker([points[y].geometry.coordinates[1],points[y].geometry.coordinates[0]],{icon:myIcon}).bindPopup('<h2>accident zone</h2>').openPopup().addTo(mymap);
                
                            }
                        }
                        // if(points){
                        //     var newPoint =[]
                        //     for(var y=0; y<points.length; y++){
                        //         // console.log(points[y].geometry.coordinates)
                        //         for(var i=0; i<animatedMarker._latlngs.length; i++){
                        //             console.log([animatedMarker._latlngs[i].lng,animatedMarker._latlngs[i].lat])
                        //             // console.log(points[y].geometry.coordinates)
                        //             // if(JSON.stringify(points[y].geometry.coordinates) == JSON.stringify([animatedMarker._latlngs[i].lng,animatedMarker._latlngs[i].lng])){
                        //             //      console.log(point[y])
                        //             // }
                        //         }
                        //     }
                        // }


                    }

                    // mymap.removeControl(ctlRouting)
                    
                    // console.log(route.coordinates);
                });
        
    
        // var jsnBuffer = turf.buffer(another.features[i], 0.5, 'kilometers');
        // var pointlyrbuffer = L.geoJSON(jsnBuffer,{style:{color:'pink', dashArray:'5,5', fillOpacity:0.3}}).addTo(mymap);
       


    mymap.on('zoom', function() {
        var zoom = this.getZoom();
        if(zoom>8){
            mymap.addControl(ctlSidebar)
   
        }
        else{
            mymap.removeControl(ctlSidebar)
        }
     }, mymap);

     
    // mymap.on('data:load', function(){
    //     alert('map fully loaded')
    // })

    
});

$("#alcohol").click(function(){
    var data = accidents.toGeoJSON();
    var datas = [];
    for (var i=0; i < data.features.length; i++){
    
        if(data.features[i].properties.cause == "Alcohol"){
            console.log(data.features[i].properties.cause)
            datas.push(data.features[i])
        }
    
    }

    var x = L.geoJSON(datas,    {
        pointToLayer: function (feature, latlng) {
            var att = feature.properties
            return L.circleMarker(latlng, {radius:5, color:'green',opacity:1});
        }}
    ).addTo(mymap);

});

$("#overspeeding").click(function(){
    var data = accidents.toGeoJSON();
    var datas = [];
    for (var i=0; i < data.features.length; i++){
    
        if(data.features[i].properties.cause == "Overspeeding"){
            console.log(data.features[i].properties.cause)
            datas.push(data.features[i])
        }
    
    }

    var x = L.geoJSON(datas,    {
        pointToLayer: function (feature, latlng) {
            var att = feature.properties
            return L.circleMarker(latlng, {radius:5, color:'hotpink',opacity:1});
        }}
    ).addTo(mymap);

});

$("#distracted").click(function(){
    var data = accidents.toGeoJSON();
    var datas = [];
    for (var i=0; i < data.features.length; i++){
    
        if(data.features[i].properties.cause == "Driver distracted"){
            console.log(data.features[i].properties.cause)
            datas.push(data.features[i])
        }
    
    }

    var x = L.geoJSON(datas,    {
        pointToLayer: function (feature, latlng) {
            var att = feature.properties
            return L.circleMarker(latlng, {radius:5, color:'blue',opacity:1});
        }}
    ).addTo(mymap);

});

