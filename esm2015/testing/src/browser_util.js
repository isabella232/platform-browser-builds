/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
/** @type {?} */
export let browserDetection;
export class BrowserDetection {
    /**
     * @return {?}
     */
    get _ua() {
        if (typeof this._overrideUa === 'string') {
            return this._overrideUa;
        }
        return getDOM() ? getDOM().getUserAgent() : '';
    }
    /**
     * @return {?}
     */
    static setup() { browserDetection = new BrowserDetection(null); }
    /**
     * @param {?} ua
     */
    constructor(ua) { this._overrideUa = ua; }
    /**
     * @return {?}
     */
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    /**
     * @return {?}
     */
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    /**
     * @return {?}
     */
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    /**
     * @return {?}
     */
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isIOS7() {
        return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    /**
     * @return {?}
     */
    get supportsNativeIntlApi() {
        return !!(/** @type {?} */ (global)).Intl && (/** @type {?} */ (global)).Intl !== (/** @type {?} */ (global)).IntlPolyfill;
    }
    /**
     * @return {?}
     */
    get isChromeDesktop() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    /**
     * @return {?}
     */
    get isOldChrome() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    /**
     * @return {?}
     */
    get supportsCustomElements() { return (typeof (/** @type {?} */ (global)).customElements !== 'undefined'); }
    /**
     * @return {?}
     */
    get supportsDeprecatedCustomCustomElementsV0() {
        return (typeof (/** @type {?} */ (document)).registerElement !== 'undefined');
    }
    /**
     * @return {?}
     */
    get supportsRegExUnicodeFlag() { return RegExp.prototype.hasOwnProperty('unicode'); }
    /**
     * @return {?}
     */
    get supportsShadowDom() {
        /** @type {?} */
        const testEl = document.createElement('div');
        return (typeof testEl.attachShadow !== 'undefined');
    }
    /**
     * @return {?}
     */
    get supportsDeprecatedShadowDomV0() {
        /** @type {?} */
        const testEl = /** @type {?} */ (document.createElement('div'));
        return (typeof testEl.createShadowRoot !== 'undefined');
    }
}
if (false) {
    /** @type {?} */
    BrowserDetection.prototype._overrideUa;
}
BrowserDetection.setup();
/**
 * @param {?} element
 * @param {?} eventType
 * @return {?}
 */
export function dispatchEvent(element, eventType) {
    getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}
/**
 * @param {?} html
 * @return {?}
 */
export function el(html) {
    return /** @type {?} */ (getDOM().firstChild(getDOM().content(getDOM().createTemplate(html))));
}
/**
 * @param {?} css
 * @return {?}
 */
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (...match) => `url("${match[2]}")`)
        .replace(/\[(.+)=([^"\]]+)\]/g, (...match) => `[${match[1]}="${match[2]}"]`);
}
/** @type {?} */
const _singleTagWhitelist = ['br', 'hr', 'input'];
/**
 * @param {?} el
 * @return {?}
 */
export function stringifyElement(el /** TODO #9100 */) {
    /** @type {?} */
    let result = '';
    if (getDOM().isElementNode(el)) {
        /** @type {?} */
        const tagName = getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        /** @type {?} */
        const attributeMap = getDOM().attributeMap(el);
        /** @type {?} */
        const sortedKeys = Array.from(attributeMap.keys()).sort();
        for (const key of sortedKeys) {
            /** @type {?} */
            const lowerCaseKey = key.toLowerCase();
            /** @type {?} */
            let attValue = attributeMap.get(key);
            if (typeof attValue !== 'string') {
                result += ` ${lowerCaseKey}`;
            }
            else {
                // Browsers order style rules differently. Order them alphabetically for consistency.
                if (lowerCaseKey === 'style') {
                    attValue = attValue.split(/; ?/).filter(s => !!s).sort().map(s => `${s};`).join(' ');
                }
                result += ` ${lowerCaseKey}="${attValue}"`;
            }
        }
        result += '>';
        /** @type {?} */
        const childrenRoot = getDOM().templateAwareRoot(el);
        /** @type {?} */
        const children = childrenRoot ? getDOM().childNodes(childrenRoot) : [];
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_singleTagWhitelist.indexOf(tagName) == -1) {
            result += `</${tagName}>`;
        }
    }
    else if (getDOM().isCommentNode(el)) {
        result += `<!--${getDOM().nodeValue(el)}-->`;
    }
    else {
        result += getDOM().getText(el);
    }
    return result;
}
/**
 * @return {?}
 */
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFNUQsV0FBVyxnQkFBZ0IsQ0FBbUI7QUFFOUMsTUFBTSxPQUFPLGdCQUFnQjs7OztRQUVmLEdBQUc7UUFDYixJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Ozs7SUFHakQsTUFBTSxDQUFDLEtBQUssS0FBSyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFakUsWUFBWSxFQUFlLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRTs7OztJQUV2RCxJQUFJLFNBQVMsS0FBYyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFckUsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0Us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ZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ1pvbmUsIMm1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmV4cG9ydCBsZXQgYnJvd3NlckRldGVjdGlvbjogQnJvd3NlckRldGVjdGlvbjtcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEZXRlY3Rpb24ge1xuICBwcml2YXRlIF9vdmVycmlkZVVhOiBzdHJpbmd8bnVsbDtcbiAgcHJpdmF0ZSBnZXQgX3VhKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vdmVycmlkZVVhID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX292ZXJyaWRlVWE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERPTSgpID8gZ2V0RE9NKCkuZ2V0VXNlckFnZW50KCkgOiAnJztcbiAgfVxuXG4gIHN0YXRpYyBzZXR1cCgpIHsgYnJvd3NlckRldGVjdGlvbiA9IG5ldyBCcm93c2VyRGV0ZWN0aW9uKG51bGwpOyB9XG5cbiAgY29uc3RydWN0b3IodWE6IHN0cmluZ3xudWxsKSB7IHRoaXMuX292ZXJyaWRlVWEgPSB1YTsgfVxuXG4gIGdldCBpc0ZpcmVmb3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdGaXJlZm94JykgPiAtMTsgfVxuXG4gIGdldCBpc0FuZHJvaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdBbmRyb2lkJykgPiAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0VkZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPiAtMTsgfVxuXG4gIGdldCBpc0lFKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignVHJpZGVudCcpID4gLTE7IH1cblxuICBnZXQgaXNXZWJraXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0lPUzcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl91YS5pbmRleE9mKCdpUGhvbmUgT1MgNycpID4gLTEgfHwgdGhpcy5fdWEuaW5kZXhPZignaVBhZCBPUyA3JykgPiAtMSkgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc1Nsb3coKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzQW5kcm9pZCB8fCB0aGlzLmlzSUUgfHwgdGhpcy5pc0lPUzc7IH1cblxuICAvLyBUaGUgSW50bCBBUEkgaXMgb25seSBuYXRpdmVseSBzdXBwb3J0ZWQgaW4gQ2hyb21lLCBGaXJlZm94LCBJRTExIGFuZCBFZGdlLlxuICAvLyBUaGlzIGRldGVjdG9yIGlzIG5lZWRlZCBpbiB0ZXN0cyB0byBtYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW46XG4gIC8vIDEpIElFMTEvRWRnZTogdGhleSBoYXZlIGEgbmF0aXZlIEludGwgQVBJLCBidXQgd2l0aCBzb21lIGRpc2NyZXBhbmNpZXNcbiAgLy8gMikgSUU5L0lFMTA6IHRoZXkgdXNlIHRoZSBwb2x5ZmlsbCwgYW5kIHNvIG5vIGRpc2NyZXBhbmNpZXNcbiAgZ2V0IHN1cHBvcnRzTmF0aXZlSW50bEFwaSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoPGFueT5nbG9iYWwpLkludGwgJiYgKDxhbnk+Z2xvYmFsKS5JbnRsICE9PSAoPGFueT5nbG9iYWwpLkludGxQb2x5ZmlsbDtcbiAgfVxuXG4gIGdldCBpc0Nocm9tZURlc2t0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIC8vIFwiT2xkIENocm9tZVwiIG1lYW5zIENocm9tZSAzWCwgd2hlcmUgdGhlcmUgYXJlIHNvbWUgZGlzY3JlcGFuY2llcyBpbiB0aGUgSW50bCBBUEkuXG4gIC8vIEFuZHJvaWQgNC40IGFuZCA1LlggaGF2ZSBzdWNoIGJyb3dzZXJzIGJ5IGRlZmF1bHQgKHJlc3BlY3RpdmVseSAzMCBhbmQgMzkpLlxuICBnZXQgaXNPbGRDaHJvbWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lLzMnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0N1c3RvbUVsZW1lbnRzKCkgeyByZXR1cm4gKHR5cGVvZig8YW55Pmdsb2JhbCkuY3VzdG9tRWxlbWVudHMgIT09ICd1bmRlZmluZWQnKTsgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRDdXN0b21DdXN0b21FbGVtZW50c1YwKCkge1xuICAgIHJldHVybiAodHlwZW9mKGRvY3VtZW50IGFzIGFueSkucmVnaXN0ZXJFbGVtZW50ICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBnZXQgc3VwcG9ydHNSZWdFeFVuaWNvZGVGbGFnKCk6IGJvb2xlYW4geyByZXR1cm4gUmVnRXhwLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgndW5pY29kZScpOyB9XG5cbiAgZ2V0IHN1cHBvcnRzU2hhZG93RG9tKCkge1xuICAgIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiAodHlwZW9mIHRlc3RFbC5hdHRhY2hTaGFkb3cgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRTaGFkb3dEb21WMCgpIHtcbiAgICBjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBhbnk7XG4gICAgcmV0dXJuICh0eXBlb2YgdGVzdEVsLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxufVxuXG5Ccm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUeXBlOiBhbnkpOiB2b2lkIHtcbiAgZ2V0RE9NKCkuZGlzcGF0Y2hFdmVudChlbGVtZW50LCBnZXRET00oKS5jcmVhdGVFdmVudChldmVudFR5cGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsKGh0bWw6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgcmV0dXJuIDxIVE1MRWxlbWVudD5nZXRET00oKS5maXJzdENoaWxkKGdldERPTSgpLmNvbnRlbnQoZ2V0RE9NKCkuY3JlYXRlVGVtcGxhdGUoaHRtbCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNTUyhjc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjc3MucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvOlxccy9nLCAnOicpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnXCInKVxuICAgICAgLnJlcGxhY2UoLyB9L2csICd9JylcbiAgICAgIC5yZXBsYWNlKC91cmxcXCgoXFxcInxcXHMpKC4rKShcXFwifFxccylcXCkoXFxzKikvZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYHVybChcIiR7bWF0Y2hbMl19XCIpYClcbiAgICAgIC5yZXBsYWNlKC9cXFsoLispPShbXlwiXFxdXSspXFxdL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGBbJHttYXRjaFsxXX09XCIke21hdGNoWzJdfVwiXWApO1xufVxuXG5jb25zdCBfc2luZ2xlVGFnV2hpdGVsaXN0ID0gWydicicsICdocicsICdpbnB1dCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVsZW1lbnQoZWw6IGFueSAvKiogVE9ETyAjOTEwMCAqLyk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IGdldERPTSgpLnRhZ05hbWUoZWwpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBPcGVuaW5nIHRhZ1xuICAgIHJlc3VsdCArPSBgPCR7dGFnTmFtZX1gO1xuXG4gICAgLy8gQXR0cmlidXRlcyBpbiBhbiBvcmRlcmVkIHdheVxuICAgIGNvbnN0IGF0dHJpYnV0ZU1hcCA9IGdldERPTSgpLmF0dHJpYnV0ZU1hcChlbCk7XG4gICAgY29uc3Qgc29ydGVkS2V5cyA9IEFycmF5LmZyb20oYXR0cmlidXRlTWFwLmtleXMoKSkuc29ydCgpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHNvcnRlZEtleXMpIHtcbiAgICAgIGNvbnN0IGxvd2VyQ2FzZUtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgbGV0IGF0dFZhbHVlID0gYXR0cmlidXRlTWFwLmdldChrZXkpO1xuXG4gICAgICBpZiAodHlwZW9mIGF0dFZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgb3JkZXIgc3R5bGUgcnVsZXMgZGlmZmVyZW50bHkuIE9yZGVyIHRoZW0gYWxwaGFiZXRpY2FsbHkgZm9yIGNvbnNpc3RlbmN5LlxuICAgICAgICBpZiAobG93ZXJDYXNlS2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgYXR0VmFsdWUgPSBhdHRWYWx1ZS5zcGxpdCgvOyA/LykuZmlsdGVyKHMgPT4gISFzKS5zb3J0KCkubWFwKHMgPT4gYCR7c307YCkuam9pbignICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ICs9IGAgJHtsb3dlckNhc2VLZXl9PVwiJHthdHRWYWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPic7XG5cbiAgICAvLyBDaGlsZHJlblxuICAgIGNvbnN0IGNoaWxkcmVuUm9vdCA9IGdldERPTSgpLnRlbXBsYXRlQXdhcmVSb290KGVsKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNoaWxkcmVuUm9vdCA/IGdldERPTSgpLmNoaWxkTm9kZXMoY2hpbGRyZW5Sb290KSA6IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlFbGVtZW50KGNoaWxkcmVuW2pdKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHRhZ1xuICAgIGlmIChfc2luZ2xlVGFnV2hpdGVsaXN0LmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgICAgIHJlc3VsdCArPSBgPC8ke3RhZ05hbWV9PmA7XG4gICAgfVxuICB9IGVsc2UgaWYgKGdldERPTSgpLmlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgcmVzdWx0ICs9IGA8IS0tJHtnZXRET00oKS5ub2RlVmFsdWUoZWwpfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGdldERPTSgpLmdldFRleHQoZWwpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbn1cbiJdfQ==