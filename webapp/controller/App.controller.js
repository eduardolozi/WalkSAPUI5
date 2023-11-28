sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], (Controller, MessageToast, JSONModel, ResourceModel) => {
    "use strict";
 
    return Controller.extend("WALKSAP.controller.App", {
        onInit(){
            //set data model on view
            const oData = {
                recipient : {
                    name: "World"
                }
            }
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            const i18nModel = new ResourceModel({
                bundleName: "WALKSAP.webapp.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        onShowHello() {
            const oBundle = this.getView().getModel("i18n").getResourceBundle();
            const sRecipient = this.getView().getModel().getProperty("/recipient/name");
            const sMsg = oBundle.getText("helloMsg", [sRecipient]);            

            MessageToast.show("Hello World");
        }
    });
 });