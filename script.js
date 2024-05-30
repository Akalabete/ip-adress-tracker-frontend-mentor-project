document.addEventListener('DOMContentLoaded', (event) => {
    let input;
    let ipOutput = document.getElementById('ipOutput');
    let ipInput = document.getElementById('ipInput');
    let submitBtn = document.getElementById('submit-btn');
    let timezone = document.getElementById('timezone');
    let locationInfo = document.getElementById('location');
    let isp = document.getElementById('isp');
    let loclat;
    let loclong;
    var map = L.map('map').setView([51.505, -0.09], 13);
    var persIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        
    
        iconSize:     [38, 50], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    function apiCall(input) {
        let url = `https://geo.ipify.org/api/v1?apiKey=at_N7oX6kM2kWRfmFPIS5gDCQrCeOSqE`;
        let ipRegex = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/);
        let domainRegex = new RegExp(/^(?:[a-z]+\.)?[a-z]+\.[a-z]+$/);
        ipOutput.textContent = "";
        isp.textContent = "";
        timezone.textContent = "";
        locationInfo.textContent = "";
        loclong = "";
        loclat = "";
        if(input === "" || input === null || input === undefined) {
           url += `&ipAddress=`
        } else if(ipRegex.test(input)) {
            url += `&ipAddress=${encodeURIComponent(input)}`;
        } else if(domainRegex.test(input)){
            url += `&domain=${encodeURIComponent(input)}`;
        } else {
            alert('Invalid input');
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                ipOutput.textContent= `${data.ip}`;
                ipInput.value = `${data.ip}`;
                isp.textContent = `${data.isp}`;
                timezone.textContent = `UTC${data.location.timezone}`;
                locationInfo.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
                loclong = data.location.lng;
                loclat = data.location.lat; 
                let newLat = loclat + 0.25 * (map.getBounds().getNorth() - map.getBounds().getSouth());
                map.setView([newLat, loclong], 13);
                L.marker([loclat, loclong], {icon: persIcon}).addTo(map);
            })
            .catch(error => console.log(error));
    }
    apiCall(input);
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target === submitBtn) {
            input = ipInput.value;
            apiCall(input);
        }
    });

    ipInput.addEventListener('click', (event) => {
        event.preventDefault();
        ipInput.value = "";
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
});