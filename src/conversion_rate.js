var Blinksale = Blinksale || {};
Blinksale.ConversionRate = {};

// Converts an amount (100, '100' or '$100') from a currency ('USD')
// to another currency ('AUD') and stores the results within a DOM element.
// If the conversion rate is already available then the element
// is updated immediately. Otherwise, this method returns immediately, but
// the element update will occur when the conversion rate data is available.
// That is, this method is non-blocking.
Blinksale.ConversionRate.convertElement = function(element, from, to, amount) {
  var rate = Blinksale.ConversionRate.getRate(from, to);
  
  if (rate) {
    var conversion = rate * amount;
    $(element).update(conversion);
  } else {
    $(element).addClassName(from + "-" + to).update(amount);
    Blinksale.ConversionRate.fetchRate(from, to);
  }
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
  var className = from + "-" + to;
  $$("." + className).each(function(element) {
    var element = $(element);
    element.update(parseFloat(element.innerHTML) * amount);
    element.removeClassName(className);
  });
};

// http://pipes.yahoo.com/pipes/pipe.run?_id=PjPSgA322xGoVnhwJZhxuA&_render=json&fromCurrencyCode=USD&toCurrencyCode=AUD
Blinksale.ConversionRate.fetchRate = function(from, to) {
  var url = "http://pipes.yahoo.com/pipes/pipe.run?" +
    "_id=PjPSgA322xGoVnhwJZhxuA" +
    "&_render=json&fromCurrencyCode=" + from + 
    "&toCurrencyCode=" + to + 
    "&_callback=Blinksale.ConversionRate.callback";
  Blinksale.ConversionRate.requestContent(url);
};

Blinksale.ConversionRate.requestContent = function(url) {
  var script  = document.createElement('script');
  script.src  = url;
  script.type = "text/javascript"
  document.getElementsByTagName('head')[0].appendChild(script);
};

Blinksale.ConversionRate.callback = function(data) {
  var conversion = data.value.items[0];
  var currencies = conversion['y:title'].match(/1\s(\w+)\s\=\s(\w+)/);
  var from       = currencies[1];
  var to         = currencies[2];
  Blinksale.ConversionRate.setRate(from, to, parseFloat(conversion.title));
};