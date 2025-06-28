const lat = window.mapData.lat;
const lng = window.mapData.lng;
const title = window.mapData.title;

const map = L.map('map').setView([lat, lng], 10);


// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
}).addTo(map);


// creating red marker icon
const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});


// marker with popup and red icon
L.marker([lat, lng], { icon: redIcon }).addTo(map)
    .bindPopup(`<h5>${title}</h5><p>Exact location will be provided after booking</p>`);