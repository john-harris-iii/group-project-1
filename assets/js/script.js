//function calls are commented out so the api keys aren't used every time we load the page
// variables we will call throughout page
//juiceke vars
var cryptoSelect = $('#user-crypto-name');
var currencySelect = $('#money-type');
var cryptoDate = $('#crypto-date')
// john vars
var testBtn = $("#test-btn");
var historicTradesEl = document.querySelector("#historical-trades-actual");
var tickerEl = document.querySelector("#tickers");
var tickerArr = JSON.parse(localStorage.getItem("ticker")) || [];
// tniemeye19 vars
var dropDownMenuEl = document.getElementById("menu-dd");
var rankedButtonBtn = document.getElementById("ranked-button");
var cardDividerInfo = document.querySelector(".divider-info");
var cardSectionInfo = document.querySelector(".section-info");


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
                historicData(data, date);
            })
        }
        else{
            console.log("your api sucks");
        }
    })
};

//function to put polygon historic info on page
function historicData(data, date){
    //create div to hold historic info
    var historicData = document.createElement("div");
    //variable to hold selected date
    var selectedDate = document.createElement("h4");;
    selectedDate.innerText = data.symbol + " " + date;
    cardDividerInfo.appendChild(selectedDate);
    //variable to hold days opening price
    var openingPrice = document.createElement("p");
    openingPrice.innerText = "Opening Price: " + (Math.round(data.open * 100) / 100);
    historicData.appendChild(openingPrice);
    //variable to hold days closing price
    var closingPrice = document.createElement("p");
    closingPrice.innerText = "Closing Price: " + (Math.round(data.close * 100) / 100);
    historicData.appendChild(closingPrice);
    //variable to hold the days price change
    var priceChange = document.createElement("p");
    priceChange.innerText = "Price Change: " + (Math.round((data.close - data.open) *100) / 100);
    historicData.appendChild(priceChange);
    //append historic info to html
    cardSectionInfo.appendChild(historicData);
}

// vontains content that will be made for the base of the page.
function homeDividerInfo() {
    // part for the divider info class
    // hold coin name
    var currentCoin = document.createElement('h4');
    $(currentCoin).attr('id', 'currency-name');
    cardDividerInfo.appendChild(currentCoin);
    // hold coin rank
    var currentRank = document.createElement('h4');
    $(currentRank).attr('id', 'currency-rank');
    cardDividerInfo.appendChild(currentRank);
}
function homeSectionInfo() {
    // part for the section info class

    // hold current value text 
    var currentValueText = document.createElement('p')
    $(currentValueText).attr('id', 'current-value');
    cardSectionInfo.appendChild(currentValueText);
    // hold high-24hr text
    var high24hText = document.createElement('p')
    $(high24hText).attr('id', 'high-24hr');
    cardSectionInfo.appendChild(high24hText)
    // hold last hour change text
    var hourChangeText = document.createElement('p')
    $(hourChangeText).attr('id', 'change-1h');
    cardSectionInfo.appendChild(hourChangeText);
    // hold last 24 hr change
    var twentyFourHourChangeText = document.createElement('p')
    $(twentyFourHourChangeText).attr('id', 'change-24h');
    cardSectionInfo.appendChild(twentyFourHourChangeText);
    // hold last 7 day change
    var sevenDayChangeText = document.createElement('p')
    $(sevenDayChangeText).attr('id', 'change-7d');
    cardSectionInfo.appendChild(sevenDayChangeText);
    // hold last 30 day change
    var thirtyDayChangeText = document.createElement('p')
    $(thirtyDayChangeText).attr('id', 'change-30d');
    cardSectionInfo.appendChild(thirtyDayChangeText);
    
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
    var apiKey = 'adae3d665d605d5a';
    //in the final product currency and crypto will be passed into the function as arguments
    var currency = currencySelect.val();
    var crypto = cryptoSelect.val();

    var coinlibCoinURL = `https://coinlib.io/api/v1/coin?key=${apiKey}&pref=${currency}&symbol=${crypto}`;

    fetch(coinlibCoinURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        coinInfo(data);
        tickerData(data);
    })
})

