/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
export let browserDetection;
export class BrowserDetection {
    get _ua() {
        if (typeof this._overrideUa === 'string') {
            return this._overrideUa;
        }
        return getDOM() ? getDOM().getUserAgent() : '';
    }
    static setup() { browserDetection = new BrowserDetection(null); }
    constructor(ua) { this._overrideUa = ua; }
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    get isIOS7() {
        return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
            this._ua.indexOf('IEMobile') == -1;
    }
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
    // This detector is needed in tests to make the difference between:
    // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
    // 2) IE9/IE10: they use the polyfill, and so no discrepancies
    get supportsNativeIntlApi() {
        return !!global.Intl && global.Intl !== global.IntlPolyfill;
    }
    get isChromeDesktop() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
    // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
    get isOldChrome() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
            this._ua.indexOf('Edge') == -1;
    }
}
BrowserDetection.setup();
export function dispatchEvent(element, eventType) {
    getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}
export function el(html) {
    return getDOM().firstChild(getDOM().content(getDOM().createTemplate(html)));
}
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (...match) => `url("${match[2]}")`)
        .replace(/\[(.+)=([^"\]]+)\]/g, (...match) => `[${match[1]}="${match[2]}"]`);
}
const _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el /** TODO #9100 */) {
    let result = '';
    if (getDOM().isElementNode(el)) {
        const tagName = getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        const attributeMap = getDOM().attributeMap(el);
        const keys = Array.from(attributeMap.keys()).sort();
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const attValue = attributeMap.get(key);
            const lowerCaseKey = key.toLowerCase();
            if (typeof attValue !== 'string') {
                result += ` ${lowerCaseKey}`;
            }
            else {
                result += ` ${lowerCaseKey}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        const childrenRoot = getDOM().templateAwareRoot(el);
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
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsTUFBTSxDQUFDLElBQUksZ0JBQWtDLENBQUM7QUFFOUMsTUFBTTtJQUVKLElBQVksR0FBRztRQUNiLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUN4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7UUFFRCxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxLQUFLLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpFLFlBQVksRUFBZSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2RCxJQUFJLFNBQVMsS0FBYyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRSxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENB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YSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxPQUFPLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQzlDO1NBQU07UUFDTCxNQUFNLElBQUksTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU07SUFDSixPQUFPLElBQUksTUFBTSxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nWm9uZSwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZXhwb3J0IGxldCBicm93c2VyRGV0ZWN0aW9uOiBCcm93c2VyRGV0ZWN0aW9uO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGVjdGlvbiB7XG4gIHByaXZhdGUgX292ZXJyaWRlVWE6IHN0cmluZ3xudWxsO1xuICBwcml2YXRlIGdldCBfdWEoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX292ZXJyaWRlVWEgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3ZlcnJpZGVVYTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RE9NKCkgPyBnZXRET00oKS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICB9XG5cbiAgc3RhdGljIHNldHVwKCkgeyBicm93c2VyRGV0ZWN0aW9uID0gbmV3IEJyb3dzZXJEZXRlY3Rpb24obnVsbCk7IH1cblxuICBjb25zdHJ1Y3Rvcih1YTogc3RyaW5nfG51bGwpIHsgdGhpcy5fb3ZlcnJpZGVVYSA9IHVhOyB9XG5cbiAgZ2V0IGlzRmlyZWZveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzRWRnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzSUUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdUcmlkZW50JykgPiAtMTsgfVxuXG4gIGdldCBpc1dlYmtpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX3VhLmluZGV4T2YoJ2lQaG9uZSBPUyA3JykgPiAtMSB8fCB0aGlzLl91YS5pbmRleE9mKCdpUGFkIE9TIDcnKSA+IC0xKSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzU2xvdygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMuaXNJRSB8fCB0aGlzLmlzSU9TNzsgfVxuXG4gIC8vIFRoZSBJbnRsIEFQSSBpcyBvbmx5IG5hdGl2ZWx5IHN1cHBvcnRlZCBpbiBDaHJvbWUsIEZpcmVmb3gsIElFMTEgYW5kIEVkZ2UuXG4gIC8vIFRoaXMgZGV0ZWN0b3IgaXMgbmVlZGVkIGluIHRlc3RzIHRvIG1ha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbjpcbiAgLy8gMSkgSUUxMS9FZGdlOiB0aGV5IGhhdmUgYSBuYXRpdmUgSW50bCBBUEksIGJ1dCB3aXRoIHNvbWUgZGlzY3JlcGFuY2llc1xuICAvLyAyKSBJRTkvSUUxMDogdGhleSB1c2UgdGhlIHBvbHlmaWxsLCBhbmQgc28gbm8gZGlzY3JlcGFuY2llc1xuICBnZXQgc3VwcG9ydHNOYXRpdmVJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISg8YW55Pmdsb2JhbCkuSW50bCAmJiAoPGFueT5nbG9iYWwpLkludGwgIT09ICg8YW55Pmdsb2JhbCkuSW50bFBvbHlmaWxsO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lRGVza3RvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgLy8gXCJPbGQgQ2hyb21lXCIgbWVhbnMgQ2hyb21lIDNYLCB3aGVyZSB0aGVyZSBhcmUgc29tZSBkaXNjcmVwYW5jaWVzIGluIHRoZSBJbnRsIEFQSS5cbiAgLy8gQW5kcm9pZCA0LjQgYW5kIDUuWCBoYXZlIHN1Y2ggYnJvd3NlcnMgYnkgZGVmYXVsdCAocmVzcGVjdGl2ZWx5IDMwIGFuZCAzOSkuXG4gIGdldCBpc09sZENocm9tZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvMycpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG59XG5cbkJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudDogYW55LCBldmVudFR5cGU6IGFueSk6IHZvaWQge1xuICBnZXRET00oKS5kaXNwYXRjaEV2ZW50KGVsZW1lbnQsIGdldERPTSgpLmNyZWF0ZUV2ZW50KGV2ZW50VHlwZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWwoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICByZXR1cm4gPEhUTUxFbGVtZW50PmdldERPTSgpLmZpcnN0Q2hpbGQoZ2V0RE9NKCkuY29udGVudChnZXRET00oKS5jcmVhdGVUZW1wbGF0ZShodG1sKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ1NTKGNzczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNzcy5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC86XFxzL2csICc6JylcbiAgICAgIC5yZXBsYWNlKC8nL2csICdcIicpXG4gICAgICAucmVwbGFjZSgvIH0vZywgJ30nKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKChcXFwifFxccykoLispKFxcXCJ8XFxzKVxcKShcXHMqKS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgdXJsKFwiJHttYXRjaFsyXX1cIilgKVxuICAgICAgLnJlcGxhY2UoL1xcWyguKyk9KFteXCJcXF1dKylcXF0vZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYFske21hdGNoWzFdfT1cIiR7bWF0Y2hbMl19XCJdYCk7XG59XG5cbmNvbnN0IF9zaW5nbGVUYWdXaGl0ZWxpc3QgPSBbJ2JyJywgJ2hyJywgJ2lucHV0J107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5RWxlbWVudChlbDogYW55IC8qKiBUT0RPICM5MTAwICovKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShlbCkpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZ2V0RE9NKCkudGFnTmFtZShlbCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgY29uc3QgYXR0cmlidXRlTWFwID0gZ2V0RE9NKCkuYXR0cmlidXRlTWFwKGVsKTtcbiAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IEFycmF5LmZyb20oYXR0cmlidXRlTWFwLmtleXMoKSkuc29ydCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGNvbnN0IGF0dFZhbHVlID0gYXR0cmlidXRlTWFwLmdldChrZXkpO1xuICAgICAgY29uc3QgbG93ZXJDYXNlS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodHlwZW9mIGF0dFZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtsb3dlckNhc2VLZXl9PVwiJHthdHRWYWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPic7XG5cbiAgICAvLyBDaGlsZHJlblxuICAgIGNvbnN0IGNoaWxkcmVuUm9vdCA9IGdldERPTSgpLnRlbXBsYXRlQXdhcmVSb290KGVsKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNoaWxkcmVuUm9vdCA/IGdldERPTSgpLmNoaWxkTm9kZXMoY2hpbGRyZW5Sb290KSA6IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlFbGVtZW50KGNoaWxkcmVuW2pdKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHRhZ1xuICAgIGlmIChfc2luZ2xlVGFnV2hpdGVsaXN0LmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgICAgIHJlc3VsdCArPSBgPC8ke3RhZ05hbWV9PmA7XG4gICAgfVxuICB9IGVsc2UgaWYgKGdldERPTSgpLmlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgcmVzdWx0ICs9IGA8IS0tJHtnZXRET00oKS5ub2RlVmFsdWUoZWwpfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGdldERPTSgpLmdldFRleHQoZWwpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbn1cbiJdfQ==