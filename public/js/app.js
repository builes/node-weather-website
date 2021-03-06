const weatherForm = document.querySelector("form");
const address = document.querySelector("#address");
const msgOne = document.querySelector("#msg1");
const msgTwo = document.querySelector("#msg2");
const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = address.value;
  console.log(location);
  msgOne.textContent = "Loading...";

  //fetch viene por defecto con js y sirve para consumir datos de una api, en nodeJS no podemos usar fetch
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        msgOne.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecastData);
        msgOne.textContent = data.location;
        msgTwo.textContent = data.msg;
        lat.textContent = `latitude: ${data.latitudeW} `;
        lon.textContent = `longitude: ${data.longitudeW} `;
      }
    });
  });
});