//moved David's code to append data to main page into it's own function 
function coinInfo(data){
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
    if (data.delta_24h < 0) {
        $('#change-24h').html('Last 24hr Change: ' + data.delta_24h + '%')
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
}

function tickerData(data){
var symbol = data.symbol;
var price = data.price;
var change = data.delta_1h;

  cryptoTicker(symbol, price, change);
   
 }

//function to create crypto ticker and append to page
function cryptoTicker(symbol, price, change){

    if(tickerEl.children.length < 3){
        tickerArr.push([symbol, price, change])
        var tickerDiv = document.createElement("div");
        tickerDiv.style.backgroundColor = "#3f3f3f";
        tickerDiv.style.color = "white";
        tickerDiv.style.padding = "2px"
        tickerDiv.style.margin = "2px 0 2px 0"
        var tickerTitle = document.createElement("h4");
        tickerTitle.innerText = symbol;
        tickerDiv.appendChild(tickerTitle);
        var tickerPrice = document.createElement("p");
        tickerPrice.innerText = (Math.round(price * 100) / 100);
        tickerDiv.appendChild(tickerPrice);
        var tickerChange = document.createElement("p");
        tickerChange.innerText = change + "%";
        tickerDiv.appendChild(tickerChange);

        tickerEl.appendChild(tickerDiv);
    }
    tickerSave();
}

//function to save tickers to localStorage
function tickerSave(){
    localStorage.setItem("ticker", JSON.stringify(tickerArr));
}

//function to load tickers from localStorage
function tickerLoad(){
    var tickers = localStorage.getItem("ticker");

    if(!tickers){
        tickers = [];
        return false
    }

    tickers = JSON.parse(tickers);

    tickers.forEach(function(info){
        var tickerDiv = document.createElement("div");
        tickerDiv.style.backgroundColor = "#3f3f3f";
        tickerDiv.style.color = "white";
        tickerDiv.style.padding = "2px"
        tickerDiv.style.margin = "2px 0 2px 0"
        var tickerTitle = document.createElement("h4");
        tickerTitle.innerText = info[0];
        tickerDiv.appendChild(tickerTitle);
        var tickerPrice = document.createElement("p");
        tickerPrice.innerText = (Math.round(info[1] * 100) / 100);
        tickerDiv.appendChild(tickerPrice);
        var tickerChange = document.createElement("p");
        tickerChange.innerText = info[2] + "%";
        tickerDiv.appendChild(tickerChange);

        tickerEl.appendChild(tickerDiv);
    })
};

function rankedListAccordion() {
    var apiKey = `adae3d665d605d5a`;

    var rankedListURL = `https://coinlib.io/api/v1/coinlist?key=${apiKey}&page=1&order=rank_asc`

    fetch(rankedListURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        console.log(data.coins.length)

        // Ranked List div (to be put in as title for card)
        var rankedListTitleEl = document.createElement("h4");
        rankedListTitleEl.setAttribute("id", "ranked-list-title");
        rankedListTitleEl.innerHTML = "Ranked List";
        $(".divider-info").append(rankedListTitleEl);

        // Ranked List div (to be put in as info for card)
        var rankedListActualEl = document.createElement("div");
        rankedListActualEl.setAttribute("id", "ranked-list-actual");
        $(".section-info").append(rankedListActualEl);

        // ACCORDION LIST (ul element)
        var accordion_ul = document.createElement("ul");
        accordion_ul.setAttribute("class", "accordion");
        accordion_ul.setAttribute("data-accordion", "");
        accordion_ul.setAttribute("data-allow-all-closed", "true");
        rankedListActualEl.appendChild(accordion_ul);

        for (var i = 0; i <= (data.coins.length - 1); i++) {
            // Initialize variables in order to get appropriate data from fetch
            var singleCoinRank = data.coins[i].rank;
            var singleCoinName = data.coins[i].name;
            var singleCoinSymbol = data.coins[i].symbol; 
            var singleCoinPrice = data.coins[i].price;
            var singleCoin24hrChange = data.coins[i].delta_24h;
            var singleCoinVolume = data.coins[i].volume_24h; 
            var singleCoinMarketCap = data.coins[i].market_cap;  

            // Initialize variables. These create the format for the accordion list for foundation css.
            var accordion_li = document.createElement("li");
            var accordion_a = document.createElement("a");
            var accordion_a_span = document.createElement("span");
            var accordion_div_main = document.createElement("div");
            var accordion_div_text = document.createElement("div");
            var accordion_div_vars = document.createElement("div");
            var coinSymbolP = document.createElement("p"); 
            var coinSymbolP_Span = document.createElement("span");
            var coinPriceP = document.createElement("p");
            var coinPriceP_Span = document.createElement("span");
            var coin24hrChangeP = document.createElement("p");
            var coin24hrChangeP_Span = document.createElement("span");
            var coinVolumeP = document.createElement("p"); //Total value of crypto traded in the past 24hrs - not done
            var coinVolumeP_Span = document.createElement("span");
            var coinMarketCapP = document.createElement("p"); //Total value of all coins mined - not done
            var coinMarketCapP_Span = document.createElement("span");

            // ACCORDION ITEM (li element)
            accordion_li.classList.add("accordion-item");
            accordion_li.classList.add("index_li" + i);
            accordion_li.setAttribute("data-accordion-item", "");
            $(".accordion").append(accordion_li);
            
            // ACCORDION TITLE (a element) Coin Rank
            accordion_a.setAttribute("href", "#");
            accordion_a.classList.add("accordion-title");
            accordion_a.classList.add("coin-rank");
            accordion_a.classList.add("index_a" + i);
            accordion_a.innerHTML = singleCoinRank + ". ";
            $(".index_li" + i).append(accordion_a);
            
            // ---- SPAN FOR Coin Rank (inputs Coin Name)
            accordion_a_span.setAttribute("class", "coin-title");
            accordion_a_span.innerHTML = singleCoinName;
            $(".index_a" + i).append(accordion_a_span);
            
            // ACCORDION CONTENT (div element) main
            accordion_div_main.classList.add("accordion-content");
            accordion_div_main.classList.add("acc_div_main");
            accordion_div_main.classList.add("index_div_main" + i);
            accordion_div_main.setAttribute("data-tab-content", "");
            $(".index_li" + i).append(accordion_div_main);
            
            // ACCORDION CONTENT (div element) text
            accordion_div_text.classList.add("accordion-content");
            accordion_div_text.classList.add("acc_div_text");
            accordion_div_text.classList.add("index_div_text" + i);
            accordion_div_text.setAttribute("data-tab-content", "");
            $(".index_div_main" + i).append(accordion_div_text);
            
            // ACCORDION CONTENT (div element) vars
            accordion_div_vars.classList.add("accordion-content");
            accordion_div_vars.classList.add("acc_div_vars");
            accordion_div_vars.classList.add("index_div_vars" + i);
            accordion_div_vars.setAttribute("data-tab-content", "");
            $(".index_div_main" + i).append(accordion_div_vars);
            
            var accordion_div_clear = document.createElement("div");
            accordion_div_clear.classList.add("clear");
            $(".index_li" + i).append(accordion_div_clear);
            
            // ACCORDION CONTENT (p element) Coin Symbol
            coinSymbolP.classList.add("coin-symbol-text");
            coinSymbolP.classList.add("index_symbol" + i);
            coinSymbolP.innerHTML = "Symbol:";
            $(".index_div_text" + i).append(coinSymbolP);
            
            // ACCORDION CONTENT (p element) Coin Price
            coinPriceP.classList.add("coin-price-text");
            coinPriceP.classList.add("index_price" + i);
            coinPriceP.innerHTML = "Current Price: ";
            $(".index_div_text" + i).append(coinPriceP);
            
            // ACCORDION CONTENT (p element) Coin 24hr Change
            coin24hrChangeP.classList.add("coin-24hr-change-text");
            coin24hrChangeP.classList.add("index_change" + i);
            coin24hrChangeP.innerHTML = "Change 24hr:";
            $(".index_div_text" + i).append(coin24hrChangeP);
            
            // ACCORDION CONTENT (p element) Coin Volume
            coinVolumeP.classList.add("coin-volume-text");
            coinVolumeP.classList.add("index_volume" + i);
            coinVolumeP.innerHTML = "Coin Vol Last 24hr:";
            $(".index_div_text" + i).append(coinVolumeP);
            
            // ACCORDION CONTENT (p element) Coin Market Cap
            coinMarketCapP.classList.add("coin-market-cap-text");
            coinMarketCapP.classList.add("index_marketcap" + i);
            coinMarketCapP.innerHTML = "Market Cap:";
            $(".index_div_text" + i).append(coinMarketCapP);
            
            // ---- SPAN FOR Coin Symbol
            coinSymbolP_Span.classList.add("coin-symbol-value");
            coinSymbolP_Span.innerHTML = singleCoinSymbol;
            $(".index_div_vars" + i).append(coinSymbolP_Span);
            
            // ---- SPAN FOR Coin Price
            coinPriceP_Span.classList.add("coin-price-value");
            var d_singleCoinPrice = parseFloat(singleCoinPrice).toFixed(2);
            var cd_singleCoinPrice = d_singleCoinPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            coinPriceP_Span.innerHTML = "$" + cd_singleCoinPrice;
            $(".index_div_vars" + i).append(coinPriceP_Span);
            
            // ---- SPAN FOR Coin 24hr Change
            coin24hrChangeP_Span.classList.add("coin-24hr-change-value");
            coin24hrChangeP_Span.classList.add("index_change_value" + i);
            var d_singleCoin24hrChange = parseFloat(singleCoin24hrChange).toFixed(2);
            var cd_singleCoin24hrChange = d_singleCoin24hrChange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            coin24hrChangeP_Span.innerHTML = cd_singleCoin24hrChange + "%";
            $(".index_div_vars" + i).append(coin24hrChangeP_Span);
            // SPAN FOR Coin 24hr Change Main Style
            if (singleCoin24hrChange >= 0) {
            
                coin24hrChangeP_Span.classList.add("span_positive");
            } else {
                coin24hrChangeP_Span.classList.add("span_negative");
            }
            
            // ---- SPAN FOR Coin Volume
            coinVolumeP_Span.classList.add("coin-volume-value");
            var d_singleCoinVolume = parseFloat(singleCoinVolume).toFixed(2);
            var cd_singleCoinVolume = d_singleCoinVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            coinVolumeP_Span.innerHTML = cd_singleCoinVolume;
            $(".index_div_vars" + i).append(coinVolumeP_Span);
            
            // ---- SPAN FOR Coin Market Cap
            coinMarketCapP_Span.classList.add("coin-market-cap-value");
            var d_singleCoinMarketCap = parseFloat(singleCoinMarketCap).toFixed(2);
            var cd_singleCoinMarketCap = d_singleCoinMarketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");               coinMarketCapP_Span.innerHTML = "$" + cd_singleCoinMarketCap;
            $(".index_div_vars" + i).append(coinMarketCapP_Span);
        }
        // Style from foundation script call has to be called AFTER format is implemented in order for accordion to work.
        $(document).foundation();

        // Credit for commas in numbers: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    })
}

$("#menu-dd").on("change", function () {
    if ($(this).val() === "home") {
        // Clear content so new content can be placed
        cardDividerInfo.innerHTML = "";
        cardSectionInfo.innerHTML = "";
        cryptoDate.val('');
        homeDividerInfo();
        homeSectionInfo();
    }
    else if ($(this).val() === "ranked-list") {
        // Clear content so new content can be placed
        cardSectionInfo.innerHTML = '';
        cardDividerInfo.innerHTML = '';
        rankedListAccordion();
    }
    else if ($(this).val() === "historical-trades") {
        // Clear content so new content can be placed
        cardDividerInfo.innerHTML = "";
        cardSectionInfo.innerHTML = "";
        historicData();
    }
}) 

tickerLoad();