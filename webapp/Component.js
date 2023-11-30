sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], (UIComponent, JSONModel) => {
    "use strict";
 
    //O Component.js vai ficar a cargo de inicializar a view do nosso app.
    //Esse arquivo fica encapsulado do nosso index.html
    //Agora, quem fica encarregado dos componentes da nossa UI é o Component.js
    return UIComponent.extend("WALKSAP.Component", {
       metadata : {
          interfaces: ["sap.ui.core.IAsyncContentCreation"],
          //essa linha irá referenciar o manifest 
          manifest: "json"
       },
 
       init() {
           UIComponent.prototype.init.apply(this, arguments);
            //-----------------------------------------------------------------------------
            //criamos os dados que vamos colocar no nosso model JSON
            const oData = {
                recipient : {
                name : "Julio Maçon"
                }
            };
            //para que o nosso modelo JSON apareça na view precisamos instanciar um obtejo JSONModel e setar ele na view
            //setamos o texto "world" no input da view, no arquivo xml colocamos no input usando {/recipient/name}
            const oModel = new JSONModel(oData);
            this.setModel(oModel);
            //-----------------------------------------------------------------------------

            // Criamos as views baseadas na url (devido ao routing feito no manifest.json)
			this.getRouter().initialize();
        }
    });
});
