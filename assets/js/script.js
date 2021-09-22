//function calls are commented out so the api keys aren't used every time we load the page
var testBtn = $("#test-btn");

testBtn.on("click", function(){
    var cryptoSelect = $("#user-crypto-name").val().trim();
    var currencySelect = $("#money-type").val().trim(); 
    var dateSelect = $("#crypto-date").val().trim();
    
    polygonOpenClose(cryptoSelect, currencySelect, dateSelect);
});


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
function polygonOpenClose(crypto, currency, date){   
    var apiKey = "HHLDi1tJ64VEg747dVDxQXa6RB8ezQZF";
    
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

// polygonOpenClose();


function coinLibGlobal() {
var apiKey = `adae3d665d605d5a`;
//variable for currency user selects. This will come from the input value on the webpage
//in the final product currency will be passed into the function as an argument
var currency = "EUR"
var coinlibGlobalURL = `https://coinlib.io/api/v1/global?key=${apiKey}&pref=${currency}`;

    fetch(coinlibGlobalURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}

// coinLibGlobal();


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

// coinLibCoinList();


function coinLibCoin() {
    var apiKey = `adae3d665d605d5a`;
    //in the final product currency and crypto will be passed into the function as arguments
    var currency = "EUR";
    var crypto = "BTC";

    var coinlibCoinURL = `https://coinlib.io/api/v1/coin?key=${apiKey}&pref=${currency}&symbol=${crypto}`;

    fetch(coinlibCoinURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

// coinLibCoin();