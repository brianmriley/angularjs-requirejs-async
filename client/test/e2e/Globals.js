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
 supplant: false
 */

"use strict";

var Globals = function() {

    this.supplant = function ( template, values, pattern ) {
        if ( !template ) {
            throw ( new Error( "Invalid data used for supplant's template." ) );
        }

        pattern = pattern || /\{([^\{\}]*)\}/g;

        return template.replace( pattern, function ( a, b ) {
            var p = b.split( "." ),
                r = values;

            try {
                // In IE8 for(var s in p) iterative twice even p.length is 1 which leads messup with data, so that I
                // have followed with general for loop which supports all browsers.
                //for(var s in p)
                for ( var s = 0; s < p.length; s++ ) {
                    r = r[ p[ s ] ];
                }
            } catch ( e ) {
                r = a;
            }

            return ( typeof r === "string" || typeof r === "number" ) ? r : typeof r;
        } );
    };
};

module.exports = new Globals();