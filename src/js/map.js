(function() {
    const lat = 10.056280026780279;
    const lng = -69.33946211611826;
    const map = L.map('map').setView([lat, lng ], 10);

    let marker;
    
    // utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat,lng], {
        draggable: true,
        autoPan:true
    })
    .addTo(map)

    marker.on('moveend', function(event){
        marker = event.target

        const position = marker.getLatLng();

        //console.log(position)
        map.panTo(new L.LatLng(position.lat, position.lng));

        // get info
        geocodeService.reverse().latlng(position, 16).run (function(error, res) {
            //console.log(res)   

            marker.bindPopup(res.address.LongLabel)
        })
    })

})()