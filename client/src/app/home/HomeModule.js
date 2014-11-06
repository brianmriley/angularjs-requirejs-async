/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Module definition for Home section.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "home/HomeConfig",
        "home/view/HomeController",
        "login/service/AuthenticationService"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "home/HomeModule", dependencies, function () {

        var HomeConfig = require( "home/HomeConfig" );
        var HomeController = require( "home/view/HomeController" );
        var AuthenticationService = require( "login/service/AuthenticationService" );

        var moduleName = "HomeModule";
        var moduleDependencies = [];

        // Definition of a PersonManager object
        var PersonManager = function ()
        {
            var fullNameSeparator = " ";

            return {
                setFullNameSeparator: function (separator)
                {
                    fullNameSeparator = separator;
                },
                $get: function (person)
                {
                    return {
                        getPersonFirstName: function ()
                        {
                            return person.firstName;
                        },
                        getPersonLastName: function ()
                        {
                            return person.lastName;
                        },
                        getPersonFullName: function ()
                        {
                            return person.firstName + fullNameSeparator + person.lastName;
                        }
                    };
                }
            };
        };

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.asyncModule( moduleName, moduleDependencies )
            .controller( "homeController", HomeController )
            .factory( "authenticationService", AuthenticationService)

            // Register an object instance as a value and name it "person"
            .value("person", {
                firstName: "",
                lastName: ""
            })
            // Register a provider with person management functions and name it "personManager".
            // This provider requires the "person" object instance registered as a value in the
            // "mainModule" and that instance is passed to the constructor through Dependency Injection
            // simply writing "person" (the name of the registered value) as parameter name.
            .provider("personManager", PersonManager)

            // Initial configuration of "mainModule". To get an instance of the "personManager" provider
            // we simply add a parameter to the configuration function with the "Provider" suffix after
            // the name of the registered provider (for the registered "personManager" provider instance
            // we must write "personManagerProvider").
            //.config(function (personManagerProvider)
            //{
            //    personManagerProvider.setFullNameSeparator("*");
            //})

            // The run phase of the "mainModule" could be useful for any initialization procedure.
            // We get a reference to the "person" object simply specifying it as a parameter in the
            // "run" function.
            .run(function (person) {
                person.firstName = "John";
                person.lastName = "Doe";
            });

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
