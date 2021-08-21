//at_znHaVAtX4JT1hjpd0Yly4NdL4gMcK
//&ipAddress=192.212.145.121
//0d2.net
const map = L.map("bottom");
const input = document.getElementById("input");
const buttonInput = document.getElementById("button_input");
const ip = document.getElementById("ip");
const locat = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
buttonInput.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue === "") return;
  const inputValue2 = inputValue.split(".").join("");

  if (inputValue2.isNumber()) {
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_znHaVAtX4JT1hjpd0Yly4NdL4gMcK&ipAddress=${inputValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayData(data, inputValue2);
      })
      .catch((err) => console.log(err));
  } else {
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_znHaVAtX4JT1hjpd0Yly4NdL4gMcK&domain=${inputValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        displayData(data, inputValue2);
      })
      .catch((err) => console.log(err));
  }
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function showMap(pos) {
  map.setView(pos, 13);
  L.marker(pos).addTo(map);
}
//
function locationString([city, region, postalCode]) {
  return `${city}, ${region} ${postalCode}`;
}

function displayData(data, inputValue) {
  const pos = [data.location.lat, data.location.lng];
  const address = [
    data.location.city,
    data.location.region,
    data.location.postalCode,
  ];
  const time = data.location.timezone;
  showMap(pos);
  ip.textContent = data.ip;
  locat.textContent = locationString(address);
  timezone.textContent = `UTC${time.toString()}`;
  isp.textContent = data.isp;
}
String.prototype.isNumber = function () {
  return /^\d+$/.test(this);
};
