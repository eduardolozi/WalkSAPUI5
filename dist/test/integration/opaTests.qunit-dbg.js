QUnit.config.autostart = false;

sap.ui.getCore().attachInit(() => {
	"use strict";

	sap.ui.require([
        "WALKSAP/localService/mockserver",
        "WALKSAP/test/integration/NavigationJourney"
	], (mockserver) => {
        // initialize the mock server
        mockserver.init();
        QUnit.start();
	});
});