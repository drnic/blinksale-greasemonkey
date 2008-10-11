var Blinksale = Blinksale || {};
Blinksale.ConversionRate = {};

// Converts an amount (100, '100' or '$100') from a currency ('USD')
// to another currency ('AUD') and stores the results within a DOM element.
// If the conversion rate is already available then the element
// is updated immediately. Otherwise, this method returns immediately, but
// the element update will occur when the conversion rate data is available.
// That is, this method is non-blocking.
Blinksale.ConversionRate.convertElement = function(element, amount, from, to) {
  
};

// Cache of rates already fetched
Blinksale.ConversionRate.rates = {};

Blinksale.ConversionRate.getRate = function(from, to) {
  if (Blinksale.ConversionRate.rates[from]) {
    return Blinksale.ConversionRate.rates[from][to];
  } else {
    return null;
  }
};

Blinksale.ConversionRate.setRate = function(from, to, amount) {
  Blinksale.ConversionRate.rates[from] = Blinksale.ConversionRate.rates[from] || {};
  Blinksale.ConversionRate.rates[from][to] = amount;
  Blinksale.ConversionRate.rates[to] = Blinksale.ConversionRate.rates[to] || {};
  Blinksale.ConversionRate.rates[to][from] = 1/amount;
};