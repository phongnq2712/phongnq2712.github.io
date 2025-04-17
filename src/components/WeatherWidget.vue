<template>
  <div id="weather">
    <div id="weather-list"></div>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  data() {
    return {
      cities: [
        { name: "Nha Trang", country: "VN", flag: "🇻🇳" },
        { name: "Ho Chi Minh", country: "VN", flag: "🇻🇳" },
        { name: "Toronto", country: "CA", flag: "🇨🇦" },
        { name: "New York", country: "US", flag: "🇺🇸" },
        { name: "San Diego", country: "US", flag: "🇺🇸" },
        { name: "Auckland", country: "NZ", flag: "🇳🇿" },
        { name: "Sydney", country: "AU", flag: "🇦🇺" }
      ],
      weatherAPIKey: '7a6fcb24abbfed747d57e54dbb9d1906'
    };
  },
  mounted() {
    this.fetchWeather();
  },
  methods: {
    async fetchWeather() {
      const weatherList = document.getElementById('weather-list');
      weatherList.innerHTML = '';

      for (let city of this.cities) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${this.weatherAPIKey}`;

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('City not found');
          const data = await response.json();

          const currentTemp = data.list[0].main.temp;
          const description = data.list[0].weather[0].description;
          const forecast = data.list.slice(8, 32, 8).map(f => `${f.main.temp}°C`).slice(0, 3).join(" | ");

          const div = document.createElement('div');
          div.className = 'weather-item';
          div.innerHTML = `
            <div class="city-info">
              <span class="city-flag">${city.flag}</span>
              <span class="city-name">${city.name}</span>
            </div>
            <div class="weather-info">
              <span class="temp-current">${currentTemp}°C</span>, ${description}<br>
              <small>Next Days: ${forecast}</small>
            </div>
          `;
          weatherList.appendChild(div);
          setTimeout(() => {
            div.style.opacity = 1;
            div.style.transform = 'translateY(0)';
          }, 100);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>
