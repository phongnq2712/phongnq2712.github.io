<template>
  <div class="converter">
    <label for="amount">Amount:</label>
    <input type="number" v-model="amount" placeholder="Enter amount" />

    <select v-model="currency">
      <option value="CAD">CAD</option>
      <option value="USD">USD</option>
      <option value="AUD">AUD</option>
      <option value="NZD">NZD</option>
    </select>

    <button @click="convertCurrency">Convert</button>

    <div id="conversion-result">{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: "CurrencyConverter",
  data() {
    return {
      amount: '',
      currency: 'CAD',
      result: '',
      currencyAPIKey: 'cbf6f683bd10c0457fe9f089'
    };
  },
  methods: {
    async convertCurrency() {
      if (!this.amount || this.amount <= 0) {
        this.result = "Please enter a valid amount.";
        return;
      }

      const url = `https://v6.exchangerate-api.com/v6/${this.currencyAPIKey}/latest/${this.currency}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Currency data not found');
        const data = await response.json();

        const rate = data.conversion_rates.VND;
        const converted = (this.amount * rate).toFixed(2);
        this.result = `${this.amount} ${this.currency} = ${converted} VND`;
      } catch (error) {
        this.result = "Error fetching exchange rates.";
      }
    }
  }
};
</script>

<style scoped>
.converter {
  margin-top: 20px;
}
.converter input,
.converter select,
.converter button {
  padding: 10px;
  margin: 5px;
}
</style>
