/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/IconPool","sap/ui/core/delegate/ItemNavigation","sap/ui/base/ManagedObject","sap/ui/core/delegate/ScrollEnablement","./AccButton","./TabStripItem","sap/m/Select","sap/m/SelectList","sap/ui/Device","sap/ui/core/Renderer","sap/ui/core/ResizeHandler","sap/m/library","sap/ui/core/Icon","sap/m/Image","sap/m/SelectRenderer","sap/m/SelectListRenderer","./TabStripRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/Configuration","sap/ui/base/Object","sap/ui/dom/jquery/scrollLeftRTL"],function(t,e,i,o,s,r,n,a,l,c,h,g,f,p,m,d,u,I,S,_,jQuery,y,v,T){"use strict";var A=p.SelectType;var C=p.ButtonType;var b=t.extend("sap.m.TabStrip",{metadata:{library:"sap.m",properties:{hasSelect:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabStripItem",multiple:true,singularName:"item"},addButton:{type:"sap.m.Button",multiple:false,singularName:"addButton"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"},_rightArrowButton:{type:"sap.m.AccButton",multiple:false,visibility:"hidden"},_leftArrowButton:{type:"sap.m.AccButton",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.m.TabStripItem",group:"Misc"}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabStripItem"}}},itemPress:{parameters:{item:{type:"sap.m.TabStripItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}}}},constructor:function(t,e){var i=false;if(!e&&typeof t==="object"){e=t}if(e){i=e["hasSelect"];delete e["hasSelect"]}s.prototype.constructor.apply(this,arguments);this.setProperty("hasSelect",i,true)},renderer:S});var L=sap.ui.getCore().getLibraryResourceBundle("sap.m");b.ICON_BUTTONS={LeftArrowButton:"slim-arrow-left",RightArrowButton:"slim-arrow-right",DownArrowButton:h.system.phone?"navigation-down-arrow":"slim-arrow-down",AddButton:"add"};b.SELECT_ITEMS_ID_SUFFIX="-SelectItem";b.SCROLL_SIZE=320;b.MIN_DRAG_OFFSET=h.support.touch?15:5;b.SCROLL_ANIMATION_DURATION=function(){var t=v.getAnimationMode();return t!==v.AnimationMode.none&&t!==v.AnimationMode.minimal?500:0}();b.prototype.init=function(){this._bDoScroll=!h.system.phone;this._bRtl=v.getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(!h.system.phone){this._oScroller=new r(this,this.getId()+"-tabs",{horizontal:true,vertical:false,nonTouchScrolling:true})}};b.prototype.exit=function(){this._bRtl=null;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._sResizeListenerId){f.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this._removeItemNavigation()};b.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){f.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};b.prototype.onAfterRendering=function(){if(this._oScroller){this._oScroller.setIconTabBar(this,jQuery.proxy(this._handleOverflowButtons,this),null)}this._addItemNavigation();if(!h.system.phone){this._oScroller._$Container=this.$("tabsContainer");this._adjustScrolling();if(this.getSelectedItem()){if(!sap.ui.getCore().isThemeApplied()){sap.ui.getCore().attachThemeChanged(this._handleInititalScrollToItem,this)}else{this._handleInititalScrollToItem()}}this._sResizeListenerId=f.register(this.getDomRef(),jQuery.proxy(this._adjustScrolling,this))}else{this.$().toggleClass("sapUiSelectable",this.getItems().length>1)}};b.prototype._handleInititalScrollToItem=function(){var t=sap.ui.getCore().byId(this.getSelectedItem());if(t&&t.$().length>0){this._scrollIntoView(t,500)}sap.ui.getCore().detachThemeChanged(this._handleInititalScrollToItem,this)};b.prototype.getFocusDomRef=function(){var t=sap.ui.getCore().byId(this.getSelectedItem());if(!t){return null}return t.getDomRef()};b.prototype.applyFocusInfo=function(t){if(t.focusDomRef){jQuery(t.focusDomRef).trigger("focus")}};b.prototype._addItemNavigation=function(){var t=this.getDomRef("tabsContainer"),e=this.getItems(),i=[];e.forEach(function(t){var e=t.getDomRef();jQuery(e).attr("tabindex","-1");i.push(e)});if(!this._oItemNavigation){this._oItemNavigation=new o}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(i);this._oItemNavigation.setCycling(false);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]});this.addDelegate(this._oItemNavigation)};b.prototype._checkScrolling=function(){var t=this.getDomRef("tabs"),e=t&&t.scrollWidth>this.getDomRef("tabsContainer").offsetWidth;this.$().toggleClass("sapMTSScrollable",e);return e};b.prototype.onkeyup=function(t){if(t&&t.keyCode===y.ARROW_LEFT||t.keyCode===y.ARROW_RIGHT){var i=e.closestTo(t.target);this._scrollIntoView(i,500)}};b.prototype._handleOverflowButtons=function(){var t=this.getDomRef("tabs"),e=this.getDomRef("tabsContainer"),i,o,s,r=false,n=false,a=this._checkScrolling();if(a&&!this.getAggregation("_rightArrowButton")&&!this.getAggregation("_leftArrowButton")){this._getLeftArrowButton();this._getRightArrowButton();var l=sap.ui.getCore().createRenderManager();this.getRenderer().renderRightOverflowButtons(l,this,true);this.getRenderer().renderLeftOverflowButtons(l,this,true);l.destroy()}if(a&&t&&e){if(this._bRtl){i=jQuery(e).scrollLeftRTL()}else{i=e.scrollLeft}o=t.scrollWidth;s=e.clientWidth;if(Math.abs(o-s)===1){o=s}if(i>0){if(this._bRtl){n=true}else{r=true}}if(o>s&&i+s<o){if(this._bRtl){r=true}else{n=true}}this.$().toggleClass("sapMTSScrollBack",r).toggleClass("sapMTSScrollForward",n)}else{this.$().toggleClass("sapMTSScrollBack",false).toggleClass("sapMTSScrollForward",false)}};b.prototype._adjustScrolling=function(){this._iMaxOffsetLeft=Math.abs(this.$("tabsContainer").width()-this.$("tabs").width());this._handleOverflowButtons()};b.prototype._getLeftArrowButton=function(){return this._getArrowButton("_leftArrowButton",L.getText("TABSTRIP_SCROLL_BACK"),b.ICON_BUTTONS.LeftArrowButton,-b.SCROLL_SIZE)};b.prototype._getRightArrowButton=function(){return this._getArrowButton("_rightArrowButton",L.getText("TABSTRIP_SCROLL_FORWARD"),b.ICON_BUTTONS.RightArrowButton,b.SCROLL_SIZE)};b.prototype._getArrowButton=function(t,e,o,s){var r=this.getAggregation(t),a=this;if(!r){r=new n({type:C.Transparent,icon:i.getIconURI(o),tooltip:e,tabIndex:"-1",ariaHidden:"true",press:function(t){a._scroll(s,b.SCROLL_ANIMATION_DURATION)}});this.setAggregation(t,r,true)}return r};b.prototype._removeItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};b.prototype._scroll=function(t,e){var i=this.getDomRef("tabsContainer").scrollLeft,o;if(this._bRtl){o=i-t;if(h.browser.firefox){if(o<-this._iMaxOffsetLeft){o=-this._iMaxOffsetLeft}if(o>0){o=0}}}else{o=i+t;if(o<0){o=0}if(o>this._iMaxOffsetLeft){o=this._iMaxOffsetLeft}}this._oScroller.scrollTo(o,0,e);this._iCurrentScrollLeft=o};b.prototype._scrollIntoView=function(t,e){var i=this.$("tabs"),o=t.$(),s=this.$("leftOverflowButtons")?this.$("leftOverflowButtons").width():0,r=this.$("rightOverflowButtons")?this.$("rightOverflowButtons").width():0,n=i.innerWidth()-i.width(),a=o.outerWidth(true),l=o.position().left-n/2,c=this.getDomRef("tabsContainer"),g=c.scrollLeft,f=this.$("tabsContainer").width(),p=g;if(l<s||l+r>f-a){if(this._bRtl&&h.browser.firefox){if(l>s){p+=l+a-f+r}else{p+=l-s}}else{if(l<s){p+=l-r}else{p+=l+a-f+s}}this._iCurrentScrollLeft=p;this._oScroller.scrollTo(p,0,e)}};b.prototype._createSelect=function(t){var e,o,s,r={type:A.IconOnly,autoAdjustWidth:true,maxWidth:"2.5rem",icon:i.getIconURI(b.ICON_BUTTONS.DownArrowButton),tooltip:L.getText("TABSTRIP_OPENED_TABS"),change:function(t){o=t.getParameters()["selectedItem"];s=this._findTabStripItemFromSelectItem(o);if(s instanceof a){this._activateItem(s,t)}}.bind(this)};e=new w(r).addStyleClass("sapMTSOverflowSelect");this._addItemsToSelect(e,t);return e};b.prototype.onsapselect=function(t){t.setMarked();t.preventDefault();if(t.srcControl instanceof a){this._activateItem(t.srcControl,t)}};b.prototype.onsapdelete=function(t){var i=e.closestTo(t.target),o=i.getId()===this.getSelectedItem(),s=function(){this._moveToNextItem(o)};this._removeItem(i,s)};b.prototype._moveToNextItem=function(t){if(!this._oItemNavigation){return}var e=this.getItems().length,i=this._oItemNavigation.getFocusedIndex(),o=e===i?--i:i,s=this.getItems()[o],r=function(){if(this._oItemNavigation){this._oItemNavigation.focusItem(o)}};if(t){this.setSelectedItem(s);this.fireItemPress({item:s})}setTimeout(r.bind(this),0)};b.prototype._activateItem=function(t,e){if(this.fireItemSelect({item:t})){if(!this.getSelectedItem()||this.getSelectedItem()!==t.getId()){this.setSelectedItem(t)}this.fireItemPress({item:t})}else if(e instanceof jQuery.Event&&!e.isDefaultPrevented()){e.preventDefault()}};b.prototype.addAggregation=function(e,i,o){if(e==="items"){this._handleItemsAggregation(["addAggregation",i,o],true)}return t.prototype.addAggregation.call(this,e,i,o)};b.prototype.insertAggregation=function(e,i,o,s){if(e==="items"){this._handleItemsAggregation(["insertAggregation",i,o,s],true)}return t.prototype.insertAggregation.call(this,e,i,o,s)};b.prototype.removeAggregation=function(e,i,o){if(e==="items"){this._handleItemsAggregation(["removeAggregation",i,o])}return t.prototype.removeAggregation.call(this,e,i,o)};b.prototype.removeAllAggregation=function(e,i){if(e==="items"){this._handleItemsAggregation(["removeAllAggregation",null,i])}return t.prototype.removeAllAggregation.call(this,e,i)};b.prototype.destroyAggregation=function(e,i){if(e==="items"){this._handleItemsAggregation(["destroyAggregation",i])}return t.prototype.destroyAggregation.call(this,e,i)};b.prototype.setSelectedItem=function(t){var e=!h.system.phone;if(!t){return this}if(t.$().length>0&&e){this._scrollIntoView(t,500)}if(e){this._updateAriaSelectedAttributes(this.getItems(),t);this._updateSelectedItemClasses(t.getId())}if(this.getHasSelect()){var i=this._findSelectItemFromTabStripItem(t);this.getAggregation("_select").setSelectedItem(i)}return this.setAssociation("selectedItem",t,e)};b.prototype.setProperty=function(e,i,o){var s;s=t.prototype.setProperty.call(this,e,i,o);if(e==="hasSelect"){if(i){if(!this.getAggregation("_select")){s=this.setAggregation("_select",this._createSelect(this.getItems()))}}else{s=this.destroyAggregation("_select")}}return s};b.prototype._attachItemEventListeners=function(t){if(t instanceof a){var e=["itemClosePressed","itemPropertyChanged"];e.forEach(function(e){e=e.charAt(0).toUpperCase()+e.slice(1);t["detach"+e](this["_handle"+e]);t["attach"+e](this["_handle"+e].bind(this))},this)}};b.prototype._detachItemEventListeners=function(t){if(!t||typeof t!=="object"||!(t instanceof a)){var e=this.getItems();e.forEach(function(t){if(typeof t!=="object"||!(t instanceof a)){return}return this._detachItemEventListeners(t)}.bind(this))}};b.prototype._handleItemPropertyChanged=function(t){var e=this._findSelectItemFromTabStripItem(t.getSource());var i=t["mParameters"].propertyKey;var o="set"+i.substr(0,1).toUpperCase()+i.substr(1);e[o](t["mParameters"].propertyValue)};b.prototype._handleItemClosePressed=function(t){this._removeItem(t.getSource())};b.prototype._removeItem=function(t,e){var i;if(!(t instanceof a)){_.error("Expecting instance of a TabStripSelectItem, given: ",t)}if(t.getId().indexOf(b.SELECT_ITEMS_ID_SUFFIX)!==-1){i=this._findTabStripItemFromSelectItem(t)}else{i=t}if(this.fireItemClose({item:i})){this.removeAggregation("items",i);this._moveToNextItem(t.getId()===this.getSelectedItem());if(e){e.call(this)}}};b.prototype._handleItemsAggregation=function(t,e){var i="items",o=t[0],s=t[1],r=[i];t.forEach(function(t,e){if(e>0){r.push(t)}});if(e){this._attachItemEventListeners(s)}else{this._detachItemEventListeners(s)}if(i!=="items"){return this}if(this.getHasSelect()){this._handleSelectItemsAggregation(r,e,o,s)}return this};b.prototype._handleSelectItemsAggregation=function(t,e,i,o){var s=this.getAggregation("_select"),r;if(i==="destroyAggregation"&&!s){return}if(o===null||typeof o!=="object"){return s[i]["apply"](s,t)}if(e){r=this._createSelectItemFromTabStripItem(o)}else{r=this._findSelectItemFromTabStripItem(o)}t.forEach(function(e,i){if(typeof e==="object"){t[i]=r}});return s[i]["apply"](s,t)};b.prototype._addItemsToSelect=function(t,e){e.forEach(function(e){var i=this._createSelectItemFromTabStripItem(e);t.addAggregation("items",i);if(e.getId()===this.getSelectedItem()){t.setSelectedItem(i)}},this)};b.prototype._createSelectItemFromTabStripItem=function(t){var e;if(!t&&!T.isObjectA(t,"sap.m.TabContainerItem")){_.error('Expecting instance of "sap.m.TabContainerItem": instead of '+t+" given.");return}e=new a({id:t.getId()+b.SELECT_ITEMS_ID_SUFFIX,text:t.getText(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),itemClosePressed:function(t){this._handleItemClosePressed(t)}.bind(this)});e.addEventDelegate({ontap:function(t){var e=t.srcControl;if(t.target.id===e.getParent().getId()+"-img"){t.srcControl=e=e.getParent()}if(e instanceof n||e instanceof m){this.fireItemClosePressed({item:this})}}},e);return e};b.prototype._findTabStripItemFromSelectItem=function(t){var e,i=t.getId().replace(b.SELECT_ITEMS_ID_SUFFIX,""),o=this.getItems();for(e=0;e<o.length;e++){if(o[e].getId()===i){return o[e]}}};b.prototype._findSelectItemFromTabStripItem=function(t){var e,i,o=t.getId()+b.SELECT_ITEMS_ID_SUFFIX;if(this.getHasSelect()){i=this.getAggregation("_select").getItems();for(e=0;e<i.length;e++){if(i[e].getId()===o){return i[e]}}}};b.prototype._updateAriaSelectedAttributes=function(t,e){var i;t.forEach(function(t){i="false";if(t.$()){if(e&&e.getId()===t.getId()){i="true"}t.$().attr("aria-selected",i)}})};b.prototype._updateSelectedItemClasses=function(t){if(this.$("tabs")){this.$("tabs").children(".sapMTabStripItemSelected").removeClass("sapMTabStripItemSelected");jQuery("#"+t).addClass("sapMTabStripItemSelected")}};b.prototype.changeItemState=function(t,e){var i;var o=this.getItems();o.forEach(function(o){if(t===o.getId()){i=jQuery(o.$());if(e===true&&!i.hasClass(a.CSS_CLASS_MODIFIED)){i.addClass(a.CSS_CLASS_MODIFIED)}else{i.removeClass(a.CSS_CLASS_MODIFIED)}}})};b.prototype.ontouchstart=function(t){var i=e.closestTo(t.target);if(i instanceof a||i instanceof n||i instanceof m||i instanceof d||i instanceof w){this._oTouchStartX=t.changedTouches[0].pageX}};b.prototype.ontouchend=function(t){var i,o;if(!this._oTouchStartX){return}i=e.closestTo(t.target);if(t.target.id===i.getParent().getId()+"-img"){i=i.getParent()}o=Math.abs(t.changedTouches[0].pageX-this._oTouchStartX);if(o<b.MIN_DRAG_OFFSET){if(i instanceof a){this._activateItem(i,t)}else if(i instanceof n){if(i&&i.getParent&&i.getParent()instanceof a){i=i.getParent();this._removeItem(i)}}else if(i instanceof m){if(i&&i.getParent&&i.getParent().getParent&&i.getParent().getParent()instanceof a){i=i.getParent().getParent();this._removeItem(i)}}this._oTouchStartX=null}};b.prototype.destroyItems=function(){this.setAssociation("selectedItem",null);return this.destroyAggregation("items")};var R=g.extend(u);R.apiVersion=2;var w=l.extend("sap.m.internal.TabStripSelect",{metadata:{library:"sap.m"},renderer:R});w.prototype.onAfterRendering=function(){l.prototype.onAfterRendering.apply(this,arguments);this.$().attr("tabindex","-1")};w.prototype.onAfterRenderingPicker=function(){var t=this.getPicker();l.prototype.onAfterRenderingPicker.call(this);if(h.system.phone){return}t.setOffsetX(Math.round(v.getRTL()?this.getPicker().$().width()-this.$().width():this.$().width()-this.getPicker().$().width()));t.setOffsetY(this.$().parents().hasClass("sapUiSizeCompact")?2:3);t._calcPlacement()};w.prototype.createList=function(){this._oList=new B({width:"100%"}).attachSelectionChange(this.onSelectionChange,this).addEventDelegate({ontap:function(t){this.close()}},this);return this._oList};w.prototype.setValue=function(t){l.prototype.setValue.apply(this,arguments);this.$("label").toggleClass("sapMTSOverflowSelectLabelModified",this.getSelectedItem()&&this.getSelectedItem().getProperty("modified"));return this};w.prototype._getValueIcon=function(){return null};var E=g.extend(I);E.apiVersion=2;E.renderItem=function(t,e,i,o){t.openStart("li",i);t.class(I.CSS_CLASS+"ItemBase");t.class(I.CSS_CLASS+"Item");t.class("sapMTSOverflowSelectListItem");if(i.getProperty("modified")){t.class("sapMTSOverflowSelectListItemModified")}if(h.system.desktop){t.class(I.CSS_CLASS+"ItemBaseHoverable")}if(i===e.getSelectedItem()){t.class(I.CSS_CLASS+"ItemBaseSelected")}t.attr("tabindex",0);this.writeItemAccessibilityState.apply(this,arguments);t.openEnd();t.openStart("div");t.class("sapMSelectListItemText");t.openEnd();if(i.getIcon()){t.renderControl(i._getImage())}t.openStart("div");t.class("sapMTSTexts");t.openEnd();this.renderItemText(t,i.getAdditionalText(),a.CSS_CLASS_TEXT);this.renderItemText(t,i.getText(),a.CSS_CLASS_LABEL);t.close("div");t.close("div");t.renderControl(i.getAggregation("_closeButton"));t.close("li")};E.renderItemText=function(t,e,i){t.openStart("div");t.class(i);t.openEnd();t.text(e.slice(0,h.system.phone?e.length:a.DISPLAY_TEXT_MAX_LENGTH));if(!h.system.phone&&e.length>a.DISPLAY_TEXT_MAX_LENGTH){t.text("...")}t.close("div")};var B=c.extend("sap.m.internal.TabStripSelectList",{metadata:{library:"sap.m"},renderer:E});return b});
//# sourceMappingURL=TabStrip.js.map