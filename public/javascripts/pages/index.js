var Index = {
    map: null,
    marker:  null,
    resultMarkersDisplays: [],
    resultMarkers: [],
    init: function()
    {

        console.log("Index.init")
        Index.initMap();
        $("#list-of-places").hide();

        $("#btn-search").click(function(){
            Index.search();
        })

        $("#btn-go").click(function(){
            Index.go();
        })
    }
    ,
    displayMap: function(location)
    {
        console.log("Index.displayMap()")
        const map = new google.maps.Map(document.getElementById("gmap"), {
            zoom: 15,
            center: location,
        });

        // The marker, positioned at Uluru
        Index.marker = new google.maps.Marker({
            position: location,
            map: map,
        }); 

        Index.map = map;

        return map;
    }
    ,
    // Initialize and add the map
    initMap: function() {
        var me = this;
        console.log("Index.initMap()")
        // The location of Uluru
        const uluru = { lat: -6.2088, lng: 106.8456 };

        let map = Index.displayMap(uluru);
        me.setMarkerEvent(map);
    }
    ,
    setMarkerEvent: function(map)
    {
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
            
            console.log("click")

            if(Index.marker  != null)
                Index.marker.setMap(null)
            // The marker, positioned at Uluru
            let position = mapsMouseEvent.latLng;
            console.log(position)

            Index.marker = new google.maps.Marker({
                position: position,
                map: map,
            }); 
        });
    }

    ,
    search:function()
    {
        let pos = this.marker.getPosition();
        console.log(pos)
        let url = "/gmap/search-near-by/";
        let keyword = $("#keyword").val();
        let radius  = $("#radius").val();
        radius = radius * 1000;

        let parameters = "" + encodeURIComponent(pos.lat()) + "/" + encodeURIComponent(pos.lng()) + "/" + encodeURIComponent(keyword);
        parameters += "/" + encodeURIComponent(radius);

        url += parameters;
        console.log(url);

        $.get(url, function(result){
            console.log(result)
            let markers = Index.resultsToMarkers(result.payload.results)
            Index.clearMarkers();
            Index.displayMarkers(Index.map, markers);
            Index.displayResultMarkers(markers);
        })
    }
    ,
    resultsToMarkers: function(results)
    {
        let markers = [];
        results.forEach((result,i)=>{
            markers.push({ id: result.place_id, position: result.geometry.location, types: result.types, vicinity: result.vicinity, name: result.name })
        })

        Index.resultMarkers = markers;
        return markers;
    }
    ,
    go:function()
    {
        let url = "/gmap/go/";
        let keyword = $("#place").val();    

        url += encodeURIComponent(keyword);
        console.log(url);
        

        $.get(url,function(result){
            console.log(result)
            if(result.payload.candidates.length > 0)
            {
                let candidate = result.payload.candidates[0];
                console.log(candidate)
                let location = candidate.geometry.location;
                let map = Index.displayMap(location)
                Index.setMarkerEvent(map);
            }
        })
    }
    ,
    clearMarkers: function()
    {
        Index.resultMarkersDisplays.forEach((marker, i)=>{
            marker.setMap(null);
        })

        Index.resultMarkers = [];
    }
    ,
    displayMarkers: function (map, markers)
    {
        let i = 1;
        markers.forEach((marker)=>{

            let markerDisplay = new google.maps.Marker({
                position: marker.position,
                icon: "/images/marker.png",
                place_id: marker.id,
                label: {
                    text: '' + i,
                    color: '#ff0000',
                    fontSize: '16px',
                    anchor: new google.maps.Point(22, 0),
                    className: 'map-label'
                },
                map: map
                
            });
            i++;

            markerDisplay.addListener("click", () => {
                console.log(markerDisplay.place_id)
                Index.showPlaceId(markerDisplay.place_id)
            })
            Index.resultMarkersDisplays.push(markerDisplay);
        })
    }
    ,
    displayResultMarkers: function(markers)
    {
        console.log("Index.displayResultMarkers()")
        console.log(markers);
        $("#list-of-places").html("");
        let i = 1;
        markers.forEach((marker)=>{
            let div = document.createElement("div");
            $(div).attr("place_id", marker.id)
            $(div).css("cursor", "pointer")
            $(div).css("padding", "10px")
            
            let divTitle = $("<div class='list-title'>" + i + ". " + marker.name + "</div>");
            let divVicinity = $("<div class='list-content'>" + marker.vicinity + "</div>");
            let divTypes = $("<div class='list-content'>Types: " + marker.types.join(", ") + "</div>");
            let divLine = $("<div><hr></div>")
            $(div).append(divTitle);
            $(div).append(divVicinity);
            $(div).append(divTypes);
            //$(div).append(divLine);
            i++;

            $(div).on("click", function(){
                let place_id = $(this).attr("place_id");
                console.log(place_id)
                Index.showPlaceId(place_id)
            });

            $("#list-of-places").append(div)
        })
        $("#list-of-places").show();
    }
    ,
    showPlaceId: function(place_id)
    {
        $("div[place_id]").css("background-color", "#fff")
        $("div[place_id=" + place_id + "]").css("background-color", "#0390fc")

        let selectedMarker = null;
        Index.resultMarkersDisplays.forEach((markerDisplay)=>{
            markerDisplay.setIcon("/images/marker.png");
            if(markerDisplay.place_id == place_id)
                selectedMarker = markerDisplay;
        })

        if(selectedMarker != null)
            selectedMarker.setIcon( "/images/marker-selected.png");
    }
  
}