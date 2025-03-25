const cities = [
    { name: "Nha Trang", country: "VN", flag: "🇻🇳" },
    { name: "Ho Chi Minh", country: "VN", flag: "🇻🇳" },
    { name: "Toronto", country: "CA", flag: "🇨🇦" },
    { name: "New York", country: "US", flag: "🇺🇸" },
    { name: "San Diego", country: "US", flag: "🇺🇸" },
    { name: "Auckland", country: "NZ", flag: "🇳🇿" },
    { name: "Sydney", country: "AU", flag: "🇦🇺" }
];

const weatherAPIKey = '7a6fcb24abbfed747d57e54dbb9d1906';

async function fetchWeather() {
    const weatherList = document.getElementById('weather-list');
    weatherList.innerHTML = '';

    for (let city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${weatherAPIKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();

            const currentTemp = data.list[0].main.temp;
            const description = data.list[0].weather[0].description;

            const forecast = data.list.slice(8, 32, 8).map(f => `${f.main.temp}°C`).slice(0, 3).join(" | ");

            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-item';
            weatherItem.innerHTML = `
                <div class="city-info">
                    <span class="city-flag">${city.flag}</span> 
                    <span class="city-name">${city.name}</span>
                </div>
                <div class="weather-info">
                    <span class="temp-current">${currentTemp}°C</span>, ${description}<br>
                    <small>Next Days: ${forecast}</small>
                </div>
            `;

            weatherList.appendChild(weatherItem);
            setTimeout(() => {
                weatherItem.style.opacity = 1;
                weatherItem.style.transform = 'translateY(0)';
            }, 100);
        } catch (error) {
            console.error('Weather fetch error:', error);
        }
    }
}

fetchWeather();
