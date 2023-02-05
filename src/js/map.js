(function() {
    const lat = document.querySelector("#lat").value || -20.22917777923765;
    const lng = document.querySelector("#lng").value || -70.13370591679471;
    const map = L.map('map').setView([lat, lng ], 16);

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
            console.log(res)   
            marker.bindPopup(res.address.LongLabel)

            // llenar los campos
            document.querySelector('.street').textContent = res?.address?.Address ?? '';
            document.querySelector('#street').value = res?.address?.Address ?? '';
            document.querySelector('#lat').value = res?.latlng?.lat ?? '';
            document.querySelector('#lng').value = res?.latlng?.lng ?? '';
        })
    })

})()