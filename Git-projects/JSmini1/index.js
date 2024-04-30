const your_Weather = document.querySelector("[yourWeather]");
const city_Weather = document.querySelector("[cityWeather]");
const searchBar = document.querySelector(".search-bar");
const city_Input = document.querySelector("[cityInput]");
const displayData = document.querySelector(".display-data");
const loading = document.querySelector(".loading");
const grantAccessContainer = document.querySelector(".grant-access");
const grantAccessButton = document.querySelector("[data-grantAccess]");

let currentTab = your_Weather;
currentTab.classList.add("active");
const API_KEY = "ddf2e3d99ef649410d69685f46ee2523";
getfromSessionStorage();
console.log(loading);


function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("active");
        currentTab = clickedTab;
        currentTab.classList.add("active");

        if (!searchBar.classList.contains("active")) {
            searchBar.classList.add("active");
            displayData.classList.remove("active");
            grantAccessContainer.classList.remove("active");
        } else {
            searchBar.classList.remove("active");
            displayData.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

your_Weather.addEventListener("click", () => {
    switchTab(your_Weather);
});

city_Weather.addEventListener("click", () => {
    switchTab(city_Weather);
});

function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        // Check if the permission message has already been logged
        if (!grantAccessContainer.classList.contains("active")) {
            grantAccessContainer.classList.add("active");
            console.log("nahi mila, parmision do");
        }
    } else {
        const coordinates = JSON.parse(localCoordinates);
        console.log("Mil gaya, call fetchUser");
        fetchUserWeatherInfo(coordinates);
    }
}


function renderWeatherInfo(weatherInfo) {
    console.log("Rendering call");
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-WeatherDiscription]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-Temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humid = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-clouds]");

    cityName.innerText = weatherInfo?.name || "";
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description || "";
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp || ""} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed || ""} m/s`;
    humid.innerText = weatherInfo?.main?.humidity || "";
    cloudiness.innerText = `${weatherInfo?.clouds?.all || ""} %`;
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // Make grant container invisible
    grantAccessContainer.classList.remove("active");
    // Make loader visible
    loading.classList.add("active");

    // API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        // Hide loading indicator
        loading.classList.remove("active");

        // Display weather data
        displayData.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        // Handle error if API call fails
        console.error("Error fetching weather data:", err);
        loading.classList.remove("active");
    }
}

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        // Request location permission
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // Handle if geolocation is not supported
        console.error("Geolocation is not supported.");
    }
}

// Function to handle user's position
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    // Store user's coordinates in session storage
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

    // Fetch weather information using user's coordinates
    fetchUserWeatherInfo(userCoordinates);
}

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = city_Input.value;

    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);

    console.log("submitted");
});

async function fetchSearchWeatherInfo(city) {
    loading.classList.add("active");
    displayData.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loading.classList.remove("active");
        displayData.classList.add("active");
        console.log(data);
        renderWeatherInfo(data);
    } catch (err) {
        // Handle error
    }
}

grantAccessButton.addEventListener("click", getLocation);
