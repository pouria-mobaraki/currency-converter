// https://v6.exchangerate-api.com/v6/c35a102dd1222df11580af86/latest/USD//

const fromAmountElem = document.querySelector('.amount')
const convertedAmountElem = document.querySelector('.converted-amount')
const fromCurrencyElem = document.querySelector('.from-currency')
const toCurrencyElem = document.querySelector('.to-currency')
const resultElem = document.querySelector('.result')
const converterContainer = document.querySelector('.converter-container')

//array to populate the select tags with these countries
const countries = [
    {code:'AED',name: 'United Arab Emirates Dirham'},
    {code:'ARS',name: 'Argentine Peso'},
    {code:'AUD',name: 'Austrlian Dollar'},
    {code:'BRL',name: 'Brazilian Real'},
    {code:'CAD',name: 'Canadian Dollar'},
     {code:'USD',name: 'United States Dollar'},
     {code:'CHF',name: 'Swiss Franc'},
     {code:'INR',name: 'Indian Rupee'},
     {code:'GBP',name: 'British Pound Sterling'},
     {code:'HKD',name: 'Hong Kong Dollar'},
     {code:'HRK',name: 'Croatian Kuna'},
     {code:'HUF',name: 'Hungarian Forint'},
     {code:'IDR',name: 'Indonesian Rupiah'},
     {code:'ILS',name: 'Israeli New Shekel'},
     {code:'ISK',name: 'Icelandic Krona'},
     {code:'JPY',name: 'Japanese Yen'},
     {code:'KRW',name: 'South Korean Won'},
     {code:'MXN',name: 'Mexican Peso'},
     {code:'MYR',name: 'Malaysian Ringgit'},
     {code:'NOK',name: 'Norwegian Krone'},
     {code:'NZD',name: 'New Zealand Dollar'},
     {code:'PEN',name: 'Peruvian Sol'},
     {code:'PHP',name: 'Ohlippine Peso'},
     {code:'PLN',name: 'Polish Zroty'},
     {code:'RON',name: 'Romanian Leu'},
     {code:'RUB',name: 'Russian Ruble'},
     {code:'SEk',name: 'Swedish Krona'},
     {code:'SGD',name: 'Singapore Dollar'},
     {code:'THB',name: 'Thai Baht'},
     {code:'TRY',name: 'Turkish Lira'},
     {code:'TWD',name: 'Taiwan New Dollar'},
     {code:'UAH',name: 'Ukrainian Hryvnia'},
     {code:'UYU',name: 'Urugayan Peso'},
     {code:'VND',name: 'Vietnam Dong'},
     {code:'ZAR',name: 'South African Rand'},
     {code:'EUR',name: 'Euro'},
     {code:'IRR',name: 'Iranian Rial'},
]

//showing countries from array to select tag
countries.forEach(country => {
    const option1 = document.createElement('option')
    const option2 = document.createElement('option')

    option1.value = option2.value = country.code
    option1.textContent = option2.textContent =` ${country.code} (${country.name})`

    fromCurrencyElem.appendChild(option1)
    toCurrencyElem.appendChild(option2)
    // setting default values of select tag
    fromCurrencyElem.value="USD"
    toCurrencyElem.value="EUR"
})

//function to get exchange rate using api
const getExchangeRate = async ()=>{
    const amount = parseFloat(fromAmountElem.value)
    const fromCurrency = fromCurrencyElem.value
    const toCurrency = toCurrencyElem.value
    resultElem.textContent='fetching.....'

    //fetch data from api//     // conversion_rates //
   await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
    console.log(data.rates);
    const conversionRate = data.rates[toCurrency]
    const convertedAmount = (amount*conversionRate).toFixed(2)
    if(typeof conversionRate === 'undefined',fromAmountElem.value ===''){
        resultElem.textContent ='Exchange rate data is not available'
        // convertedAmountElem=''
    }else{
        convertedAmountElem.value = convertedAmount

        resultElem.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
    }


    }).catch(err=>{
        converterContainer.innerHTML= `<h1>Error While Fetching Data!!!</h1>`
    })
   
}

fromAmountElem.addEventListener('input',getExchangeRate)
fromCurrencyElem.addEventListener('change',getExchangeRate)
toCurrencyElem.addEventListener('change',getExchangeRate)
window.addEventListener('load',getExchangeRate)



