/**
 * @license Angular v10.0.0-rc.0+108.sha-f6ee911
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵDomAdapter, ɵsetRootDomAdapter, ɵparseCookieValue, ɵgetDOM, DOCUMENT, ɵPLATFORM_BROWSER_ID, CommonModule } from '@angular/common';
export { ɵgetDOM } from '@angular/common';
import { ɵglobal, InjectionToken, ApplicationInitStatus, APP_INITIALIZER, Injector, setTestabilityGetter, ApplicationRef, NgZone, ɵgetDebugNodeR2, NgProbeToken, Optional, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ViewEncapsulation, APP_ID, RendererStyleFlags2, ɵConsole, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule, forwardRef, SecurityContext, ɵallowSanitizationBypassAndThrow, ɵunwrapSafeValue, ɵgetSanitizationBypassType, ɵ_sanitizeUrl, ɵ_sanitizeHtml, ɵbypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl, ErrorHandler, ɵsetDocument, PLATFORM_ID, PLATFORM_INITIALIZER, Sanitizer, createPlatformFactory, platformCore, ɵINJECTOR_SCOPE, RendererFactory2, Testability, ApplicationModule, ɵɵsetNgModuleScope, SkipSelf, Version } from '@angular/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
class GenericBrowserDomAdapter extends ɵDomAdapter {
    constructor() {
        super();
    }
    supportsDOMEvents() {
        return true;
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const nodeContains = (() => {
    if (ɵglobal['Node']) {
        return ɵglobal['Node'].prototype.contains || function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        };
    }
    return undefined;
})();
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType no-console */
class BrowserDomAdapter extends GenericBrowserDomAdapter {
    static makeCurrent() {
        ɵsetRootDomAdapter(new BrowserDomAdapter());
    }
    getProperty(el, name) {
        return el[name];
    }
    log(error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    }
    logGroup(error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    }
    logGroupEnd() {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    }
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return () => {
            el.removeEventListener(evt, listener, false);
        };
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
    }
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    getValue(el) {
        return el.value;
    }
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
        return document;
    }
    isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(node) {
        return node instanceof DocumentFragment;
    }
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return window;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    getHistory() {
        return window.history;
    }
    getLocation() {
        return window.location;
    }
    getBaseHref(doc) {
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    resetBaseElement() {
        baseElement = null;
    }
    getUserAgent() {
        return window.navigator.userAgent;
    }
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    }
    supportsCookies() {
        return true;
    }
    getCookie(name) {
        return ɵparseCookieValue(document.cookie, name);
    }
}
let baseElement = null;
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = document.querySelector('base');
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
let urlParsingNode;
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */
const TRANSITION_ID = new InjectionToken('TRANSITION_ID');
function appInitializerFactory(transitionId, document, injector) {
    return () => {
        // Wait for all application initializers to be completed before removing the styles set by
        // the server.
        injector.get(ApplicationInitStatus).donePromise.then(() => {
            const dom = ɵgetDOM();
            const styles = Array.prototype.slice.apply(document.querySelectorAll(`style[ng-transition]`));
            styles.filter(el => el.getAttribute('ng-transition') === transitionId)
                .forEach(el => dom.remove(el));
        });
    };
}
const SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TRANSITION_ID, DOCUMENT, Injector],
        multi: true
    },
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class BrowserGetTestability {
    static init() {
        setTestabilityGetter(new BrowserGetTestability());
    }
    addToWindow(registry) {
        ɵglobal['getAngularTestability'] = (elem, findInAncestors = true) => {
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        ɵglobal['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        ɵglobal['getAllAngularRootElements'] = () => registry.getAllRootElements();
        const whenAllStable = (callback /** TODO #9100 */) => {
            const testabilities = ɵglobal['getAllAngularTestabilities']();
            let count = testabilities.length;
            let didWork = false;
            const decrement = function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            });
        };
        if (!ɵglobal['frameworkStabilizers']) {
            ɵglobal['frameworkStabilizers'] = [];
        }
        ɵglobal['frameworkStabilizers'].push(whenAllStable);
    }
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (ɵgetDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const CAMEL_CASE_REGEXP = /([A-Z])/g;
const DASH_CASE_REGEXP = /-([a-z])/g;
function camelCaseToDashCase(input) {
    return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}
function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
/**
 * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
 * `name` is `'probe'`.
 * @param name Name under which it will be exported. Keep in mind this will be a property of the
 * global `ng` object.
 * @param value The value to export.
 */
function exportNgVar(name, value) {
    if (typeof COMPILED === 'undefined' || !COMPILED) {
        // Note: we can't export `ng` when using closure enhanced optimization as:
        // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
        // - we can't declare a closure extern as the namespace `ng` is already used within Google
        //   for typings for angularJS (via `goog.provide('ng....')`).
        const ng = ɵglobal['ng'] = ɵglobal['ng'] || {};
        ng[name] = value;
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const CORE_TOKENS = (() => ({
    'ApplicationRef': ApplicationRef,
    'NgZone': NgZone,
}))();
const INSPECT_GLOBAL_NAME = 'probe';
const CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElementR2(element) {
    return ɵgetDebugNodeR2(element);
}
function _createNgProbeR2(coreTokens) {
    exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElementR2);
    exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
    return () => inspectNativeElementR2;
}
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 */
const ELEMENT_PROBE_PROVIDERS__POST_R3__ = [];
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
const ELEMENT_PROBE_PROVIDERS__PRE_R3__ = [
    {
        provide: APP_INITIALIZER,
        useFactory: _createNgProbeR2,
        deps: [
            [NgProbeToken, new Optional()],
        ],
        multi: true,
    },
];
const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */
const EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
let EventManager = /** @class */ (() => {
    class EventManager {
        /**
         * Initializes an instance of the event-manager service.
         */
        constructor(plugins, _zone) {
            this._zone = _zone;
            this._eventNameToPlugin = new Map();
            plugins.forEach(p => p.manager = this);
            this._plugins = plugins.slice().reverse();
        }
        /**
         * Registers a handler for a specific element and event.
         *
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns  A callback function that can be used to remove the handler.
         */
        addEventListener(element, eventName, handler) {
            const plugin = this._findPluginFor(eventName);
            return plugin.addEventListener(element, eventName, handler);
        }
        /**
         * Registers a global handler for an event in a target view.
         *
         * @param target A target for global event notifications. One of "window", "document", or "body".
         * @param eventName The name of the event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns A callback function that can be used to remove the handler.
         */
        addGlobalEventListener(target, eventName, handler) {
            const plugin = this._findPluginFor(eventName);
            return plugin.addGlobalEventListener(target, eventName, handler);
        }
        /**
         * Retrieves the compilation zone in which event listeners are registered.
         */
        getZone() {
            return this._zone;
        }
        /** @internal */
        _findPluginFor(eventName) {
            const plugin = this._eventNameToPlugin.get(eventName);
            if (plugin) {
                return plugin;
            }
            const plugins = this._plugins;
            for (let i = 0; i < plugins.length; i++) {
                const plugin = plugins[i];
                if (plugin.supports(eventName)) {
                    this._eventNameToPlugin.set(eventName, plugin);
                    return plugin;
                }
            }
            throw new Error(`No event manager plugin found for event ${eventName}`);
        }
    }
    EventManager.ɵfac = function EventManager_Factory(t) { return new (t || EventManager)(ɵɵinject(EVENT_MANAGER_PLUGINS), ɵɵinject(NgZone)); };
    EventManager.ɵprov = ɵɵdefineInjectable({ token: EventManager, factory: EventManager.ɵfac });
    return EventManager;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(EventManager, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [EVENT_MANAGER_PLUGINS]
            }] }, { type: NgZone }]; }, null); })();
