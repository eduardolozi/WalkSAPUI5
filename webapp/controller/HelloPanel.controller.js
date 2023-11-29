sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], (Controller, MessageToast) => {
    "use strict";
 
    return Controller.extend("WALKSAP.controller.HelloPanel", {
        onShowHello() {
            //-----------------------------------------------------------------------------
            //O arquivo (pacote de recursos) i18n pode ser acessado usando esse método
            const oBundle = this.getView().getModel("i18n").getResourceBundle();
            //Aqui pegamos o conteúdo da propriedade nom do recipiente (input) da view
            const sRecipient = this.getView().getModel().getProperty("/recipient/name");
            //Pegamos o texto da nossa variavel helloMsg no nosso pacote de recursos e concatenamos com o conteudo do recipiente
            const sMsg = oBundle.getText("helloMsg", [sRecipient]);            
            //-----------------------------------------------------------------------------

            MessageToast.show(sMsg);
        },

        //cria o dialog de maneira lazy
        onOpenDialog() {
            this.pDialog ??= this.loadFragment({
                name: "WALKSAP.view.HelloDialog"
            });
            this.pDialog.then((oDialog) => oDialog.open());
        },

        onCloseDialog() {
            this.byId("helloDialog").close();
        }
    });
 });