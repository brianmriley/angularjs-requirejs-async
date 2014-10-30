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

describe("angularjs homepage", function() {
    it("should have a title", function() {
        browser.get("http://juliemr.github.io/protractor-demo/");

        expect(browser.getTitle()).toEqual("Super Calculator");
    });
});