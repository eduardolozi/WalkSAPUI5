sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
 
    return Controller.extend("WALKSAP.controller.App", {
        onInit() {
            //vai aplicar a densidade de conteudo criado no component.js
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
    });
 });