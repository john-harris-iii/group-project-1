//function calls are commented out so the api keys aren't used every time we load the page
// variables we will call from previous 
var cryptoSelect = $('#user-crypto-name');
var currencySelect = $('#money-type');

// function that changes content of page depending on the option selected
$(document).on('change', '.toggle', function() {
    var option = $(this).data('target');
    var show = $("option:selected", this).data('show');
    $(option).children().addClass('hide');
    $(show).removeClass('hide');
  });
  $(document).ready(function(){
      $('.toggle').trigger('change');
  });
//function to fetch plolygon daily open/close prices for selected crypto
//in the final product the variables crypto, currency, and date will be passed into the function as arguments
function polygonOpenClose(){   
    var apiKey = "HHLDi1tJ64VEg747dVDxQXa6RB8ezQZF";
    //variable to hold name of crypto being searched. This will come from the input value on the webpage
    var crypto = "BTC";
    //variable to hold currency user wants crypto value as. This will come from the input value on the webpage
    var currency = "USD";
    //variable to hold the date the user wants the crypto prices from. This will come from the input value on the webpage
    var date = "2020-10-25";

    var openCloseUrl = "https://api.polygon.io/v1/open-close/crypto/" + crypto + "/" + currency + "/" + date + "?adjusted=true&apiKey=" + apiKey;

    fetch(openCloseUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
            })
        }
        else{
            console.log("you suck");
        }
    })
};

//polygonOpenClose();


function coinLibGlobal() {
var apiKey = `adae3d665d605d5a`;
//variable for currency user selects. This will come from the input value on the webpage
//in the final product currency will be passed into the function as an argument
var currency = "EUR"
var coinlibGlobalURL = 'https://coinlib.io/api/v1/global?key=' + apiKey + '&pref=' + currency;

    fetch(coinlibGlobalURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}

//coinLibGlobal();


function coinLibCoinList() {
    var apiKey = `adae3d665d605d5a`;
    var coinlibCoinListURL = `https://coinlib.io/api/v1/coinlist?key=${apiKey}&pref=BTC&page=1&order=volume_desc`;

    fetch(coinlibCoinListURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

//coinLibCoinList();


$('#btn').click(function coinLibCoin() {
    var apiKey = `adae3d665d605d5a`;
    //in the final product currency and crypto will be passed into the function as arguments
    var currency = currencySelect.val();
    var crypto = cryptoSelect.val();

    var coinlibCoinURL = `https://coinlib.io/api/v1/coin?key=${apiKey}&pref=${currency}&symbol=${crypto}`;

    fetch(coinlibCoinURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        $('#current-value').html('Current Value: $' + data.price);
        $('#high-24hr').html('Highest Value in past 24hr: $' + data.high_24h)
        $('#change-1h').html('Last Hour Change: ' + data.delta_1h + '%')
        $('#change-24h').html('Last 24hr Change: ' + data.delta_24h + '%')
        $('#change-7d').html('Last 7d change: ' + data.delta_7d + '%')
        $('#change-30d').html('Last 30d change: ' + data.delta_30d + '%')
    })
})

//coinLibCoin();