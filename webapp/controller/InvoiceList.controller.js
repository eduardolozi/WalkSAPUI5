sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("WALKSAP.controller.InvoiceList", {
        formatter: formatter,
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

        onFilterInvoices(oEvent) {
            // criamos o array dos filtros (pois pode ter mais de um filtro)
            //inicializa o array como vazio, pois se o user nao digitar nada, é para mostrar tds os itens
			const aFilter = [];
            //atribuímos o que o user digitou acessando o parametro query que o evento search do searchField possui
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
                //se o user tiver digitado algo, add um filtro de nome para nosso array
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// pegamos a nossa lista da view que possui o id invoiceList
			const oList = this.byId("invoiceList");
            // pegamos os itens da nossa lista, temos a propriedade items na nossa List na view com todos os itens
			const oBinding = oList.getBinding("items");
            //filtramos os itens da lista conforme o nosso filtro
			oBinding.filter(aFilter);
        },

        onPress(oEvent) {
            //The control instance that has been interacted with can be accessed by the getSource 
            //Will return the ObjectListItem
            const oItem = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            })
        }
	});
});