class EventManagerPlugin {
    constructor(_doc) {
        this._doc = _doc;
    }
    addGlobalEventListener(element, eventName, handler) {
        const target = ɵgetDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let SharedStylesHost = /** @class */ (() => {
    class SharedStylesHost {
        constructor() {
            /** @internal */
            this._stylesSet = new Set();
        }
        addStyles(styles) {
            const additions = new Set();
            styles.forEach(style => {
                if (!this._stylesSet.has(style)) {
                    this._stylesSet.add(style);
                    additions.add(style);
                }
            });
            this.onStylesAdded(additions);
        }
        onStylesAdded(additions) { }
        getAllStyles() {
            return Array.from(this._stylesSet);
        }
    }
    SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) { return new (t || SharedStylesHost)(); };
    SharedStylesHost.ɵprov = ɵɵdefineInjectable({ token: SharedStylesHost, factory: SharedStylesHost.ɵfac });
    return SharedStylesHost;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null); })();
let DomSharedStylesHost = /** @class */ (() => {
    class DomSharedStylesHost extends SharedStylesHost {
        constructor(_doc) {
            super();
            this._doc = _doc;
            this._hostNodes = new Set();
            this._styleNodes = new Set();
            this._hostNodes.add(_doc.head);
        }
        _addStylesToHost(styles, host) {
            styles.forEach((style) => {
                const styleEl = this._doc.createElement('style');
                styleEl.textContent = style;
                this._styleNodes.add(host.appendChild(styleEl));
            });
        }
        addHost(hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        }
        removeHost(hostNode) {
            this._hostNodes.delete(hostNode);
        }
        onStylesAdded(additions) {
            this._hostNodes.forEach(hostNode => this._addStylesToHost(additions, hostNode));
        }
        ngOnDestroy() {
            this._styleNodes.forEach(styleNode => ɵgetDOM().remove(styleNode));
        }
    }
    DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) { return new (t || DomSharedStylesHost)(ɵɵinject(DOCUMENT)); };
    DomSharedStylesHost.ɵprov = ɵɵdefineInjectable({ token: DomSharedStylesHost, factory: DomSharedStylesHost.ɵfac });
    return DomSharedStylesHost;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function flattenStyles(compId, styles, target) {
    for (let i = 0; i < styles.length; i++) {
        let style = styles[i];
        if (Array.isArray(style)) {
            flattenStyles(compId, style, target);
        }
        else {
            style = style.replace(COMPONENT_REGEX, compId);
            target.push(style);
        }
    }
    return target;
}
function decoratePreventDefault(eventHandler) {
    // `DebugNode.triggerEventHandler` needs to know if the listener was created with
    // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
    // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
    // the listener (see below).
    return (event) => {
        // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
        // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
        // can inspect the listener toString contents for the existence of this special token. Because
        // the token is a string literal, it is ensured to not be modified by compiled code.
        if (event === '__ngUnwrap__') {
            return eventHandler;
        }
        const allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
        return undefined;
    };
}
let DomRendererFactory2 = /** @class */ (() => {
    class DomRendererFactory2 {
        constructor(eventManager, sharedStylesHost, appId) {
            this.eventManager = eventManager;
            this.sharedStylesHost = sharedStylesHost;
            this.appId = appId;
            this.rendererByCompId = new Map();
            this.defaultRenderer = new DefaultDomRenderer2(eventManager);
        }
        createRenderer(element, type) {
            if (!element || !type) {
                return this.defaultRenderer;
            }
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated: {
                    let renderer = this.rendererByCompId.get(type.id);
                    if (!renderer) {
                        renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
                        this.rendererByCompId.set(type.id, renderer);
                    }
                    renderer.applyToHost(element);
                    return renderer;
                }
                case ViewEncapsulation.Native:
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
                default: {
                    if (!this.rendererByCompId.has(type.id)) {
                        const styles = flattenStyles(type.id, type.styles, []);
                        this.sharedStylesHost.addStyles(styles);
                        this.rendererByCompId.set(type.id, this.defaultRenderer);
                    }
                    return this.defaultRenderer;
                }
            }
        }
        begin() { }
        end() { }
    }
    DomRendererFactory2.ɵfac = function DomRendererFactory2_Factory(t) { return new (t || DomRendererFactory2)(ɵɵinject(EventManager), ɵɵinject(DomSharedStylesHost), ɵɵinject(APP_ID)); };
    DomRendererFactory2.ɵprov = ɵɵdefineInjectable({ token: DomRendererFactory2, factory: DomRendererFactory2.ɵfac });
    return DomRendererFactory2;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(DomRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: EventManager }, { type: DomSharedStylesHost }, { type: undefined, decorators: [{
                type: Inject,
                args: [APP_ID]
            }] }]; }, null); })();
