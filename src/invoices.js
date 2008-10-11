var Blinksale = Blinksale || {};
Blinksale.Invoices = function() {
  $$('tr').each(function(element) {
    var element = $(element);
    var tag = element.childElements()[0].tagName;
    var field = new Element(tag, { "name": "converted_amount" });
    element.insert(field);
  });
};

// #select