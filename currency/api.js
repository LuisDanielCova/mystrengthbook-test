var rest = require('restler');
var apiUrl = 'https://openexchangerates.org/api/';
var APP_ID = 'c45dde88452e4c8a8bc8eba812cb8eda';

var self = (module.exports = {
  ver001: (data, res) => {
    if (data.symbols && typeof data.symbols !== 'string') {
      self.sendResponse(res, 403, 'Please provide the symbols as a string');
      return;
    }

    var symbols = (data.symbols || '').toUpperCase();

    // validate that an amount is provided
    if (typeof data.amount === 'undefined' || data.amount === '') {
      self.sendResponse(res, 403, 'Please supply an amount to convert');
      return;
    }

    if (typeof data.date !== 'string') {
      self.sendResponse(res, 403, 'Please provide the date as a string');
      return;
    }    

    const dateValidator = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    if (!data.date.match(dateValidator)){
      self.sendResponse(res, 400, 'Please provide a valid date in the format: YYYY-MM-DD');
      return;
    }
    
    var date = data.date;

    // build the API call URL
    var url = apiUrl + "historical/" + date + '.json?&symbols=' + symbols + '&app_id=' + APP_ID;

    console.log('Calling OpenExchangeRates API at: ', url);

    rest.get(url).on('complete', function (result, response) {
      if (response.statusCode == 200) {
        var returns = {
          base: data.base,
          amount: data.amount,
          results: self.convertAmount(data.amount, result),
          dated: data.date,
        };

        self.sendResponse(res, 200, returns);
      }
      if (response.statusCode == 401) {
        callback('Not Authorized');
      }
      if (response.statusCode == 502) {
        callback('API Error');
      }
    });
  },

  ver002: (data, res) => {
    if (data.symbols && typeof data.symbols !== 'string') {
      self.sendResponse(res, 403, 'Please provide the symbols as a string');
      return;
    }

    const symbols = (data.symbols || '').toUpperCase();

    // validate that an amount is provided
    if (typeof data.amount === 'undefined' || data.amount === '') {
      self.sendResponse(res, 403, 'Please supply an amount to convert');
      return;
    }

    if (typeof data.date !== 'string') {
      self.sendResponse(res, 403, 'Please provide the date as a string');
      return;
    }    

    const dateValidator = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    if (!data.date.match(dateValidator)){
      self.sendResponse(res, 400, 'Please provide a valid date in the format: YYYY-MM-DD');
      return;
    }

    const date = data.date;

    // build the API call URL
    const url = `${apiUrl}historical/${date}.json?&symbols=${symbols}&app_id=${APP_ID}`;

    console.log(`Calling OpenExchangeRates API at: ${url}`);

    rest.get(url).on('complete', (result, response) => {
      if (response.statusCode == 200) {
        const returns = {
          base: data.base,
          amount: data.amount,
          results: self.convertAmount(data.amount, result),
          dated: data.date,
        };

        self.sendResponse(res, 200, returns);
      }
      if (response.statusCode == 401) {
        callback('Not Authorized');
      }
      if (response.statusCode == 502) {
        callback('API Error');
      }
    });
  },

  // Method to get all the currencies supported by OpenExchangeRates
  getCurrencies: (res) => {
    var url = apiUrl + "currencies.json";

    console.log('Calling OpenExchangeRates API at: ', url);

    rest.get(url).on("complete", function (result, response) {

      if (response.statusCode == 200){
        var returns = {
          currencies: Object.getOwnPropertyNames(result),
        }

        self.sendResponse(res, 200, returns);
      }

      if (response.statusCode == 405) {
        callback('Not Allowed');
      }

      if (response.statusCode == 502) {
        callback('API Error');
      }
    })
  },

  convertAmount: (amount, data) => {
    var rates = data.rates;
    var returns = [];

    for (var r in rates) {
      if (rates.hasOwnProperty(r)) {
        var convert = amount * rates[r];
        returns.push({
          from: data.base,
          to: r,
          roundedResult: convert.toFixed(2),
          fullResult: convert,
          rate: rates[r],
        });
      }
    }

    return returns;
  },

  sendResponse: (res, status, response) => {
    res.status(status);
    res.json(response);
    res.end();
  },
});
