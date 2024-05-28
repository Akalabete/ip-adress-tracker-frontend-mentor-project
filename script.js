document.addEventListener('DOMContentLoaded', (event) => {
    let input;
    let ipOutput = document.getElementById('ipOutput');
    let ipInput = document.getElementById('ipInput');
    let submitBtn = document.getElementById('submit-btn');
    let timezone = document.getElementById('timezone');
    let locationInfo = document.getElementById('location');
    let isp = document.getElementById('isp');

    function apiCall(input) {
        let url = `https://geo.ipify.org/api/v1?apiKey=at_N7oX6kM2kWRfmFPIS5gDCQrCeOSqE`;
        let ipRegex = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/);
        let domainRegex = new RegExp(/^(?:[a-z]+\.)?[a-z]+\.[a-z]+$/);
        if(input === "" || input === null || input === undefined) {
           url += `&ipAddress=`
        } else if(ipRegex.test(input)) {
            console.log('ip')
            url += `&ipAddress=${encodeURIComponent(input)}`;
        } else if(domainRegex.test(input)){
            console.log('domain')
            url += `&domain=${encodeURIComponent(input)}`;
        } else {
            alert('Invalid input');
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
    apiCall(input);
    submitBtn.addEventListener('click', (event) => {
        console.log('clicked')
        ipOutput.textContent = "";
        isp.textContent = "";
        timezone.textContent = "";
        locationInfo.textContent = "";
        if(event.target === submitBtn) {
            input = ipInput.value;
            apiCall(input);
            console.log(input);
        }
    });

});