sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], (Controller, History, MessageToast) => {
	"use strict";

	return Controller.extend("WALKSAP.controller.Detail", {
        // Aqui nós buscamos a instância do nosso router para conseguir acessar a rota da nossa view de detalhes
		onInit() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

        //Essa função vai pegar os parâmetros que foram mandados pello router e manda para a view details
		onObjectMatched(oEvent) {
            //essa linha reseta a avaliação dada a um produto, para que possa ser avaliado outro produto
            this.byId("rating").reset();
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		},

        //Vamos voltar para a pagina anterior clicando no botao de voltar
        onNavBack() {
            //Aqui pegamos a instância do nosso historico de navegacao e pegamos a anterior
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

            //se nao tiver uma anterior, quer dizer que o app foi aberto direto no Deitail            
            if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
        },

        onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value");
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});