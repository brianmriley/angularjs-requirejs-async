// -----------------------------------------------------------------
// JSHint Globals
// -----------------------------------------------------------------
/*global
 beforeEach: false,
 browser: false,
 by: false,
 describe: false,
 expect: false,
 it: false,
 element: false,
 protractor: false
 */

"use strict";

describe("Balances E2E", function() {

    beforeEach(function() {
        console.log('here');
        browser.get("https://dcportal-loc.putnam.com:8890/#/balances");
    });

    it("should have a title `Balances & Investments`", function() {

        var item = $(".header .headerTitle");
        expect(item.getText()).toBe("Balances & Investments");
    });
});