class DefaultDomRenderer2 {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.data = Object.create(null);
    }
    destroy() { }
    createElement(name, namespace) {
        if (namespace) {
            // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
            // will result in undefined, so we just return the namespace here.
            return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return document.createElement(name);
    }
    createComment(value) {
        return document.createComment(value);
    }
    createText(value) {
        return document.createTextNode(value);
    }
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    }
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            el.textContent = '';
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = namespace + ':' + name;
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.setAttributeNS(namespaceUri, name, value);
            }
            else {
                el.setAttribute(name, value);
            }
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                // TODO(FW-811): Since ivy is passing around full URIs for namespaces
                // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
                // which is wrong.
                el.removeAttribute(`${namespace}:${name}`);
            }
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.setProperty(style, value, !!(flags & RendererStyleFlags2.Important) ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    removeStyle(el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.removeProperty(style);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            el.style[style] = '';
        }
    }
    setProperty(el, name, value) {
        NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback) {
        NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
    }
}
const AT_CHARCODE = (() => '@'.charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, component, appId) {
        super(eventManager);
        this.component = component;
        const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(appId + '-' + component.id);
        this.hostAttr = shimHostAttribute(appId + '-' + component.id);
    }
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, hostEl, component) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.component = component;
        if (component.encapsulation === ViewEncapsulation.ShadowDom) {
            this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        }
        else {
            this.shadowRoot = hostEl.createShadowRoot();
        }
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = flattenStyles(component.id, component.styles, []);
        for (let i = 0; i < styles.length; i++) {
            const styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            this.shadowRoot.appendChild(styleEl);
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
    }
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    removeChild(parent, oldChild) {
        return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
    }
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let DomEventsPlugin = /** @class */ (() => {
    class DomEventsPlugin extends EventManagerPlugin {
        constructor(doc) {
            super(doc);
        }
        // This plugin should come last in the list of plugins, because it accepts all
        // events.
        supports(eventName) {
            return true;
        }
        addEventListener(element, eventName, handler) {
            element.addEventListener(eventName, handler, false);
            return () => this.removeEventListener(element, eventName, handler);
        }
        removeEventListener(target, eventName, callback) {
            return target.removeEventListener(eventName, callback);
        }
    }
    DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) { return new (t || DomEventsPlugin)(ɵɵinject(DOCUMENT)); };
    DomEventsPlugin.ɵprov = ɵɵdefineInjectable({ token: DomEventsPlugin, factory: DomEventsPlugin.ɵfac });
    return DomEventsPlugin;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(DomEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Supported HammerJS recognizer event names.
 */
const EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
/**
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */
const HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */
const HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */
let HammerGestureConfig = /** @class */ (() => {
    class HammerGestureConfig {
        constructor() {
            /**
             * A set of supported event names for gestures to be used in Angular.
             * Angular supports all built-in recognizers, as listed in
             * [HammerJS documentation](http://hammerjs.github.io/).
             */
            this.events = [];
            /**
             * Maps gesture event names to a set of configuration options
             * that specify overrides to the default values for specific properties.
             *
             * The key is a supported event name to be configured,
             * and the options object contains a set of properties, with override values
             * to be applied to the named recognizer event.
             * For example, to disable recognition of the rotate event, specify
             *  `{"rotate": {"enable": false}}`.
             *
             * Properties that are not present take the HammerJS default values.
             * For information about which properties are supported for which events,
             * and their allowed and default values, see
             * [HammerJS documentation](http://hammerjs.github.io/).
             *
             */
            this.overrides = {};
        }
        /**
         * Creates a [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
         * and attaches it to a given HTML element.
         * @param element The element that will recognize gestures.
         * @returns A HammerJS event-manager object.
         */
        buildHammer(element) {
            const mc = new Hammer(element, this.options);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            for (const eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        }
    }
    HammerGestureConfig.ɵfac = function HammerGestureConfig_Factory(t) { return new (t || HammerGestureConfig)(); };
    HammerGestureConfig.ɵprov = ɵɵdefineInjectable({ token: HammerGestureConfig, factory: HammerGestureConfig.ɵfac });
    return HammerGestureConfig;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(HammerGestureConfig, [{
        type: Injectable
    }], null, null); })();
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
let HammerGesturesPlugin = /** @class */ (() => {
    class HammerGesturesPlugin extends EventManagerPlugin {
        constructor(doc, _config, console, loader) {
            super(doc);
            this._config = _config;
            this.console = console;
            this.loader = loader;
        }
        supports(eventName) {
            if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
                return false;
            }
            if (!window.Hammer && !this.loader) {
                this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` +
                    `loaded and no custom loader has been specified.`);
                return false;
            }
            return true;
        }
        addEventListener(element, eventName, handler) {
            const zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            // If Hammer is not present but a loader is specified, we defer adding the event listener
            // until Hammer is loaded.
            if (!window.Hammer && this.loader) {
                // This `addEventListener` method returns a function to remove the added listener.
                // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
                // than remove anything.
                let cancelRegistration = false;
                let deregister = () => {
                    cancelRegistration = true;
                };
                this.loader()
                    .then(() => {
                    // If Hammer isn't actually loaded when the custom loader resolves, give up.
                    if (!window.Hammer) {
                        this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                        deregister = () => { };
                        return;
                    }
                    if (!cancelRegistration) {
                        // Now that Hammer is loaded and the listener is being loaded for real,
                        // the deregistration function changes from canceling registration to removal.
                        deregister = this.addEventListener(element, eventName, handler);
                    }
                })
                    .catch(() => {
                    this.console.warn(`The "${eventName}" event cannot be bound because the custom ` +
                        `Hammer.JS loader failed.`);
                    deregister = () => { };
                });
                // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
                // can change the behavior of `deregister` once the listener is added. Using a closure in
                // this way allows us to avoid any additional data structures to track listener removal.
                return () => {
                    deregister();
                };
            }
            return zone.runOutsideAngular(() => {
                // Creating the manager bind events, must be done outside of angular
                const mc = this._config.buildHammer(element);
                const callback = function (eventObj) {
                    zone.runGuarded(function () {
                        handler(eventObj);
                    });
                };
                mc.on(eventName, callback);
                return () => {
                    mc.off(eventName, callback);
                    // destroy mc to prevent memory leak
                    if (typeof mc.destroy === 'function') {
                        mc.destroy();
                    }
                };
            });
        }
        isCustomEvent(eventName) {
            return this._config.events.indexOf(eventName) > -1;
        }
    }
    HammerGesturesPlugin.ɵfac = function HammerGesturesPlugin_Factory(t) { return new (t || HammerGesturesPlugin)(ɵɵinject(DOCUMENT), ɵɵinject(HAMMER_GESTURE_CONFIG), ɵɵinject(ɵConsole), ɵɵinject(HAMMER_LOADER, 8)); };
    HammerGesturesPlugin.ɵprov = ɵɵdefineInjectable({ token: HammerGesturesPlugin, factory: HammerGesturesPlugin.ɵfac });
    return HammerGesturesPlugin;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(HammerGesturesPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: HammerGestureConfig, decorators: [{
                type: Inject,
                args: [HAMMER_GESTURE_CONFIG]
            }] }, { type: ɵConsole }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [HAMMER_LOADER]
            }] }]; }, null); })();
/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */
const HAMMER_PROVIDERS__POST_R3__ = [];
/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */
const HAMMER_PROVIDERS__PRE_R3__ = [
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, ɵConsole, [new Optional(), HAMMER_LOADER]]
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] },
];
const HAMMER_PROVIDERS = HAMMER_PROVIDERS__POST_R3__;
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */
let HammerModule = /** @class */ (() => {
    class HammerModule {
    }
    HammerModule.ɵmod = ɵɵdefineNgModule({ type: HammerModule });
    HammerModule.ɵinj = ɵɵdefineInjector({ factory: function HammerModule_Factory(t) { return new (t || HammerModule)(); }, providers: HAMMER_PROVIDERS__PRE_R3__ });
    return HammerModule;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(HammerModule, [{
        type: NgModule,
        args: [{ providers: HAMMER_PROVIDERS__PRE_R3__ }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines supported modifiers for key events.
 */
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
const _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
const _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */
let KeyEventsPlugin = /** @class */ (() => {
    class KeyEventsPlugin extends EventManagerPlugin {
        /**
         * Initializes an instance of the browser plug-in.
         * @param doc The document in which key events will be detected.
         */
        constructor(doc) {
            super(doc);
        }
        /**
         * Reports whether a named key event is supported.
         * @param eventName The event name to query.
         * @return True if the named key event is supported.
         */
        supports(eventName) {
            return KeyEventsPlugin.parseEventName(eventName) != null;
        }
        /**
         * Registers a handler for a specific element and key event.
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the key event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns The key event that was registered.
         */
        addEventListener(element, eventName, handler) {
            const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => {
                return ɵgetDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
            });
        }
        static parseEventName(eventName) {
            const parts = eventName.toLowerCase().split('.');
            const domEventName = parts.shift();
            if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
                return null;
            }
            const key = KeyEventsPlugin._normalizeKey(parts.pop());
            let fullKey = '';
            MODIFIER_KEYS.forEach(modifierName => {
                const index = parts.indexOf(modifierName);
                if (index > -1) {
                    parts.splice(index, 1);
                    fullKey += modifierName + '.';
                }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
                // returning null instead of throwing to let another plugin process the event
                return null;
            }
            const result = {};
            result['domEventName'] = domEventName;
            result['fullKey'] = fullKey;
            return result;
        }
        static getEventFullKey(event) {
            let fullKey = '';
            let key = getEventKey(event);
            key = key.toLowerCase();
            if (key === ' ') {
                key = 'space'; // for readability
            }
            else if (key === '.') {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            MODIFIER_KEYS.forEach(modifierName => {
                if (modifierName != key) {
                    const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            fullKey += key;
            return fullKey;
        }
        /**
         * Configures a handler callback for a key event.
         * @param fullKey The event name that combines all simultaneous keystrokes.
         * @param handler The function that responds to the key event.
         * @param zone The zone in which the event occurred.
         * @returns A callback function.
         */
        static eventCallback(fullKey, handler, zone) {
            return (event /** TODO #9100 */) => {
                if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                    zone.runGuarded(() => handler(event));
                }
            };
        }
        /** @internal */
        static _normalizeKey(keyName) {
            // TODO: switch to a Map if the mapping grows too much
            switch (keyName) {
                case 'esc':
                    return 'escape';
                default:
                    return keyName;
            }
        }
    }
    KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) { return new (t || KeyEventsPlugin)(ɵɵinject(DOCUMENT)); };
    KeyEventsPlugin.ɵprov = ɵɵdefineInjectable({ token: KeyEventsPlugin, factory: KeyEventsPlugin.ɵfac });
    return KeyEventsPlugin;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(KeyEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
function getEventKey(event) {
    let key = event.key;
    if (key == null) {
        key = event.keyIdentifier;
        // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
        // Safari cf
        // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
        if (key == null) {
            return 'Unidentified';
        }
        if (key.startsWith('U+')) {
            key = String.fromCharCode(parseInt(key.substring(2), 16));
            if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                // There is a bug in Chrome for numeric keypad keys:
                // https://code.google.com/p/chromium/issues/detail?id=155654
                // 1, 2, 3 ... are reported as A, B, C ...
                key = _chromeNumKeyPadMap[key];
            }
        }
    }
    return _keyMap[key] || key;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
let DomSanitizer = /** @class */ (() => {
    class DomSanitizer {
    }
    DomSanitizer.ɵfac = function DomSanitizer_Factory(t) { return new (t || DomSanitizer)(); };
    DomSanitizer.ɵprov = ɵɵdefineInjectable({ token: DomSanitizer, factory: function DomSanitizer_Factory(t) { var r = null; if (t) {
            r = new (t || DomSanitizer)();
        }
        else {
            r = ɵɵinject(DomSanitizerImpl);
        } return r; }, providedIn: 'root' });
    return DomSanitizer;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(DomSanitizer, [{
        type: Injectable,
        args: [{ providedIn: 'root', useExisting: forwardRef(() => DomSanitizerImpl) }]
    }], null, null); })();
function domSanitizerImplFactory(injector) {
    return new DomSanitizerImpl(injector.get(DOCUMENT));
}
let DomSanitizerImpl = /** @class */ (() => {
    class DomSanitizerImpl extends DomSanitizer {
        constructor(_doc) {
            super();
            this._doc = _doc;
        }
        sanitize(ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case SecurityContext.NONE:
                    return value;
                case SecurityContext.HTML:
                    if (ɵallowSanitizationBypassAndThrow(value, "HTML" /* Html */)) {
                        return ɵunwrapSafeValue(value);
                    }
                    return ɵ_sanitizeHtml(this._doc, String(value));
                case SecurityContext.STYLE:
                    if (ɵallowSanitizationBypassAndThrow(value, "Style" /* Style */)) {
                        return ɵunwrapSafeValue(value);
                    }
                    return value;
                case SecurityContext.SCRIPT:
                    if (ɵallowSanitizationBypassAndThrow(value, "Script" /* Script */)) {
                        return ɵunwrapSafeValue(value);
                    }
                    throw new Error('unsafe value used in a script context');
                case SecurityContext.URL:
                    const type = ɵgetSanitizationBypassType(value);
                    if (ɵallowSanitizationBypassAndThrow(value, "URL" /* Url */)) {
                        return ɵunwrapSafeValue(value);
                    }
                    return ɵ_sanitizeUrl(String(value));
                case SecurityContext.RESOURCE_URL:
                    if (ɵallowSanitizationBypassAndThrow(value, "ResourceURL" /* ResourceUrl */)) {
                        return ɵunwrapSafeValue(value);
                    }
                    throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
                default:
                    throw new Error(`Unexpected SecurityContext ${ctx} (see http://g.co/ng/security#xss)`);
            }
        }
        bypassSecurityTrustHtml(value) {
            return ɵbypassSanitizationTrustHtml(value);
        }
        bypassSecurityTrustStyle(value) {
            return ɵbypassSanitizationTrustStyle(value);
        }
        bypassSecurityTrustScript(value) {
            return ɵbypassSanitizationTrustScript(value);
        }
        bypassSecurityTrustUrl(value) {
            return ɵbypassSanitizationTrustUrl(value);
        }
        bypassSecurityTrustResourceUrl(value) {
            return ɵbypassSanitizationTrustResourceUrl(value);
        }
    }
    DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) { return new (t || DomSanitizerImpl)(ɵɵinject(DOCUMENT)); };
    DomSanitizerImpl.ɵprov = ɵɵdefineInjectable({ token: DomSanitizerImpl, factory: function DomSanitizerImpl_Factory(t) { var r = null; if (t) {
            r = new t();
        }
        else {
            r = domSanitizerImplFactory(ɵɵinject(Injector));
        } return r; }, providedIn: 'root' });
    return DomSanitizerImpl;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(DomSanitizerImpl, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: domSanitizerImplFactory, deps: [Injector] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
function errorHandler() {
    return new ErrorHandler();
}
function _document() {
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
const BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl, deps: [DOCUMENT] },
];
const BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @publicApi
 */
const BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__POST_R3__;
/**
 * @publicApi
 */
const platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
const BROWSER_MODULE_PROVIDERS = [
    BROWSER_SANITIZATION_PROVIDERS,
    { provide: ɵINJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID]
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    HAMMER_PROVIDERS,
    {
        provide: DomRendererFactory2,
        useClass: DomRendererFactory2,
        deps: [EventManager, DomSharedStylesHost, APP_ID]
    },
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
    { provide: DomSharedStylesHost, useClass: DomSharedStylesHost, deps: [DOCUMENT] },
    { provide: Testability, useClass: Testability, deps: [NgZone] },
    { provide: EventManager, useClass: EventManager, deps: [EVENT_MANAGER_PLUGINS, NgZone] },
    ELEMENT_PROBE_PROVIDERS,
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
let BrowserModule = /** @class */ (() => {
    class BrowserModule {
        constructor(parentModule) {
            if (parentModule) {
                throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
            }
        }
        /**
         * Configures a browser-based app to transition from a server-rendered app, if
         * one is present on the page.
         *
         * @param params An object containing an identifier for the app to transition.
         * The ID must match between the client and server versions of the app.
         * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
         */
        static withServerTransition(params) {
            return {
                ngModule: BrowserModule,
                providers: [
                    { provide: APP_ID, useValue: params.appId },
                    { provide: TRANSITION_ID, useExisting: APP_ID },
                    SERVER_TRANSITION_PROVIDERS,
                ],
            };
        }
    }
    BrowserModule.ɵmod = ɵɵdefineNgModule({ type: BrowserModule });
    BrowserModule.ɵinj = ɵɵdefineInjector({ factory: function BrowserModule_Factory(t) { return new (t || BrowserModule)(ɵɵinject(BrowserModule, 12)); }, providers: BROWSER_MODULE_PROVIDERS, imports: [CommonModule, ApplicationModule] });
    return BrowserModule;
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BrowserModule, { exports: [CommonModule, ApplicationModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BrowserModule, [{
        type: NgModule,
        args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [CommonModule, ApplicationModule] }]
    }], function () { return [{ type: BrowserModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }, {
                type: Inject,
                args: [BrowserModule]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Factory to create Meta service.
 */
function createMeta() {
    return new Meta(ɵɵinject(DOCUMENT));
}
/**
 * A service that can be used to get and add meta tags.
 *
 * @publicApi
 */
let Meta = /** @class */ (() => {
    class Meta {
        constructor(_doc) {
            this._doc = _doc;
            this._dom = ɵgetDOM();
        }
        addTag(tag, forceCreation = false) {
            if (!tag)
                return null;
            return this._getOrCreateElement(tag, forceCreation);
        }
        addTags(tags, forceCreation = false) {
            if (!tags)
                return [];
            return tags.reduce((result, tag) => {
                if (tag) {
                    result.push(this._getOrCreateElement(tag, forceCreation));
                }
                return result;
            }, []);
        }
        getTag(attrSelector) {
            if (!attrSelector)
                return null;
            return this._doc.querySelector(`meta[${attrSelector}]`) || null;
        }
        getTags(attrSelector) {
            if (!attrSelector)
                return [];
            const list /*NodeList*/ = this._doc.querySelectorAll(`meta[${attrSelector}]`);
            return list ? [].slice.call(list) : [];
        }
        updateTag(tag, selector) {
            if (!tag)
                return null;
            selector = selector || this._parseSelector(tag);
            const meta = this.getTag(selector);
            if (meta) {
                return this._setMetaElementAttributes(tag, meta);
            }
            return this._getOrCreateElement(tag, true);
        }
        removeTag(attrSelector) {
            this.removeTagElement(this.getTag(attrSelector));
        }
        removeTagElement(meta) {
            if (meta) {
                this._dom.remove(meta);
            }
        }
        _getOrCreateElement(meta, forceCreation = false) {
            if (!forceCreation) {
                const selector = this._parseSelector(meta);
                const elem = this.getTag(selector);
                // It's allowed to have multiple elements with the same name so it's not enough to
                // just check that element with the same name already present on the page. We also need to
                // check if element has tag attributes
                if (elem && this._containsAttributes(meta, elem))
                    return elem;
            }
            const element = this._dom.createElement('meta');
            this._setMetaElementAttributes(meta, element);
            const head = this._doc.getElementsByTagName('head')[0];
            head.appendChild(element);
            return element;
        }
        _setMetaElementAttributes(tag, el) {
            Object.keys(tag).forEach((prop) => el.setAttribute(prop, tag[prop]));
            return el;
        }
        _parseSelector(tag) {
            const attr = tag.name ? 'name' : 'property';
            return `${attr}="${tag[attr]}"`;
        }
        _containsAttributes(tag, elem) {
            return Object.keys(tag).every((key) => elem.getAttribute(key) === tag[key]);
        }
    }
    Meta.ɵfac = function Meta_Factory(t) { return new (t || Meta)(ɵɵinject(DOCUMENT)); };
    Meta.ɵprov = ɵɵdefineInjectable({ token: Meta, factory: function Meta_Factory(t) { var r = null; if (t) {
            r = new t();
        }
        else {
            r = createMeta();
        } return r; }, providedIn: 'root' });
    return Meta;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(Meta, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createMeta, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Factory to create Title service.
 */
function createTitle() {
    return new Title(ɵɵinject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */
let Title = /** @class */ (() => {
    class Title {
        constructor(_doc) {
            this._doc = _doc;
        }
        /**
         * Get the title of the current HTML document.
         */
        getTitle() {
            return this._doc.title;
        }
        /**
         * Set the title of the current HTML document.
         * @param newTitle
         */
        setTitle(newTitle) {
            this._doc.title = newTitle || '';
        }
    }
    Title.ɵfac = function Title_Factory(t) { return new (t || Title)(ɵɵinject(DOCUMENT)); };
    Title.ɵprov = ɵɵdefineInjectable({ token: Title, factory: function Title_Factory(t) { var r = null; if (t) {
            r = new t();
        }
        else {
            r = createTitle();
        } return r; }, providedIn: 'root' });
    return Title;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(Title, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createTitle, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const win = typeof window !== 'undefined' && window || {};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class ChangeDetectionPerfRecord {
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
class AngularProfiler {
    constructor(ref) {
        this.appRef = ref.injector.get(ApplicationRef);
    }
    // tslint:disable:no-console
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    timeChangeDetection(config) {
        const record = config && config['record'];
        const profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        const isProfilerAvailable = win.console.profile != null;
        if (record && isProfilerAvailable) {
            win.console.profile(profileName);
        }
        const start = ɵgetDOM().performanceNow();
        let numTicks = 0;
        while (numTicks < 5 || (ɵgetDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        const end = ɵgetDOM().performanceNow();
        if (record && isProfilerAvailable) {
            win.console.profileEnd(profileName);
        }
        const msPerTick = (end - start) / numTicks;
        win.console.log(`ran ${numTicks} change detection cycles`);
        win.console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const PROFILER_GLOBAL_NAME = 'profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */
function enableDebugTools(ref) {
    exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
    return ref;
}
/**
 * Disables Angular tools.
 *
 * @publicApi
 */
function disableDebugTools() {
    exportNgVar(PROFILER_GLOBAL_NAME, null);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function escapeHtml(text) {
    const escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;',
    };
    return text.replace(/[&"'<>]/g, s => escapedText[s]);
}
function unescapeHtml(text) {
    const unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>',
    };
    return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
function makeStateKey(key) {
    return key;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialzied in a
 * non-lossy manner.
 *
 * @publicApi
 */
let TransferState = /** @class */ (() => {
    class TransferState {
        constructor() {
            this.store = {};
            this.onSerializeCallbacks = {};
        }
        /** @internal */
        static init(initState) {
            const transferState = new TransferState();
            transferState.store = initState;
            return transferState;
        }
        /**
         * Get the value corresponding to a key. Return `defaultValue` if key is not found.
         */
        get(key, defaultValue) {
            return this.store[key] !== undefined ? this.store[key] : defaultValue;
        }
        /**
         * Set the value corresponding to a key.
         */
        set(key, value) {
            this.store[key] = value;
        }
        /**
         * Remove a key from the store.
         */
        remove(key) {
            delete this.store[key];
        }
        /**
         * Test whether a key exists in the store.
         */
        hasKey(key) {
            return this.store.hasOwnProperty(key);
        }
        /**
         * Register a callback to provide the value for a key when `toJson` is called.
         */
        onSerialize(key, callback) {
            this.onSerializeCallbacks[key] = callback;
        }
        /**
         * Serialize the current state of the store to JSON.
         */
        toJson() {
            // Call the onSerialize callbacks and put those values into the store.
            for (const key in this.onSerializeCallbacks) {
                if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                    try {
                        this.store[key] = this.onSerializeCallbacks[key]();
                    }
                    catch (e) {
                        console.warn('Exception in onSerialize callback: ', e);
                    }
                }
            }
            return JSON.stringify(this.store);
        }
    }
    TransferState.ɵfac = function TransferState_Factory(t) { return new (t || TransferState)(); };
    TransferState.ɵprov = ɵɵdefineInjectable({ token: TransferState, factory: TransferState.ɵfac });
    return TransferState;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(TransferState, [{
        type: Injectable
    }], null, null); })();
function initTransferState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
    let initialState = {};
    if (script && script.textContent) {
        try {
            initialState = JSON.parse(unescapeHtml(script.textContent));
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
let BrowserTransferStateModule = /** @class */ (() => {
    class BrowserTransferStateModule {
    }
    BrowserTransferStateModule.ɵmod = ɵɵdefineNgModule({ type: BrowserTransferStateModule });
    BrowserTransferStateModule.ɵinj = ɵɵdefineInjector({ factory: function BrowserTransferStateModule_Factory(t) { return new (t || BrowserTransferStateModule)(); }, providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }] });
    return BrowserTransferStateModule;
})();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BrowserTransferStateModule, [{
        type: NgModule,
        args: [{
                providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */
class By {
    /**
     * Match all nodes.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all() {
        return () => true;
    }
    /**
     * Match elements by the given CSS selector.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector) {
        return (debugElement) => {
            return debugElement.nativeElement != null ?
                elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    }
    /**
     * Match nodes that have the given directive present.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type) {
        return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
    }
}
function elementMatches(n, selector) {
    if (ɵgetDOM().isElementNode(n)) {
        return n.matches && n.matches(selector) ||
            n.msMatchesSelector && n.msMatchesSelector(selector) ||
            n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
    }
    return false;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @publicApi
 */
const VERSION = new Version('10.0.0-rc.0+108.sha-f6ee911');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { BrowserModule, BrowserTransferStateModule, By, DomSanitizer, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig, HammerModule, Meta, Title, TransferState, VERSION, disableDebugTools, enableDebugTools, makeStateKey, platformBrowser, BROWSER_SANITIZATION_PROVIDERS as ɵBROWSER_SANITIZATION_PROVIDERS, BROWSER_SANITIZATION_PROVIDERS__POST_R3__ as ɵBROWSER_SANITIZATION_PROVIDERS__POST_R3__, BrowserDomAdapter as ɵBrowserDomAdapter, BrowserGetTestability as ɵBrowserGetTestability, DomEventsPlugin as ɵDomEventsPlugin, DomRendererFactory2 as ɵDomRendererFactory2, DomSanitizerImpl as ɵDomSanitizerImpl, DomSharedStylesHost as ɵDomSharedStylesHost, ELEMENT_PROBE_PROVIDERS as ɵELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS__POST_R3__ as ɵELEMENT_PROBE_PROVIDERS__POST_R3__, HAMMER_PROVIDERS__POST_R3__ as ɵHAMMER_PROVIDERS__POST_R3__, HammerGesturesPlugin as ɵHammerGesturesPlugin, INTERNAL_BROWSER_PLATFORM_PROVIDERS as ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, KeyEventsPlugin as ɵKeyEventsPlugin, NAMESPACE_URIS as ɵNAMESPACE_URIS, SharedStylesHost as ɵSharedStylesHost, TRANSITION_ID as ɵTRANSITION_ID, escapeHtml as ɵescapeHtml, flattenStyles as ɵflattenStyles, initDomAdapter as ɵinitDomAdapter, shimContentAttribute as ɵshimContentAttribute, shimHostAttribute as ɵshimHostAttribute };
//# sourceMappingURL=platform-browser.js.map
