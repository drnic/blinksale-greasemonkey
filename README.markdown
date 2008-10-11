# Greasemonkey/GreaseKit extensions for Blinksale

## WARNING

Currently only working on GreaseKit (Safari or Fluid apps) - I think Greasemonkey + Prototype (being reused from blinksale.com) aren't coexisting nicely.

## Description

A set of extensions to the Blinksale:

* Show invoice amounts converted to your own currency (defaults to AUD as target currency)

## Todo / Issues


## Requirements

For Safari or Fluid.app apps: requires [GreaseKit](http://8-p.info/greasekit/)
For Firefox: requires [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/748)

## Installation

To install to Safari:

    BROWSERS=safari rake install

To install to a Fluid.app wrapper app for Blinksale, say called 'Blinksale':

    BROWSERS=Blinksale rake install

## Unit tests

This extension is developed via TDD javascript unit tests. 

To run all of them against all your locally install browsers:

    rake test_units

Or specific browsers:

    BROWSERS=safari rake test_units

Or load individual test HTML files into a browser, such as `test/unit/blinksale_people_test.html` to run those tests.

Or run `script/js_autotest`, modify javascript or HTML test files and the tests will be automatically launched in Safari ([more info](http://drnicwilliams.com/2008/01/04/autotesting-javascript-in-rails/))

## Author

Dr Nic Williams, [http://drnicwilliams.com](http://drnicwilliams.com)
CEO, Mocra, [http://mocra.com](http://mocra.com) - the premier Rails/iPhone SDK consultancy