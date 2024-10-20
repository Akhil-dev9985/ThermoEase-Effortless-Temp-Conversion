document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperatureInput');
    const unitSelect = document.getElementById('unitSelect');
    const convertBtn = document.getElementById('convertBtn');
    const celsiusResult = document.getElementById('celsiusResult');
    const fahrenheitResult = document.getElementById('fahrenheitResult');
    const kelvinResult = document.getElementById('kelvinResult');

    convertBtn.addEventListener('click', convertTemperature);
    temperatureInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            convertTemperature();
        }
    });

    function convertTemperature() {
        const temperature = parseFloat(temperatureInput.value);
        const fromUnit = unitSelect.value;

        if (isNaN(temperature)) {
            showError('Please enter a valid number');
            return;
        }

        const conversions = {
            celsius: {
                fahrenheit: (temp) => (temp * 9/5) + 32,
                kelvin: (temp) => temp + 273.15
            },
            fahrenheit: {
                celsius: (temp) => (temp - 32) * 5/9,
                kelvin: (temp) => (temp - 32) * 5/9 + 273.15
            },
            kelvin: {
                celsius: (temp) => temp - 273.15,
                fahrenheit: (temp) => (temp - 273.15) * 9/5 + 32
            }
        };

        const results = {
            celsius: fromUnit === 'celsius' ? temperature : conversions[fromUnit].celsius(temperature),
            fahrenheit: fromUnit === 'fahrenheit' ? temperature : conversions[fromUnit].fahrenheit(temperature),
            kelvin: fromUnit === 'kelvin' ? temperature : conversions[fromUnit].kelvin(temperature)
        };

        celsiusResult.innerHTML = `${results.celsius.toFixed(2)}<br>Celsius`;
        fahrenheitResult.innerHTML = `${results.fahrenheit.toFixed(2)}<br>Fahrenheit`;
        kelvinResult.innerHTML = `${results.kelvin.toFixed(2)}<br>Kelvin`;
    }

    function showError(message) {
        celsiusResult.innerHTML = message;
        fahrenheitResult.innerHTML = '';
        kelvinResult.innerHTML = '';
    }
});