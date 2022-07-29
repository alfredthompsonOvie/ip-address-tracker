"use strict";
const search = document.querySelector(".search");
const submitBtn = document.querySelector(".submitBtn");
const ip__address = document.querySelector(".ip__address");
const location_ = document.querySelector(".location");
const time = document.querySelector(".time");
const isp = document.querySelector(".isp");

//! render map
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);



//! get ip details
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let query = search.value;

	fetch(
		`https://geo.ipify.org/api/v2/country,city?apiKey=at_LssbnKXT1pnYevRmI8B61weWyTtoz&ipAddress=${query}`
	)
		.then((res) => res.json())
		.then((data) => {
			const lat = data.location.lat;
			const long = data.location.lng;
			ip__address.innerHTML = data.ip;
			location_.innerHTML = data.location.region;
			time.innerHTML = data.location.timezone;
			isp.innerHTML = data.isp;

			L.marker([lat, long])
				.addTo(map)
				.bindPopup(data.location.region)
				.openPopup();

			map.panTo(L.latLng(lat, long));
		})
		.catch((err) => console.log(err));
});

// get local ip 
// fetch("https://api.ipify.org?format=json")
// 	.then(r => r.json())
// 	.then(data => {
// 		console.log(data);
// 			})
// 	.catch((err) => console.log(err));
	

// function getIP(json) {
// 	console.log(json);
// 	fetch(
// 		`https://geo.ipify.org/api/v2/country,city?apiKey=at_LssbnKXT1pnYevRmI8B61weWyTtoz&ipAddress=${json.ip}`
// 	).then((res) => res.json())
// 		.then((data) => {
// 		console.log(data);
// 		const lat = data.location.lat;
// 		const long = data.location.lng;
// 		ip__address.innerHTML = data.ip;
// 		location_.innerHTML = data.location.region;
// 		time.innerHTML = data.location.timezone;
// 		isp.innerHTML = data.isp;

// 		L.marker([lat, long])
// 			.addTo(map)
// 			.bindPopup(data.location.region)
// 			.openPopup();

// 		map.panTo(L.latLng(lat, long));
// 	})
// 	.catch((err) => console.log(err));
// }
// getIP("https://api.ipify.org?format=json")

const getLocalIP = async () => {
	const res = await fetch("https://api.ipify.org?format=json");
	const data = await res.json();
	// console.log(data.ip);
	return data;
}
const renderLocation = async () => {
	const localIP = await getLocalIP();
	// console.log(localIP);

	const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_LssbnKXT1pnYevRmI8B61weWyTtoz&ipAddress=${localIP.ip}`);
	const data = await res.json();
	// console.log(data);
	const { ip, isp: ispName } = data;
	const { lat, lng: long, region, timezone } = data.location;
	console.log(ip);
	console.log(ispName);
	console.log(region);
	console.log(timezone);
	console.log(data);
	
		// const lat = data.location.lat;
		// const long = data.location.lng;
		// ip__address.innerHTML = data.ip;
		// location_.innerHTML = data.location.region;
		// time.innerHTML = data.location.timezone;
		// isp.innerHTML = data.isp;
		ip__address.innerHTML = ip;
		location_.innerHTML = region;
		time.innerHTML = timezone;
		isp.innerHTML = ispName;

		L.marker([lat, long])
			.addTo(map)
			.bindPopup(data.location.region)
			.openPopup();

		map.panTo(L.latLng(lat, long));
}
renderLocation()