sap.ui.define([
	"WALKSAP/model/formatter",
	"sap/ui/model/resource/ResourceModel",
], (formatter, ResourceModel) => {
	"use strict";

	QUnit.module("Formatting functions", {});

	QUnit.test("Should return the translateds texts", (assert) => {
        const oResourceModel = new ResourceModel({
            bundleUrl: sap.ui.require.toUrl("WALKSAP/i18n/i18n_pt.properties"),
            supportedLocales: [
                ""
            ],
            fallbackLocale: ""
        });

        const oControllerMock = {
            getOwnerComponent() {
                return {
                    getModel() {
                        return oResourceModel;
                    }
                };
            }
        };

        const fnIsolatedFormatter = formatter.statusText.bind(oControllerMock);

        // Assert
        assert.strictEqual(fnIsolatedFormatter("A"), "Novo", "The long text for Status A is correct");
        assert.strictEqual(fnIsolatedFormatter("B"), "Em Progresso", "The long text for Status B is correct");
        assert.strictEqual(fnIsolatedFormatter("C"), "Concluído", "The long text for Status C is correct");
        assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for Status Foo is correct");
	});
});