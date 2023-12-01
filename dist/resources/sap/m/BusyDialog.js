/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Dialog","sap/m/BusyIndicator","sap/m/Label","sap/m/Button","sap/base/Log","sap/ui/core/Core","sap/ui/core/InvisibleText"],function(t,e,o,i,s,n,a,l,r){"use strict";var u=t.TitleAlignment;var c=e.extend("sap.m.BusyDialog",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Appearance",defaultValue:""},title:{type:"string",group:"Appearance",defaultValue:""},customIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},customIconRotationSpeed:{type:"int",group:"Appearance",defaultValue:1e3},customIconDensityAware:{type:"boolean",defaultValue:true},customIconWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},customIconHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},cancelButtonText:{type:"string",group:"Misc",defaultValue:""},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:u.Auto}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{close:{parameters:{cancelPressed:{type:"boolean"}}}},designtime:"sap/m/designtime/BusyDialog.designtime"},renderer:{apiVersion:2,render:function(t,e){}}});c.prototype.init=function(){this._busyIndicator=new i(this.getId()+"-busyInd",{visible:true});this._oDialog=new o(this.getId()+"-Dialog",{content:this._busyIndicator,titleAlignment:this.getTitleAlignment(),showHeader:false,afterClose:this._fnCloseHandler.bind(this),initialFocus:this._busyIndicator.getId()+"-busyIndicator"}).addStyleClass("sapMBusyDialog");this._oDialog.close=function(){};this._oDialog.addEventDelegate({onBeforeRendering:function(){var t=this.getText(),e=this.getTitle(),o=this.getShowCancelButton()||this.getCancelButtonText();if(!t&&!e&&!o){this._oDialog.addStyleClass("sapMBusyDialog-Light")}else{this._oDialog.removeStyleClass("sapMBusyDialog-Light")}}},this);this._oDialog.oPopup.onsapescape=function(t){this.close(true)}.bind(this)};c.prototype.exit=function(){if(this._iOpenTimer){clearTimeout(this._iOpenTimer);this._iOpenTimer=null}this._busyIndicator.destroy();this._busyIndicator=null;if(this._cancelButton){this._cancelButton.destroy();this._cancelButton=null}if(this._oLabel){this._oLabel.destroy();this._oLabel=null}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}};c.prototype.open=function(){var t=this.getAriaLabelledBy();a.debug("sap.m.BusyDialog.open called at "+Date.now());if(t&&t.length){if(!this._oDialog._$dialog){var e=this;t.forEach(function(t){e._oDialog.addAriaLabelledBy(t)})}}else if(!this._oDialog.getShowHeader()){this._oDialog.addAriaLabelledBy(r.getStaticId("sap.m","BUSYDIALOG_TITLE"))}if(!document.body||!l.isInitialized()){this._iOpenTimer=setTimeout(function(){this.open()}.bind(this),50)}else{this._oDialog.open()}return this};c.prototype.close=function(t){this._isClosedFromUserInteraction=t;if(this._iOpenTimer){clearTimeout(this._iOpenTimer);this._iOpenTimer=null}o.prototype.close.call(this._oDialog);return this};c.prototype._fnCloseHandler=function(){this.fireClose({cancelPressed:this._isClosedFromUserInteraction||false});if(this._oDialog){this._oDialog.removeAllAriaLabelledBy()}};c.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.setTitle(t).setShowHeader(!!t);return this};c.prototype.setTitleAlignment=function(t){this.setProperty("titleAlignment",t,true);if(this._oDialog){this._oDialog.setTitleAlignment(t)}return this};c.prototype.setTooltip=function(t){this._oDialog.setTooltip(t);return this};c.prototype.getTooltip=function(){return this._oDialog.getTooltip()};c.prototype.setText=function(t){this.setProperty("text",t,true);if(!this._oLabel){if(t){this._oLabel=new s(this.getId()+"-TextLabel",{text:t}).addStyleClass("sapMBusyDialogLabel");this._oDialog.insertAggregation("content",this._oLabel,0);if(this._oDialog.getShowHeader()){this._oDialog.addAriaLabelledBy(this._oLabel.getId())}}}else{if(t){this._oLabel.setText(t).setVisible(true)}else{this._oLabel.setVisible(false)}}return this};c.prototype.setCustomIcon=function(t){this.setProperty("customIcon",t,true);this._busyIndicator.setCustomIcon(t);return this};c.prototype.setCustomIconRotationSpeed=function(t){this.setProperty("customIconRotationSpeed",t,true);this._busyIndicator.setCustomIconRotationSpeed(t);return this};c.prototype.setCustomIconDensityAware=function(t){this.setProperty("customIconDensityAware",t,true);this._busyIndicator.setCustomIconDensityAware(t);return this};c.prototype.setCustomIconWidth=function(t){this.setProperty("customIconWidth",t,true);this._busyIndicator.setCustomIconWidth(t);return this};c.prototype.setCustomIconHeight=function(t){this.setProperty("customIconHeight",t,true);this._busyIndicator.setCustomIconHeight(t);return this};c.prototype.setShowCancelButton=function(t){this.setProperty("showCancelButton",t,false);if(t){this._oDialog.setEndButton(this._getCancelButton())}else{this._destroyTheCancelButton()}return this};c.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,false);if(t){this._getCancelButton().setText(t);this._oDialog.setEndButton(this._getCancelButton())}else{this._destroyTheCancelButton()}return this};c.prototype.getDomRef=function(){return this._oDialog&&this._oDialog.getDomRef()};["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass"].forEach(function(t){c.prototype[t]=function(){if(this._oDialog&&this._oDialog[t]){this._oDialog[t].apply(this._oDialog,arguments);return this}}});c.prototype._destroyTheCancelButton=function(){this._oDialog.destroyEndButton();this._cancelButton=null};c.prototype._getCancelButton=function(){var t=this.getCancelButtonText();t=t?t:l.getLibraryResourceBundle("sap.m").getText("BUSYDIALOG_CANCELBUTTON_TEXT");return this._cancelButton?this._cancelButton:this._cancelButton=new n(this.getId()+"busyCancelBtn",{text:t,press:function(){this.close(true)}.bind(this)})};return c});
//# sourceMappingURL=BusyDialog.js.map