/**
 * @docType function
 * @ngDoc util
 * @name app.util:StringUtil
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Investments Inc.
 * @description
 *
 * String supplant global utility (similar to but more powerful than sprintf() ).
 * Usages:
 *
 *      var user = {
 *              first : "John",
 *              last  : "Doe",
 *              address : {
 *                  city : "Key West",
 *                  state: "Florida"
 *              },
 *              contact : {
 *                  email : "john.doe@Gmail.com"
 *                  url   : "http://www.johndoe.info"
 *              }
 *          },
 *          message = "Hello Mr. {first} {last}. How's life in {address.city}, {address.state} ?";
 *
 *     return supplant( message, user );
 *
 */
( function () {
    "use strict";

    define( "util/StringUtil", [], function () {
        //-----------------------------------------------------------------------
        // CONSTANTS
        //-----------------------------------------------------------------------
        var INVALID_DATA = "Undefined template provided";

        /**
         * @description
         * supplant() method from Crockfords `Remedial Javascript`
         * @ngdoc method
         * @name app.util:supplant#constructor
         * @methodOf app.util:supplant
         *
         * @param {object} template The template
         * @param {object} values The values
         * @param {object} [optionalParam] pattern The pattern
         * @returns {object} promise
         * type {directive.replace|*|replace|string|ng.$location.replace}
         */
        var supplant = function ( template, values, pattern ) {
            if ( !template ) {
                throw ( new Error( INVALID_DATA ) );
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

        //		// supplant() method from Crockfords `Remedial Javascript`
        //		Function.prototype.method = function (name, func)
        //		{
        //			this.prototype[name] = func;
        //			return this;
        //		};
        //
        //		String.method("supplant", function (values, pattern)
        //		{
        //			var self = this;
        //			return supplant(self, values, pattern);
        //		});

        // Publish this global function...
        //		return String.supplant = supplant;

        return {
            supplant: supplant
        };

    } );

}() );
