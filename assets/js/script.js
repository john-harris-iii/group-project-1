//function calls are commented out so the api keys aren't used every time we load the page
// variables we will call throughout page
//juiceke vars
var cryptoSelect = $('#user-crypto-name');
var currencySelect = $('#money-type');
// john vars
var testBtn = $("#test-btn");
var historicTradesEl = document.querySelector("#historical-trades-actual");

testBtn.on("click", function(){
    var cryptoSelect = $("#user-crypto-name").val().toUpperCase().trim();
    var currencySelect = $("#money-type").val().toUpperCase().trim(); 
    var dateSelect = $("#crypto-date").val().trim();

    if(cryptoSelect !== "" && currencySelect !== "" && dateSelect !== ""){
        polygonOpenClose(cryptoSelect, currencySelect, dateSelect);
    }
    else{
        console.log("plz enter a date for history data");
    }
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
                historicData(data);
            })
        }
        else{
            console.log("your api sucks");
        }
    })
};

//function to put polygon historic info on page
function historicData(data){
    //create div to hold historic info
    var historicData = document.createElement("div");
    //variable to hold selected date
    var selectedDate = document.createElement("p");
    selectedDate.innerText = data.day
    historicData.appendChild(selectedDate);
    //variable to hold days opening price
    var openingPrice = document.createElement("p");
    openingPrice.innerText = "Opening Price: " + data.open
    historicData.appendChild(openingPrice);
    //variable to hold days closing price
    var closingPrice = document.createElement("p");
    closingPrice.innerText = "Closing Price: " + data.close;
    historicData.appendChild(closingPrice);
    //variable to hold the days price change
    var priceChange = document.createElement("p");
    priceChange.innerText = "Price Change: " + (data.close - data.open);
    historicData.appendChild(priceChange);
    //append historic info to html
    historicTradesEl.appendChild(historicData);
}


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
    var coinlibCoinListURL = `https://coinlib.io/api/v1/coinlist?key=${apiKey}&pref=BTC&page=1&order=rank_asc`;

    fetch(coinlibCoinListURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

// coinLibCoinList();


$('#test-btn').click(function coinLibCoin() {
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
        $('#currency-name').html(data.name + ' (' + data.show_symbol + ')')
        $('#currency-rank').html('Rank: ' + data.rank)
        $('#current-value').html('Current Value: $' + parseFloat(data.price).toFixed(2));
        $('#high-24hr').html('Highest Value in past 24hr: $' + parseFloat(data.high_24h).toFixed(2));
        if (data.delta_1h > 0) {
            $('#change-1h').html('Last Hour Change: +' + data.delta_1h + '%')
        }
        if (data.delta_1h < 0) {
            $('#change-1h').html('Last Hour Change: ' + data.delta_1h + '%')
            }
        if (data.delta_24h > 0) {
            $('#change-24h').html('Last 24hr Change: +' + data.delta_24h + '%')
        }
        if (data.delta_7d > 0) {
            $('#change-7d').html('Last 7d change: +' + data.delta_7d + '%')
        }
        if (data.delta_7d < 0) {
            $('#change-7d').html('Last 7d change: ' + data.delta_7d + '%')
            }
        if (data.delta_30d > 0) {
            $('#change-30d').html('Last 30d change: +' + data.delta_30d + '%')
        }
        if (data.delta_30d < 0) {
            $('#change-30d').html('Last 30d change: ' + data.delta_30d + '%')
        }
    })
})

//coinLibCoin();