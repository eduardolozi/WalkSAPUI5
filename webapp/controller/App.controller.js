sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], (Controller) => {
    "use strict";
 
    return Controller.extend("WALKSAP.controller.App", {
       onShowHello() {
          alert("Hello World");
       }
    });
 });