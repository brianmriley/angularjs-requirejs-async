/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Simple URL query string utility that's framework independent.
 */
( function () {
    "use strict";

    var dependencies = [];

    define( "util/URLUtil", dependencies, function () {
        /**
         * Get value of URL param
         * http://url?param1=true&param2=true
         *
         * getURLParam returns true
         * @param {Object} key
         */
        var getURLParam = function ( key ) {
            var urlParams = getParams();
            if ( urlParams ) {
                return getParamValue( urlParams, key );
            }

            return null;
        };

        /**
         * Check for params and return set of params for an url
         */
        var getParams = function () {
            var queryString = window.location.search.substring( 1 );

            if ( queryString.length > 0 ) {
                return queryString;
            }

            return false;
        };

        /**
         * Utility function to get a particular parameter from list of params
         * @param {Object} params
         * @param {Object} key
         */
        var getParamValue = function ( params, key ) {
            if ( params && key ) {
                var paramArray = params.split( "&" );
                for ( var i = 0; i < paramArray.length; i++ ) {
                    var param = paramArray[ i ].split( "=" );
                    if ( param[ 0 ] === key ) {
                        return param[ 1 ];
                    }
                }
            }
            return null;
        };

        var IURLUtils = {
            getURLParam: getURLParam,
            getAllUrlParams: getParams
        };

        return IURLUtils;
    } );

}() );
