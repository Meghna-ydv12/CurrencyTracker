const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const rateDisplay = document.getElementById('rateDisplay');
const rateText = document.getElementById('rateText');
const loader = document.getElementById('loader');

// Replace with your real API key!
const API_KEY = 'Z3TCZuF7S5Wnkec7PtqmhXk7blXx7V9L';

// Add more currencies if you wish!
const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY', 'CHF', 'SGD'];

function populateSelects() {
  currencyOptions.forEach(curr => {
    const opt1 = new Option(curr, curr);
    const opt2 = new Option(curr, curr);
    fromCurrency.add(opt1.cloneNode(true));
    toCurrency.add(opt2.cloneNode(true));
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

async function getExchangeRate() {
  const from = fromCurrency.value;
  const to = toCurrency.value;

  loader.style.visibility = 'visible';
  rateText.textContent = 'Fetching rate...';

  try {
    const res = await fetch(`https://api.apilayer.com/fixer/latest?base=${from}&symbols=${to}`, {
      headers: { apikey: API_KEY }
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const rate = data.rates[to];
    rateText.textContent = `Exchange Rate: 1 ${from} = ${rate.toFixed(4)} ${to}`;
  } catch (err) {
    rateText.textContent = 'Failed to fetch rate. Try again later!';
  } finally {
    loader.style.visibility = 'hidden';
  }
}

fromCurrency.addEventListener('change', getExchangeRate);
toCurrency.addEventListener('change', getExchangeRate);

populateSelects();
getExchangeRate();
