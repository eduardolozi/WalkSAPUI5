sap.ui.define(["sap/ui/core/util/MockServer"],e=>{"use strict";return{init:()=>{const r=new e({rootUri:sap.ui.require.toUrl("WALKSAP")+"/V2/Northwind/Northwind.svc/"});const t=new URLSearchParams(window.location.search);e.config({autoRespond:true,autoRespondAfter:t.get("serverDelay")||500});const o=sap.ui.require.toUrl("WALKSAP/localService");r.simulate(o+"/metadata.xml",o+"/mockdata");r.start()}}});
//# sourceMappingURL=mockserver.js.map