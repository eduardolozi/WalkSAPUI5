/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/fetch","./_utils"],function(e,n){"use strict";function t(e){return Array.isArray(e)?e:[e]}function i(e){return new Promise(function(n,i){sap.ui.require(t(e),function(){n(Array.prototype.slice.call(arguments))},i)})}function r(e,n,t){if(n){for(var i in n){if(Object.hasOwn(t,i)){e[i]=n[i]}}}return e}function o(){function e(e){if(document.body.querySelector("#"+e)==null){var n=document.createElement("div");n.id=e;document.body.insertBefore(n,document.body.firstChild)}}return n.whenDOMReady().then(function(){e("qunit");e("qunit-fixture")})}function u(e){var n=e.sourceFile+":"+e.lineNumber+":"+e.columnNumber,t="Security policy violation: directive '"+e.violatedDirective+"'";if(e.blockedURI){t+=" violated by '"+String(e.blockedURI).slice(0,20)+"'"}if(QUnit.config.current){QUnit.pushFailure(t,n)}else{throw new Error(t+" at "+n)}}var a={altertitle:1,collapse:1,filter:1,fixture:1,hidepassed:1,maxDepth:1,module:1,moduleId:1,notrycatch:1,noglobals:1,seed:1,reorder:1,requireExpects:1,testId:1,testTimeout:1,scrolltop:1};function s(e,n){var t=e.versions;var i=e.version||null;while(typeof i!=="object"){if(!Object.hasOwn(t,i)){throw new TypeError("unsupported "+n+" version "+e.version)}i=t[i]}return i}function c(t){var c,l,f,d,p,h,v,g,m;document.title=t.title;if(t.loader){sap.ui.loader.config(t.loader)}if(t.runAfterLoader){c=i(t.runAfterLoader)}else{c=Promise.resolve()}g=s(t.qunit,"qunit");if(g!=null){window.QUnit=window.QUnit||{};QUnit.config=QUnit.config||{};if(t.qunit!=null&&typeof t.qunit==="object"){r(QUnit.config,t.qunit,a)}QUnit.config.autostart=false;l=c.then(function(){return i("sap/ui/test/qunitPause")}).then(function(){n.addStylesheet(g.css);return i(g.module)}).then(function(){m=[];QUnit.jUnitDone=function(e){m.push(e)};return i("sap/ui/qunit/qunit-junit")}).then(function(){delete QUnit.jUnitDone;return i("sap/ui/thirdparty/qunit-reporter-junit")}).then(function(){m.forEach(function(e){QUnit.jUnitDone(e)});m=undefined})}var b=s(t.sinon,"sinon");if(b!=null){f=c.then(function(){return i(b.module)});if(t.sinon.qunitBridge&&l){d=Promise.all([l,f]).then(function(){return i(b.bridge)})}if(t.sinon!=null&&typeof t.sinon==="object"){p=Promise.all([f,d]).then(function(){sinon.config=r(sinon.config||{},t.sinon,sinon.defaultConfig);return arguments})}}else if(g!=null){sap.ui.loader.config({shim:{"sap/ui/thirdparty/sinon-qunit":{deps:[g.module,"sap/ui/thirdparty/sinon"]},"sap/ui/qunit/sinon-qunit-bridge":{deps:[g.module,"sap/ui/thirdparty/sinon-4"]}}})}h=l.then(function(){if(QUnit.urlParams.coverage===undefined){return{}}if(t.coverage.instrumenter==="blanket"){return{instrumenter:"blanket"}}return e("/.ui5/coverage/ping").then(function(e){if(e.status>=400&&t.coverage.instrumenter!=="istanbul"){return{instrumenter:"blanket"}}else if(e.status>=400){return{instrumenter:null,error:"Istanbul is set as instrumenter, but there's no middleware"}}else{return{instrumenter:"istanbul"}}})}).then(function(e){if(!e.instrumenter){return e}if((QUnit.urlParams["coverage-mode"]||e.instrumenter==="blanket")&&QUnit.urlParams["coverage-mode"]!==e.instrumenter){var n=new URL(window.location.href);n.searchParams.set("coverage","true");n.searchParams.set("coverage-mode",e.instrumenter);window.location=n.toString()}return e}).then(function(e){if(e.instrumenter==="blanket"){return i("sap/ui/thirdparty/blanket").then(function(){if(t.coverage&&window.blanket){if(t.coverage.only!=null){window.blanket.options("sap-ui-cover-only",t.coverage.only)}if(t.coverage.never!=null){window.blanket.options("sap-ui-cover-never",t.coverage.never)}if(t.coverage.branchTracking){window.blanket.options("branchTracking",true)}}return i("sap/ui/qunit/qunit-coverage")}).then(function(){QUnit.config.autostart=false})}else if(e.instrumenter==="istanbul"){return i("sap/ui/qunit/qunit-coverage-istanbul").then(function(){var e=function(e){return Array.isArray(e)?JSON.stringify(e):e};var n=function(e){var t=[];for(var[i,r]of Object.entries(e)){if(Object.prototype.toString.call(r)==="[object Object]"){var o=n(r);t=t.concat(o.map(function(e){return[i].concat(e)}))}else{t.push([i,r])}}return t};if(t.coverage){var i=document.querySelector('script[src$="qunit/qunit-coverage-istanbul.js"]');if(i&&t.coverage!=null){var r=n(t.coverage);r.forEach(function(n){var t=n.pop();if(t!==null){i.setAttribute("data-sap-ui-cover-"+n.join("-"),e(t))}})}}})}else if(e.instrumenter===null&&e.error){QUnit.test("There's an error with the instrumentation setup or configuration",function(n){n.ok(false,e.error)})}}).then(function(){var e=QUnit.config.urlConfig.some(function(e){return e.id==="coverage"});if(!e){QUnit.config.urlConfig.push({id:"coverage",label:"Enable coverage",tooltip:"Enable code coverage."})}});h=h.then(function(){if(QUnit.urlParams["sap-ui-xx-csp-policy"]){document.addEventListener("securitypolicyviolation",u);QUnit.done(function(){document.removeEventListener("securitypolicyviolation",u)})}QUnit.config.urlConfig.push({id:"sap-ui-xx-csp-policy",label:"CSP",value:{"sap-target-level-1:report-only":"Level 1","sap-target-level-2:report-only":"Level 2"},tooltip:"What Content-Security-Policy should the server send"});if(QUnit.urlParams["rtf"]||QUnit.urlParams["repeat-to-failure"]){QUnit.done(function(e){if(e.failed===0){setTimeout(function(){location.reload()},100)}})}QUnit.config.urlConfig.push({id:"repeat-to-failure",label:"Repeat",value:false,tooltip:"Whether this test should auto-repeat until it fails"})});v=Promise.all([c,l,f,d,p,h]);if(t.beforeBootstrap){v=v.then(function(){return i(t.beforeBootstrap)})}window["sap-ui-config"]=t.ui5||{};if(Array.isArray(window["sap-ui-config"].libs)){window["sap-ui-config"].libs=window["sap-ui-config"].libs.join(",")}window["sap-ui-test-config"]=t.testConfig||{};if(t.bootCore){v=v.then(function(){return new Promise(function(e,n){sap.ui.require(["sap/ui/core/Core"],function(n){n.boot();n.attachInit(e)},n)})})}return v.then(function(){if(t.autostart){return i(t.module).then(function(e){return Promise.all(e)}).then(function(){return o()}).then(function(){if(t.ui5["xx-waitfortheme"]==="init"){return new Promise(function(e,n){sap.ui.require(["sap/ui/qunit/utils/waitForThemeApplied"],e,n)}).then(function(e){return e()})}}).then(function(){QUnit.start()})}else{return o().then(function(){return i(t.module).then(function(e){return Promise.all(e)})})}})}var l=new URLSearchParams(window.location.search),f=n.getAttribute("data-sap-ui-testsuite")||l.get("testsuite"),d=n.getAttribute("data-sap-ui-test")||l.get("test");n.getSuiteConfig(f).then(function(e){var n=e.tests[d];if(!n){throw new TypeError("Invalid test name")}return c(n)}).catch(function(e){console.error(e.stack||e);if(typeof QUnit!=="undefined"){QUnit.test("Test Starter",function(){throw e});QUnit.start()}else{n.whenDOMReady().then(function(){document.body.style.color="red";document.body.innerHTML="<pre>"+n.encode(e.stack||e.message||String(e))+"</pre>"})}})});
//# sourceMappingURL=_setupAndStart.js.map