<template>
  <div>
    <h1>Weather, Currency & News App</h1>
    <h3>Github Actions CI/CD - build automatically.</h3>
    <div class="tabs">
      <div :class="['tab', currentTab === 'weather' && 'active']" @click="currentTab = 'weather'">Weather</div>
      <div :class="['tab', currentTab === 'currency' && 'active']" @click="currentTab = 'currency'">Currency</div>
      <div :class="['tab', currentTab === 'news' && 'active']" @click="currentTab = 'news'">News</div>
    </div>

    <WeatherWidget v-if="currentTab === 'weather'" />
    <CurrencyConverter v-if="currentTab === 'currency'" />
    <News v-if="currentTab === 'news'" />
  </div>
</template>

<script>
import WeatherWidget from './components/WeatherWidget.vue';
import CurrencyConverter from './components/CurrencyConverter.vue';
import News from './components/News.vue';

export default {
  components: { WeatherWidget, CurrencyConverter, News },
  data() {
    return {
      currentTab: 'weather'
    };
  }
};
</script>
