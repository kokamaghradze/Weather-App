const apiKey = '4072802125bde5692dfb34441e54e600';
let temperatureChartInstance = null;

// 🔄 Auto-clear results
function resetUI() {
    document.getElementById('weatherResult').innerHTML = "";
    document.getElementById('forecast').innerHTML = "";
}

// 🌍 Fetch Weather Data
async function getWeather() {
    resetUI();
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Enter a city!");

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();
        if (!data.name) throw new Error("City not found");

        displayWeather(data);
        updateBackground(data.weather[0].main);
    } catch (err) {
        document.getElementById('weatherResult').innerHTML = `<p>❌ ${err.message}</p>`;
        console.error(err);
    }
}

// 🎭 Show Weather Info
function displayWeather(data) {
    const icons = {
        "Clear": "assets/sun.gif",
        "Clouds": "assets/clouds.gif",
        "Rain": "assets/rain.gif",
        "Snow": "assets/snow.gif"
    };
    
    document.getElementById('weatherResult').innerHTML = `
        <h2>${data.name}</h2>
        <img src="${icons[data.weather[0].main] || 'assets/default.gif'}">
        <p>🌡️ ${data.main.temp}°C | ☁️ ${data.weather[0].description}</p>
    `;
}

// 🎥 Dynamic Background
function updateBackground(weather) {
    const bgVideos = {
        "Clear": "assets/sunny.mp4",
        "Clouds": "assets/cloudy.mp4",
        "Rain": "assets/rainy.mp4",
        "Snow": "assets/snow.mp4"
    };
    document.getElementById("weatherVideo").src = bgVideos[weather] || "assets/default.mp4";
}

// 🌙 Dark Mode Toggle
document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    document.getElementById('toggleTheme').innerHTML = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ⏎ Search on Enter Key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});
