document.addEventListener('DOMContentLoaded', (event) => {
    let ip;
    let ipOutput = document.getElementById('ipOutput');
    let ipInput = document.getElementById('ipInput');
    let submitBtn = document.getElementById('submit-btn');
    let timezone = document.getElementById('timezone');
    let locationInfo = document.getElementById('location');
    let isp = document.getElementById('isp');

    function apiCall(ip) {
        let url = `https://geo.ipify.org/api/v1?apiKey=at_N7oX6kM2kWRfmFPIS5gDCQrCeOSqE`;
        if(ip) {
            url += `&ipAddress=${ip}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.ip);
                ipOutput.textContent= `${data.ip}`;
                ipInput.value = `${data.ip}`;
                isp.textContent = `${data.isp}`;
                timezone.textContent = `UTC${data.location.timezone}`;
                locationInfo.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            })
            .catch(error => console.log(error));
    }
    apiCall(ip);
    submitBtn.addEventListener('click', (event) => {
        console.log('clicked')
        ipOutput.textContent = "";
        isp.textContent = "";
        timezone.textContent = "";
        locationInfo.textContent = "";
        if(event.target === submitBtn) {
            ip = ipInput.value;
            apiCall(ip);
            console.log(ip);
        }
    });
});