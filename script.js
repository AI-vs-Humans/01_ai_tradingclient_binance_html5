const apiUrl = 'https://api.binance.com';

async function placeOrder(side) {
    const apiKey = document.getElementById('apiKey').value;
    const apiSecret = document.getElementById('apiSecret').value;
    const symbol = document.getElementById('symbol').value;
    const quantity = document.getElementById('quantity').value;

    const order = {
        symbol: symbol,
        side: side,
        type: 'MARKET',
        quantity: quantity,
        timestamp: Date.now()
    };

    const queryString = Object.keys(order).map(key => `${key}=${order[key]}`).join('&');
    const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString(CryptoJS.enc.Hex);

    const response = await axios.post(`${apiUrl}/api/v3/order?${queryString}&signature=${signature}`, null, {
        headers: {
            'X-MBX-APIKEY': apiKey
        }
    });

    alert(`Order placed: ${response.data}`);
}

function executeScript() {
    const scriptContent = document.getElementById('script').value;
    eval(scriptContent);
}
