// API key for exchange rates
const api = `https://v6.exchangerate-api.com/v6/1fab355ae60277d2b3a8142d/latest/GBP/`

// Function to click convert button on enter key press
function enter() {
    var input = document.getElementById("amount");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("convert").click();
        }
    })
}

// Function for Currency Conversion
function convertCurrency() {

    // Gets the amount from user input
    var amount = document.getElementById('amount').value;

    // Gets the "to currency" from the user selection
    var toCurrency = document.getElementById('to-currency').value

    // Gets the "from currency" from the user selection
    var fromCurrency = document.getElementById('from-currency').value

    // Checks if the amount entered is a valid number
    if (amount == "" || amount == 0 || isNaN(amount)) {
        alert("Please enter a valid number");
        return;
    }

    // Checks If there are any manually set exchange rates
    const customRateER = `${fromCurrency} ${toCurrency}`;
    if (customRates[customRateER]) {
        let convertedAmount = amount * customRates[customRateER];
        document.getElementById("Result").innerHTML =
            `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency} <br>Exchange Rate: 1 ${fromCurrency} = ${customRates[customRateER]} ${toCurrency} `;
        return;
    }

    // FetchS exchange rates and calculateS converted amount
    fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
            let fromER = data.conversion_rates[fromCurrency];
            let toER = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromER) * toER;
            document.getElementById("Result").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency} <br>Exchange Rate: 1 ${fromCurrency} = ${toER} ${toCurrency} `;
        })
        // Displays popup alert and console message for errors in fetching exchange rates
        .catch((error) => {
            alert("Failed to fetch exchange rates. Please try again.");
            console.error("Error fetching exchange rates:", error);
        });

}

//Function to display exchange rate change form
function switcher() {
    var x = document.getElementById("exchange");
    // Displays the exchange rate form if it's hidden
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// variable to store manually assigned exchange rates
let customRates = {};

// Function for user to change exchange rates manually
function RateChange() {

    // Get the new rate from user input
    var rate = parseFloat(document.getElementById('rate').value);

    // Get the to currency from the user selection
    var toCurrency = document.getElementById('to-currency2').value

    // Get the from currency from the user selection
    var fromCurrency = document.getElementById('from-currency2').value

    // Check if the rate entered is a valid number
    if (rate == "" || rate <= 0 || isNaN(rate)) {
        alert("Please enter a valid exchange rate");
        return;
    }

    // Store the new exchange rate
    customRates[`${fromCurrency} ${toCurrency}`] = rate;

    //Hides exchange rate change form
    document.getElementById("exchange").style.display = "none";
    
    // Displays a popup alert of the exchange rate changes
    alert(`Exchange rate updated: 1 ${fromCurrency} = ${rate} ${toCurrency}`);
    console.log(customRates)
}
