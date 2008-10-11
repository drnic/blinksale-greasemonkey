// Dependent upon:
// * Blinksale.ConversionRate.convertElement(domElement, 'USD', 'AUD')
// * Blinksale.targetCurrency() -> 'AUD'

var Blinksale = Blinksale || {};
Blinksale.Invoices = {};
Blinksale.Invoices.run = function() {
  $$('tr').each(function(currentRow) {
    var currentRow = $(currentRow);
    if (currentRow.previous() && 
        currentRow.previous().hasClassName('total')) return true; // this is blank row
        
    var rowInvoiceTotal = currentRow.childElements().find(function(element) {
      return (element.readAttribute("name") == 'invoice_total');
    });
    var tag = rowInvoiceTotal.nodeName;
    if (tag == null || typeof tag == "undefined") {
      console.log(rowInvoiceTotal);
      return true;
    }
    var field = new Element(tag, { "name": "converted_amount" });
    currentRow.insert(field);
    if (tag == "TH") {
      field.update("Converted Amount");
    } else {
      field.update('...');
      var amount   = Blinksale.Invoices.getCleanAmount(rowInvoiceTotal);
      var currency = Blinksale.Invoices.getCurrencyForCurrentRow(currentRow);
      if (currency != null) {
        Blinksale.ConversionRate.convertElement(
          field,
          amount,
          currency, 
          Blinksale.targetCurrency());
      }
    }
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
  return null;
};

Blinksale.Invoices.getCleanAmount = function(element) {
  var results = element.innerHTML.strip();
  return results.match(/[\d\.\,]+/)[0].replace(",", "");
};