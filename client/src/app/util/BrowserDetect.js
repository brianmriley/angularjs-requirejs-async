/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Used to detect browser versions.
 */
( function ( navigator ) {
    "use strict";

    define( "util/BrowserDetect", [], function () {
        var BrowserDetect = {

            //-----------------------------------------------------------------------
            // CONSTANTS
            //-----------------------------------------------------------------------
            INVALID_DATA: "Invalid data provided",

            /**
             * @ngdoc method
             * @name app.utils:BrowserDetect#init
             * @methodOf app.util:BrowserDetect
             * @description
             * Sets the browser version and OS(Operating Systems) uses {@link app.util:BrowserDetect#searchString searchString}
             * and {@link app.util:BrowserDetect#searchVersion searchVersion} internally
             */
            init: function () {
                this.browser = this.searchString( this.dataBrowser ) || "An unknown browser";
                this.version = this.searchVersion( navigator.userAgent ) || this.searchVersion( navigator.appVersion ) ||
                    "an unknown version";
                this.OS = this.searchString( this.dataOS ) || "an unknown OS";

                return BrowserDetect;
            },

            /**
             * @ngdoc method
             * @name app.utils:BrowserDetect#isIE8
             * @methodOf app.util:BrowserDetect
             * @description
             * Checks whether the browser is IE8. Root element(html) is already set with class='ie8
             * this function uses the same class reference and provides the status.
             */
            isIE8: function () {
                if ( document.documentElement.hasAttribute( "class" ) && document.documentElement.getAttribute(
                        "class" ) === "ie8" ) {
                    return true;
                }
                return false;
            },

            /**
             * @ngdoc method
             * @name app.utils:BrowserDetect#searchString
             * @methodOf app.util:BrowserDetect
             * @param {string} data contains data.string or data.prop which would be used for searching
             * @returns {string} matched data
             * @description
             * User for determining the browser and OS based on the input provided by the data param.
             * Also sets the versionSearchString parameter which would be used by
             * {@link app.util:BrowserDetect#searchVersion searchVersion}
             */
            searchString: function ( data ) {
                if ( !data || !( isNaN( data ) ) ) {
                    throw ( new Error( this.INVALID_DATA ) );
                }

                for ( var i = 0; i < data.length; i++ ) {
                    var dataString = data[ i ].string;
                    var dataProp = data[ i ].prop;

                    this.versionSearchString = data[ i ].versionSearch || data[ i ].identity;
                    if ( dataString ) {
                        if ( dataString.indexOf( data[ i ].subString ) !== -1 ) {
                            return data[ i ].identity;
                        }
                    } else if ( dataProp ) {
                        return data[ i ].identity;
                    }
                }
            },

            /**
             * @ngdoc method
             * @name app.utils:BrowserDetect#searchVersion
             * @methodOf app.util:BrowserDetect
             * @param {string} dataString string used for looking up versionSearchString setup in
             * {@link app.util:BrowserDetect#searchString searchString}
             * @returns {float} Browser version
             * @description
             * User for determining the browser version based on input string
             */
            searchVersion: function ( dataString ) {
                if ( !dataString || !( isNaN( dataString ) ) ) {
                    throw ( new Error( this.INVALID_DATA ) );
                }
                var index = dataString.indexOf( this.versionSearchString );

                if ( index === -1 ) {
                    return;
                }

                return parseFloat( dataString.substring( index + this.versionSearchString.length + 1 ) );
            },

            // NOTE: It's important to list PhantomJS first since it has the same browser information as Safari
            dataBrowser: [ {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            }, {
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            }, {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            }, {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            }, {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            }, {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            }, {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            }, {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            }, { // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            }, {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            }, {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Internet Explorer",
                versionSearch: "rv"
            }, {
                // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }, {
                string: "PhantomJS",
                subString: "PhantomJS",
                identity: "PhantomJS",
                versionSearch: "PhantomJS"
            } ],
            dataOS: [ {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            }, {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            }, {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            }, {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            } ]

        };

        return BrowserDetect.init();
    } );

} )( window.navigator );
