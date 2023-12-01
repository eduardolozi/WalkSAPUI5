/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/Control","sap/ui/base/DesignTime","sap/ui/core/Element","./Controller","./ViewRenderer","./ViewType","./XMLProcessingMode"],function(e,t,r,o,n,i,s,a,c,p,u,f,l){"use strict";var d=s.extend("sap.ui.core.mvc.View",{metadata:{interfaces:["sap.ui.core.IDScope"],abstract:true,library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},viewName:{type:"string",group:"Misc",defaultValue:null},displayBlock:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{afterInit:{},beforeExit:{},afterRendering:{},beforeRendering:{}},specialSettings:{controller:"sap.ui.core.mvc.Controller",controllerName:"string",preprocessors:"Object",resourceBundleName:"string",resourceBundleUrl:"sap.ui.core.URI",resourceBundleLocale:"string",resourceBundleAlias:"string",type:"string",definition:"any",viewContent:{type:"any",deprecated:true},viewData:"any",async:{type:"boolean",defaultValue:false}},designtime:"sap/ui/core/designtime/mvc/View.designtime"},renderer:u});d._mPreprocessors={};function m(e){e._settings={};for(var t in e){if(t.indexOf("_")!==0){e._settings[t]=e[t]}}}function g(e,t){var r;if(typeof e.preprocessor==="string"){var o=e.preprocessor.replace(/\./g,"/");if(t){return new Promise(function(e,t){sap.ui.require([o],function(t){e(t)},t)})}else{return sap.ui.requireSync(o)}}else if(typeof e.preprocessor==="function"&&!e.preprocessor.process){r={process:e.preprocessor}}else{r=e.preprocessor}if(t){return Promise.resolve(r)}else{return r}}function h(e,t){var o=this.mPreprocessors[t]||[],n=[],i,s,a,c=[];if(d._mPreprocessors[e]&&d._mPreprocessors[e][t]){n=d._mPreprocessors[e][t].map(function(e){return Object.assign({},e)})}for(i=0,s=n.length;i<s;i++){if(n[i]._onDemand){a=n[i]}else{c.push(n[i])}}for(i=0,s=o.length;i<s;i++){var p=!o[i].preprocessor;if(p&&a){c.unshift(r(o[i],a))}else if(!p){c.push(o[i])}}return c}function y(e,t){var r=e.getMetadata().getClass();function o(e){e.preprocessor=g(e,t.async)}e.mPreprocessors=Object.assign({},t.preprocessors);for(var n in r.PreprocessorType){var i=r.PreprocessorType[n];if(e.mPreprocessors[i]&&!Array.isArray(e.mPreprocessors[i])){e.mPreprocessors[i]=[e.mPreprocessors[i]]}else if(!e.mPreprocessors[i]){e.mPreprocessors[i]=[]}e.mPreprocessors[i].forEach(m);e.mPreprocessors[i]=h.call(e,r._sType,i);e.mPreprocessors[i].forEach(o)}}function w(e){e.oAsyncState={};e.oAsyncState.promise=null}var v=function(e,t){var r=t.async;var o=function(t){e.oController=t;t.oView=e};if(!a.isControllerCodeDeactivated()){var n=t.controller,s=n&&typeof n.getMetadata==="function"&&n.getMetadata().getName();if(!n&&e.getControllerName){e.bControllerIsViewManaged=true;var c=e.getControllerName();if(c){var u=sap.ui.require("sap/ui/core/Component");if(u){var f=u.getCustomizing(e,{type:"sap.ui.controllerReplacements",name:c});if(f){c=typeof f==="string"?f:f.controllerName}}if(r){n=p.create({name:c,_viewId:e.sId})}else{n=sap.ui.controller(c,true,false,e.sId)}}}else if(n){e.bControllerIsViewManaged=false;var l=i._sOwnerId;if(!n._isExtended()){n=p.applyExtensions(n,s,l,e.sId,r)}else if(r){n=Promise.resolve(n)}}if(n){if(r){if(!e.oAsyncState){throw new Error("The view "+e.sViewName+" runs in sync mode and therefore cannot use async controller extensions!")}return n.then(o)}else{o(n)}}}else if(r){const e=Object.assign(new p,{"_sap.ui.core.mvc.EmptyControllerImpl":true});return Promise.resolve(e).then(o)}else{sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl",{"_sap.ui.core.mvc.EmptyControllerImpl":true});e.oController=sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl")}};d.prototype._initCompositeSupport=function(n){n=n||{};e(!n.preprocessors||this.getMetadata().getName().indexOf("XMLView"),"Preprocessors only available for XMLView");this.oViewData=n.viewData;this.sViewName=n.viewName;if(this.sViewName&&this.sViewName.startsWith("module:")){this.sViewName=this.sViewName.slice("module:".length).replace(/\//g,".")}var i=this;y(this,n);if(n.async){w(this)}var s=sap.ui.require("sap/ui/core/Component");if(s){var a=s.getCustomizing(this,{type:"sap.ui.viewModifications",name:this.sViewName});if(!o(a)){this._fnSettingsPreprocessor=function(e){var o=this.getId();if(o){if(i.isPrefixedId(o)){o=o.substring((i.getId()+"--").length)}var n=Object.assign({},a[o]);if(n){for(var s in n){if(s!=="visible"){t.warning("Customizing: custom value for property '"+s+"' of control '"+o+"' in View '"+i.sViewName+"' ignored: only the 'visible' property can be customized.");delete n[s]}}t.info("Customizing: custom value for property 'visible' of control '"+o+"' in View '"+i.sViewName+"' applied: "+n.visible);e=r(e,n)}}}}}var c=function(t,r){e(typeof t==="function","fn must be a function");var o=s&&s.getOwnerComponentFor(i);if(o){if(r){i.fnScopedRunWithOwner=i.fnScopedRunWithOwner||function(e){return o.runAsOwner(e)}}return o.runAsOwner(t)}return t()};var p=function(e){if(e.oController&&e.oController.connectToView){return e.oController.connectToView(e)}};var u=function(e){if(i.onControllerConnected){return i.onControllerConnected(i.oController,e)}};if(n.async){this.oAsyncState.promise=this.initViewSettings(n).then(function(){return c(v.bind(null,i,n),true)}).then(function(){return c(u.bind(null,n),true)}).then(function(){return p(i)}).then(function(){return i.runPreprocessor("controls",i,false)}).then(function(){return c(i.fireAfterInit.bind(i),true)}).then(function(){return i}).catch(function(e){this.deregister();throw e}.bind(this))}else{this.initViewSettings(n);v(this,n);u(n);p(this);this.runPreprocessor("controls",this,true);this.fireAfterInit()}};d.prototype.getController=function(){return this.oController};d.prototype.byId=function(e){return c.getElementById(this.createId(e))};d.prototype.createId=function(e){if(!this.isPrefixedId(e)){e=this.getId()+"--"+e}return e};d.prototype.getLocalId=function(e){var t=this.getId()+"--";return e&&e.indexOf(t)===0?e.slice(t.length):null};d.prototype.isPrefixedId=function(e){return!!(e&&e.indexOf(this.getId()+"--")===0)};d.prototype.getViewData=function(){return this.oViewData};function P(){this.oAsyncState=null}d.prototype.exit=function(){this.fireBeforeExit();if(this.oController&&this.bControllerIsViewManaged){this.oController.destroy();delete this.oController}delete this.oPreprocessorInfo;if(this.oAsyncState){var e=P.bind(this);this.oAsyncState.promise.then(e,e)}};d.prototype.onAfterRendering=function(){this.fireAfterRendering()};d.prototype.onBeforeRendering=function(){this.fireBeforeRendering()};d.prototype.clone=function(e,t){var r={},o,n;for(o in this.mProperties&&!(this.isBound&&this.isBound(o))){if(this.mProperties.hasOwnProperty(o)){r[o]=this.mProperties[o]}}n=s.prototype.clone.call(this,e,t,{cloneChildren:false,cloneBindings:true});var i,a,c;for(i in n.mEventRegistry){a=n.mEventRegistry[i];for(c=a.length-1;c>=0;c--){if(a[c].oListener===this.getController()){a[c]={oListener:n.getController(),fFunction:a[c].fFunction,oData:a[c].oData}}}}n.applySettings(r);return n};d.prototype.getPreprocessors=function(){return this.mPreprocessors};d.prototype.getPreprocessorInfo=function(e){if(!this.oPreprocessorInfo){this.oPreprocessorInfo={name:this.sViewName,componentId:this._sOwnerId,id:this.getId(),caller:this+" ("+this.sViewName+")",sync:!!e}}if(d._supportInfo){this.oPreprocessorInfo._supportInfo=d._supportInfo}return this.oPreprocessorInfo};d.prototype.runPreprocessor=function(e,r,o){var n=this.getPreprocessorInfo(o),i=this.mPreprocessors&&this.mPreprocessors[e]||[],s,a,c;if(!o){a=function(e,t){return function(r){return t.preprocessor.then(function(o){return o.process(r,e,t._settings)})}};c=Promise.resolve(r)}for(var p=0,u=i.length;p<u;p++){if(o&&i[p]._syncSupport===true){s=i[p].preprocessor.process;r=s(r,n,i[p]._settings)}else if(!o){c=c.then(a(n,i[p]))}else{t.debug('Async "'+e+'"-preprocessor was skipped in sync view execution for '+this.getMetadata().getClass()._sType+"View",this.getId())}}return o?r:c};function C(e,t){if(!d._mPreprocessors[t]){d._mPreprocessors[t]={}}if(!d._mPreprocessors[t][e]){d._mPreprocessors[t][e]=[]}}function b(e,t){return d._mPreprocessors[e][t].some(function(e){return!!e._onDemand})}d.registerPreprocessor=function(e,r,o,n,i,s){if(typeof i!=="boolean"){s=i;i=false}if(r){C(e,o);if(i&&b(o,e)){t.error('Registration for "'+e+'" failed, only one on-demand-preprocessor allowed',this.getMetadata().getName());return}d._mPreprocessors[o][e].push({preprocessor:r,_onDemand:i,_syncSupport:n,_settings:s});t.debug("Registered "+(i?"on-demand-":"")+'preprocessor for "'+e+'"'+(n?" with syncSupport":""),this.getMetadata().getName())}else{t.error('Registration for "'+e+'" failed, no preprocessor specified',this.getMetadata().getName())}};d.prototype.hasPreprocessor=function(e){return!!this.mPreprocessors[e].length};d.create=function(e){var t=n({},e);t.async=true;t.viewContent=t.definition;var r=sap.ui.require("sap/ui/core/Component");var o;if(r&&i._sOwnerId){o=r.getComponentById(i._sOwnerId)}function s(){return I(t.id,t,t.type).loaded()}return new Promise(function(e,r){var o=V(t);sap.ui.require([o],function(t){e(t)},r)}).then(function(e){if(e.getMetadata().isA("sap.ui.core.mvc.XMLView")){t.processingMode=l.Sequential}if(o){return o.runAsOwner(s)}else{return s()}})};d._create=I;sap.ui.view=function(e,r,o){var n=typeof e==="string"?e:r;n=typeof n==="object"?n.viewName:n;t.warning("Do not use deprecated view factory functions (View: "+n+"). "+"Use the static create function on the view module instead: [XML|HTML|JSON]View.create().","sap.ui.view",null,function(){return{type:"sap.ui.view",name:n}});return I(e,r,o)};function I(o,n,s){var a=null,c={};if(typeof o==="object"||typeof o==="string"&&n===undefined){n=o;o=undefined}if(n){if(typeof n==="string"){c.viewName=n}else{c=n}}e(!c.async||typeof c.async==="boolean","sap.ui.view factory: Special setting async has to be of the type 'boolean'!");if(o){c.id=o}if(s){c.type=s}if(c.type===f.XML&&c.async){c.processingMode=c.processingMode||l.SequentialLegacy}var p=sap.ui.require("sap/ui/core/Component");if(p&&i._sOwnerId){var u=p.getCustomizing(i._sOwnerId,{type:"sap.ui.viewReplacements",name:c.viewName});if(u){delete u.async;t.info("Customizing: View replacement for view '"+c.viewName+"' found and applied: "+u.viewName+" (type: "+u.type+")");r(c,u)}else{t.debug("Customizing: no View replacement found for view '"+c.viewName+"'.")}}var d=V(c);a=S(d,c);return a}function V(e){var r=d._getModuleName(e);if(r){if(e.type){t.error("When using the view factory, the 'type' setting must be omitted for typed views. When embedding typed views in XML, don't use the <JSView> tag, use the <View> tag instead.")}return r}if(!e.type){throw new Error("No view type specified.")}if(e.type===f.XML){return"sap/ui/core/mvc/XMLView"}if(e.type===f.JS){r="sap/ui/core/mvc/JSView"}else if(e.type===f.JSON){r="sap/ui/core/mvc/JSONView"}else if(e.type===f.HTML){r="sap/ui/core/mvc/HTMLView"}else if(e.type===f.Template){r="sap/ui/core/mvc/TemplateView"}if(!r){throw new Error("Unknown view type "+e.type+" specified.")}return r}function S(e,r){var o=sap.ui.require(e);if(!o){o=sap.ui.requireSync(e);if(r.async){t.warning("sap.ui.view was called without requiring the according view class.")}}return new o(r)}d.prototype.loaded=function(){if(this.oAsyncState&&this.oAsyncState.promise){return this.oAsyncState.promise}else{return Promise.resolve(this)}};d._getModuleName=function(e){var t;if(e.viewName&&e.viewName.startsWith("module:")){t=e.viewName.slice("module:".length)}return t};d.prototype.getAutoPrefixId=function(){return false};d.prototype.onControllerConnected=function(e,t){if(!this.createContent&&typeof this.createContent!=="function"){return}var r={id:this.getAutoPrefixId()?this.createId.bind(this):undefined,settings:this._fnSettingsPreprocessor};return i.runWithPreprocessors(function(){var r=this.createContent(e);if(t.async){r=Promise.resolve(r);return r.then(function(e){this.applySettings({content:e})}.bind(this))}else if(r instanceof Promise){throw new Error("An asynchronous view (createContent) cannot be instantiated synchronously. Affected view: '"+this.getMetadata().getName()+"'.")}else{this.applySettings({content:r})}}.bind(this),r)};d.prototype.initViewSettings=function(e){if(!this.getMetadata()._oRenderer){this.getMetadata().getRenderer=function(){return d.getMetadata().getRenderer()};this.getMetadata().getRendererName=function(){return d.getMetadata().getRendererName()}}if(e.async){return Promise.resolve()}};return d});
//# sourceMappingURL=View.js.map