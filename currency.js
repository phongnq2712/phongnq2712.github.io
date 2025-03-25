const currencyAPIKey = 'cbf6f683bd10c0457fe9f089';

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency-type').value;
    const url = `https://v6.exchangerate-api.com/v6/${currencyAPIKey}/latest/${currency}`;

    if (!amount) {
        document.getElementById('conversion-result').innerHTML = "Please enter an amount.";
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Currency data not found');
        const data = await response.json();
        const rate = data.conversion_rates.VND;
        const converted = (amount * rate).toFixed(2);
        document.getElementById('conversion-result').innerHTML = `${amount} ${currency} = ${converted} VND`;
    } catch (error) {
        document.getElementById('conversion-result').innerHTML = "Error fetching exchange rates.";
    }
}
