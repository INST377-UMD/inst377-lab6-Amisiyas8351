function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [];

for (let i = 0; i < 3; i++) {
    const latitude = getRandomInRange(30, 35, 3);
    const longitude = getRandomInRange(-100, -90, 3);
    coordinates.push({ lat: latitude, lng: longitude });
}

const map = L.map('map').setView([32.5, -95], 5); // Adjust the view to show all points

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

async function getLocality(lat, lng, index) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || 'Unknown locality';
}

coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}`);

    document.getElementById(`marker_${index + 1}_coordinates`).innerText = `Latitude: ${coord.lat}, Longitude: ${coord.lng}`;

    getLocality(coord.lat, coord.lng, index).then(localityText => {
        document.getElementById(`marker_${index + 1}_locality`).innerText = localityText;
    });
});