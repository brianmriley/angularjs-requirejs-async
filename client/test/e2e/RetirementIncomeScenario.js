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
 protractor: false,
 supplant: false,
 $: false,
 $$: false
 */

"use strict";

var Globals = require("./Globals.js");

xdescribe("Retirement Income E2E", function() {

    var testName;

    beforeEach(function() {
        browser.get("https://dcportal-loc.putnam.com:8890/?debug=true&useMocks=true#/retirementIncome");
    });

    it("Should have a title `Monthly Retirement Income`", function() {

        var item = $(".header .headerTitle");
        expect(item.getText()).toBe("Monthly Retirement Income");
    });

    it("Should have expected default values when first hitting the view", function() {

        var item;

        item = element(by.id("monthlyGoalValue"));
        expect(item.getText()).toBe("$3,459");

        item = element(by.id("projectedIncomeValue"));
        expect(item.getText()).toBe("47,461");

        item = element(by.id("projectedGapValue"));
        expect(item.getText()).toBe("0");

        // NOTE: Could not get the label and value elements individually so testing both at the same time
        item = $("div#contributionRateSlider-container.sliderComponent div.sliderTitleBox.ng-binding");
        expect(item.getText()).toBe("Pre-tax contribution rate: 6%");

        // NOTE: Could not get the label and value elements individually so testing both at the same time
        item = $("div#retirementAgeSlider-container.sliderComponent div.sliderTitleBox.ng-binding");
        expect(item.getText()).toBe("Retirement age: 65");

        // NOTE: Could not get the label and value elements individually so testing both at the same time
        item = $("div#investmentMixSlider-container.sliderComponent div.sliderTitleBox.ng-binding");
        expect(item.getText()).toBe("Mix of equities/bonds: 60% / 40%");

        item = $(".cancelButton");
        expect(item.getText()).toBe("Reset");
        expect(item.getAttribute("disabled")).toBe("true");
        // NOTE: The following should work but doesn't: https://github.com/angular/protractor/issues/577
//        expect(item.isEnabled()).toBe(false);

        item = $(".continueButton");
        expect(item.getText()).toBe("Continue");
        expect(item.getAttribute("disabled")).toBe("true");

        /////////////////////////////////////////////////////////////////////////////////
        // Tests with unexpected selector outputs -- here for learning purposes
        /////////////////////////////////////////////////////////////////////////////////

        /*
        item = element(by.id("contributionRateSlider-container"));
        item = item.element(by.css(".sliderTitleBox .ng-binding"));
        expect(item.getText()).toBe("Pre-tax contribution rate: ");
        // Expected '6%' to be 'Pre-tax contribution rate: '.

        item = element.all(by.css(".sliderTitleBox .ng-binding")).get(0);
        expect(item.getText()).toBe("Pre-tax contribution rate: ");
        //  Expected '6%' to be 'Pre-tax contribution rate: '.

        item = element(by.css(".sliderTitleBox .ng-binding"));
        expect(item.getText()).toBe("Pre-tax contribution rate: ");
        // Expected '6%' to be 'Pre-tax contribution rate: '.

        item = $("div.sliderTitleBox.ng-binding");
        expect(item.getText()).toBe("Pre-tax contribution rate: ");
        //Expected 'Pre-tax contribution rate: 6%' to be 'Pre-tax contribution rate: '.
        */

    });

    describe("Projected Income Dropdown", function() {

        var current401k = "$46,972";
        var futureContributions = "$326";
        var futureCompanyMatch = "$163";

        testName = Globals.supplant("Should have 401k = {0}, future contributions = {1}, future company match = {2}", [
            current401k, futureContributions, futureCompanyMatch
        ]);
        it(testName, function() {

            var parent;
            var item;
            var detailTableRow;

            parent = $("div.switchButton.trigger-dropdown1");
            parent.click().then(function() {

                detailTableRow = $$(".ppt-projected-income-dropdown .detailTbody .detailTableRow");

                // test the current 401k balance value
                item = detailTableRow.get(0);
                item = item.element(by.css("div.col2.ng-binding"));
                expect(item.getText()).toBe(current401k);

                // test the future contributions value
                item = detailTableRow.get(1);
                item = item.element(by.css("div.col2.ng-binding"));
                expect(item.getText()).toBe(futureContributions);

                // test the future company match value
                item = detailTableRow.get(2);
                item = item.element(by.css("div.col2.ng-binding"));
                expect(item.getText()).toBe(futureCompanyMatch);
            });

        });

    });

    describe("Income Gap Dropdown", function() {

        var expected = "50% on the first 6%.";

        testName = Globals.supplant("Should have {0}", [
            expected
        ]);
        it(testName, function() {

            var parent;
            var item;

            parent = $("div.switchButton.trigger-dropdown2");
            parent.click().then(function() {

                item = $(".ppt-income-gap-dropdown");

                // test the income gap
                item = item.all(by.css(".headerExtensionDropdownContent")).get(0);
                expect(item.getText()).toBe(expected);
            });

        });

    });

    describe("Contribution Rate Right Slider Button", function() {

        var expected = "";

        it("Should have change the contribution rate and enable/disable the buttons", function() {

            var button;
            var item;

            button = element(by.id("contributionRateSlider-container"));
            button = button.element(by.css("div.rightSliderButton.sliderButton"));
            button.click().then(function() {

                expected = "Pre-tax contribution rate: 7%";
                item = $("div#contributionRateSlider-container.sliderComponent div.sliderTitleBox.ng-binding");
                expect(item.getText()).toBe(expected);

                item = $(".cancelButton");
                expect(item.getAttribute("disabled")).toBe(null);

                item = $(".continueButton");
                expect(item.getAttribute("disabled")).toBe(null);
            });

            button = element(by.id("contributionRateSlider-container"));
            button = button.element(by.css("div.leftSliderButton.sliderButton"));
            button.click().then(function() {

                expected = "Pre-tax contribution rate: 6%";
                item = $("div#contributionRateSlider-container.sliderComponent div.sliderTitleBox.ng-binding");
                expect(item.getText()).toBe(expected);

                item = $(".cancelButton");
                expect(item.getAttribute("disabled")).toBe("true");

                item = $(".continueButton");
                expect(item.getAttribute("disabled")).toBe("true");
            });

        });

    });


});





