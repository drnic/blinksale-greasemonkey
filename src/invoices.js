var Blinksale = Blinksale || {};
Blinksale.Invoices = {};
Blinksale.Invoices.run = function() {
  $$('tr').each(function(currentRow) {
    var currentRow = $(currentRow);
    if (currentRow.previous() && 
        currentRow.previous().hasClassName('total')) return true; // this is blank row
        
    var tag = currentRow.childElements().first().tagName;
    var field = new Element(tag, { "name": "converted_amount" });
    if (tag == "TH") {
      field.update("Converted Amount");
    } else {
      field.update('...');
      var currency = Blinksale.Invoices.getCurrencyForCurrentRow(currentRow);
      console.log(currency);
    }
    currentRow.insert(field);
  });
};

Blinksale.Invoices.getCurrencyForCurrentRow = function(currentRow) {
  var totalRow = currentRow;
  var foundTotalRow = totalRow.hasClassName('total');
  while (!foundTotalRow) {
    var totalRow = currentRow.next();
    if (totalRow == null) break;
    var foundTotalRow = totalRow.hasClassName('total');
  }
  if (foundTotalRow) {
    var invoiceTotal = totalRow.select('td[name="invoice_total"]').first();
    var total = invoiceTotal.innerHTML.strip();
    var sectionCurrency = total.substring(0,3);
    return sectionCurrency;
  }
  return "USD"; // TODO - some default if cannot determine currency
};

// #select