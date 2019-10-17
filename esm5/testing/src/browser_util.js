/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵgetDOM as getDOM } from '@angular/common';
import { NgZone, ɵglobal as global } from '@angular/core';
export var browserDetection;
var BrowserDetection = /** @class */ (function () {
    function BrowserDetection(ua) {
        this._overrideUa = ua;
    }
    Object.defineProperty(BrowserDetection.prototype, "_ua", {
        get: function () {
            if (typeof this._overrideUa === 'string') {
                return this._overrideUa;
            }
            return getDOM() ? getDOM().getUserAgent() : '';
        },
        enumerable: true,
        configurable: true
    });
    BrowserDetection.setup = function () { browserDetection = new BrowserDetection(null); };
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
        get: function () { return this._ua.indexOf('Firefox') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
        get: function () {
            return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
        get: function () { return this._ua.indexOf('Edge') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
        get: function () { return this._ua.indexOf('Trident') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
        get: function () {
            return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
        get: function () {
            return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
        get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
        // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
        // This detector is needed in tests to make the difference between:
        // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
        // 2) IE9/IE10: they use the polyfill, and so no discrepancies
        get: function () {
            return !!global.Intl && global.Intl !== global.IntlPolyfill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
        // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
        // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsCustomElements", {
        get: function () { return (typeof global.customElements !== 'undefined'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsDeprecatedCustomCustomElementsV0", {
        get: function () {
            return (typeof document.registerElement !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsRegExUnicodeFlag", {
        get: function () { return RegExp.prototype.hasOwnProperty('unicode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsShadowDom", {
        get: function () {
            var testEl = document.createElement('div');
            return (typeof testEl.attachShadow !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsDeprecatedShadowDomV0", {
        get: function () {
            var testEl = document.createElement('div');
            return (typeof testEl.createShadowRoot !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    return BrowserDetection;
}());
export { BrowserDetection };
BrowserDetection.setup();
export function dispatchEvent(element, eventType) {
    var evt = getDOM().getDefaultDocument().createEvent('Event');
    evt.initEvent(eventType, true, true);
    getDOM().dispatchEvent(element, evt);
}
export function createMouseEvent(eventType) {
    var evt = getDOM().getDefaultDocument().createEvent('MouseEvent');
    evt.initEvent(eventType, true, true);
    return evt;
}
export function el(html) {
    return getContent(createTemplate(html)).firstChild;
}
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "url(\"" + match[2] + "\")";
    })
        .replace(/\[(.+)=([^"\]]+)\]/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "[" + match[1] + "=\"" + match[2] + "\"]";
    });
}
function getAttributeMap(element) {
    var res = new Map();
    var elAttrs = element.attributes;
    for (var i = 0; i < elAttrs.length; i++) {
        var attrib = elAttrs.item(i);
        res.set(attrib.name, attrib.value);
    }
    return res;
}
var _selfClosingTags = ['br', 'hr', 'input'];
export function stringifyElement(el /** TODO #9100 */) {
    var e_1, _a;
    var result = '';
    if (getDOM().isElementNode(el)) {
        var tagName = el.tagName.toLowerCase();
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = getAttributeMap(el);
        var sortedKeys = Array.from(attributeMap.keys()).sort();
        try {
            for (var sortedKeys_1 = tslib_1.__values(sortedKeys), sortedKeys_1_1 = sortedKeys_1.next(); !sortedKeys_1_1.done; sortedKeys_1_1 = sortedKeys_1.next()) {
                var key = sortedKeys_1_1.value;
                var lowerCaseKey = key.toLowerCase();
                var attValue = attributeMap.get(key);
                if (typeof attValue !== 'string') {
                    result += " " + lowerCaseKey;
                }
                else {
                    // Browsers order style rules differently. Order them alphabetically for consistency.
                    if (lowerCaseKey === 'style') {
                        attValue = attValue.split(/; ?/).filter(function (s) { return !!s; }).sort().map(function (s) { return s + ";"; }).join(' ');
                    }
                    result += " " + lowerCaseKey + "=\"" + attValue + "\"";
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sortedKeys_1_1 && !sortedKeys_1_1.done && (_a = sortedKeys_1.return)) _a.call(sortedKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result += '>';
        // Children
        var childrenRoot = templateAwareRoot(el);
        var children = childrenRoot ? childrenRoot.childNodes : [];
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_selfClosingTags.indexOf(tagName) == -1) {
            result += "</" + tagName + ">";
        }
    }
    else if (isCommentNode(el)) {
        result += "<!--" + el.nodeValue + "-->";
    }
    else {
        result += el.textContent;
    }
    return result;
}
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
export function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
export function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
export function getContent(node) {
    if ('content' in node) {
        return node.content;
    }
    else {
        return node;
    }
}
export function templateAwareRoot(el) {
    return getDOM().isElementNode(el) && el.nodeName === 'TEMPLATE' ? getContent(el) : el;
}
export function setCookie(name, value) {
    // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
    // not clear other cookies.
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
export function supportsWebAnimation() {
    return typeof Element.prototype['animate'] === 'function';
}
export function hasStyle(element, styleName, styleValue) {
    var value = element.style[styleName] || '';
    return styleValue ? value == styleValue : value.length > 0;
}
export function hasClass(element, className) {
    return element.classList.contains(className);
}
export function sortedClassList(element) {
    return Array.prototype.slice.call(element.classList, 0).sort();
}
export function createTemplate(html) {
    var t = getDOM().getDefaultDocument().createElement('template');
    t.innerHTML = html;
    return t;
}
export function childNodesAsList(el) {
    var childNodes = el.childNodes;
    var res = [];
    for (var i = 0; i < childNodes.length; i++) {
        res[i] = childNodes[i];
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE1BQU0sQ0FBQyxJQUFJLGdCQUFrQyxDQUFDO0FBRTlDO0lBWUUsMEJBQVksRUFBZTtRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQVZ2RCxzQkFBWSxpQ0FBRzthQUFmO1lBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDekI7WUFFRCxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBRU0sc0JBQUssR0FBWixjQUFpQixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUlqRSxzQkFBSSx1Q0FBUzthQUFiLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyRSxzQkFBSSx1Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBTTthQUFWLGNBQXdCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUvRCxzQkFBSSxrQ0FBSTthQUFSLGNBQXNCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVoRSxzQkFBSSxzQ0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0NBQU07YUFBVjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBTTthQUFWLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQU01RSxzQkFBSSxtREFBcUI7UUFKekIsNkVBQTZFO1FBQzdFLG1FQUFtRTtRQUNuRSx5RUFBeUU7UUFDekUsOERBQThEO2FBQzlEO1lBQ0UsT0FBTyxDQUFDLENBQU8sTUFBTyxDQUFDLElBQUksSUFBVSxNQUFPLENBQUMsSUFBSSxLQUFXLE1BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbkYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2Q0FBZTthQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLHlDQUFXO1FBRmYsb0ZBQW9GO1FBQ3BGLDhFQUE4RTthQUM5RTtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFzQjthQUExQixjQUErQixPQUFPLENBQUMsT0FBWSxNQUFPLENBQUMsY0FBYyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Ysc0JBQUksc0VBQXdDO2FBQTVDO1lBQ0UsT0FBTyxDQUFDLE9BQU8sUUFBZ0IsQ0FBQyxlQUFlLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDbkUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzREFBd0I7YUFBNUIsY0FBMEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTlGLHNCQUFJLCtDQUFpQjthQUFyQjtZQUNFLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJEQUE2QjthQUFqQztZQUNFLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFRLENBQUM7WUFDcEQsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDOztBQUVELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBRXpCLE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBWSxFQUFFLFNBQWM7SUFDeEQsSUFBTSxHQUFHLEdBQVUsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxTQUFpQjtJQUNoRCxJQUFNLEdBQUcsR0FBZSxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsTUFBTSxVQUFVLEVBQUUsQ0FBQyxJQUFZO0lBQzdCLE9BQW9CLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDbEUsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUMxQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztTQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUNuQixPQUFPLENBQUMsaUNBQWlDLEVBQUU7UUFBQyxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsMEJBQWtCOztRQUFLLE9BQUEsV0FBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQUk7SUFBcEIsQ0FBb0IsQ0FBQztTQUN4RixPQUFPLENBQUMscUJBQXFCLEVBQUU7UUFBQyxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsMEJBQWtCOztRQUFLLE9BQUEsTUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFJO0lBQTdCLENBQTZCLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsT0FBWTtJQUNuQyxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUN0QyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQztJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxFQUFPLENBQUMsaUJBQWlCOztJQUN4RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDOUIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV6QyxjQUFjO1FBQ2QsTUFBTSxJQUFJLE1BQUksT0FBUyxDQUFDO1FBRXhCLCtCQUErQjtRQUMvQixJQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFDMUQsS0FBa0IsSUFBQSxlQUFBLGlCQUFBLFVBQVUsQ0FBQSxzQ0FBQSw4REFBRTtnQkFBekIsSUFBTSxHQUFHLHVCQUFBO2dCQUNaLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFckMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLE1BQU0sSUFBSSxNQUFJLFlBQWMsQ0FBQztpQkFDOUI7cUJBQU07b0JBQ0wscUZBQXFGO29CQUNyRixJQUFJLFlBQVksS0FBSyxPQUFPLEVBQUU7d0JBQzVCLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUcsQ0FBQyxNQUFHLEVBQVAsQ0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN0RjtvQkFFRCxNQUFNLElBQUksTUFBSSxZQUFZLFdBQUssUUFBUSxPQUFHLENBQUM7aUJBQzVDO2FBQ0Y7Ozs7Ozs7OztRQUNELE1BQU0sSUFBSSxHQUFHLENBQUM7UUFFZCxXQUFXO1FBQ1gsSUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsY0FBYztRQUNkLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sSUFBSSxPQUFLLE9BQU8sTUFBRyxDQUFDO1NBQzNCO0tBQ0Y7U0FBTSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUM1QixNQUFNLElBQUksU0FBTyxFQUFFLENBQUMsU0FBUyxRQUFLLENBQUM7S0FDcEM7U0FBTTtRQUNMLE1BQU0sSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQzFCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVU7SUFDdEMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDN0MsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBVTtJQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVO0lBQ25DLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFhLElBQUssQ0FBQyxPQUFPLENBQUM7S0FDNUI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQVE7SUFDeEMsT0FBTyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3hGLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQ25ELDZGQUE2RjtJQUM3RiwyQkFBMkI7SUFDM0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxPQUFZLE9BQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssVUFBVSxDQUFDO0FBQ2xFLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE9BQVksRUFBRSxTQUFpQixFQUFFLFVBQTBCO0lBQ2xGLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxPQUFZLEVBQUUsU0FBaUI7SUFDdEQsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxPQUFZO0lBQzFDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBUztJQUN0QyxJQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNuQixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsRUFBUTtJQUN2QyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0lBQ2pDLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ1pvbmUsIMm1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBsZXQgYnJvd3NlckRldGVjdGlvbjogQnJvd3NlckRldGVjdGlvbjtcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEZXRlY3Rpb24ge1xuICBwcml2YXRlIF9vdmVycmlkZVVhOiBzdHJpbmd8bnVsbDtcbiAgcHJpdmF0ZSBnZXQgX3VhKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vdmVycmlkZVVhID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX292ZXJyaWRlVWE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERPTSgpID8gZ2V0RE9NKCkuZ2V0VXNlckFnZW50KCkgOiAnJztcbiAgfVxuXG4gIHN0YXRpYyBzZXR1cCgpIHsgYnJvd3NlckRldGVjdGlvbiA9IG5ldyBCcm93c2VyRGV0ZWN0aW9uKG51bGwpOyB9XG5cbiAgY29uc3RydWN0b3IodWE6IHN0cmluZ3xudWxsKSB7IHRoaXMuX292ZXJyaWRlVWEgPSB1YTsgfVxuXG4gIGdldCBpc0ZpcmVmb3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdGaXJlZm94JykgPiAtMTsgfVxuXG4gIGdldCBpc0FuZHJvaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdBbmRyb2lkJykgPiAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0VkZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPiAtMTsgfVxuXG4gIGdldCBpc0lFKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignVHJpZGVudCcpID4gLTE7IH1cblxuICBnZXQgaXNXZWJraXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0lPUzcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl91YS5pbmRleE9mKCdpUGhvbmUgT1MgNycpID4gLTEgfHwgdGhpcy5fdWEuaW5kZXhPZignaVBhZCBPUyA3JykgPiAtMSkgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc1Nsb3coKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzQW5kcm9pZCB8fCB0aGlzLmlzSUUgfHwgdGhpcy5pc0lPUzc7IH1cblxuICAvLyBUaGUgSW50bCBBUEkgaXMgb25seSBuYXRpdmVseSBzdXBwb3J0ZWQgaW4gQ2hyb21lLCBGaXJlZm94LCBJRTExIGFuZCBFZGdlLlxuICAvLyBUaGlzIGRldGVjdG9yIGlzIG5lZWRlZCBpbiB0ZXN0cyB0byBtYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW46XG4gIC8vIDEpIElFMTEvRWRnZTogdGhleSBoYXZlIGEgbmF0aXZlIEludGwgQVBJLCBidXQgd2l0aCBzb21lIGRpc2NyZXBhbmNpZXNcbiAgLy8gMikgSUU5L0lFMTA6IHRoZXkgdXNlIHRoZSBwb2x5ZmlsbCwgYW5kIHNvIG5vIGRpc2NyZXBhbmNpZXNcbiAgZ2V0IHN1cHBvcnRzTmF0aXZlSW50bEFwaSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoPGFueT5nbG9iYWwpLkludGwgJiYgKDxhbnk+Z2xvYmFsKS5JbnRsICE9PSAoPGFueT5nbG9iYWwpLkludGxQb2x5ZmlsbDtcbiAgfVxuXG4gIGdldCBpc0Nocm9tZURlc2t0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIC8vIFwiT2xkIENocm9tZVwiIG1lYW5zIENocm9tZSAzWCwgd2hlcmUgdGhlcmUgYXJlIHNvbWUgZGlzY3JlcGFuY2llcyBpbiB0aGUgSW50bCBBUEkuXG4gIC8vIEFuZHJvaWQgNC40IGFuZCA1LlggaGF2ZSBzdWNoIGJyb3dzZXJzIGJ5IGRlZmF1bHQgKHJlc3BlY3RpdmVseSAzMCBhbmQgMzkpLlxuICBnZXQgaXNPbGRDaHJvbWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lLzMnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0N1c3RvbUVsZW1lbnRzKCkgeyByZXR1cm4gKHR5cGVvZig8YW55Pmdsb2JhbCkuY3VzdG9tRWxlbWVudHMgIT09ICd1bmRlZmluZWQnKTsgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRDdXN0b21DdXN0b21FbGVtZW50c1YwKCkge1xuICAgIHJldHVybiAodHlwZW9mKGRvY3VtZW50IGFzIGFueSkucmVnaXN0ZXJFbGVtZW50ICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBnZXQgc3VwcG9ydHNSZWdFeFVuaWNvZGVGbGFnKCk6IGJvb2xlYW4geyByZXR1cm4gUmVnRXhwLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgndW5pY29kZScpOyB9XG5cbiAgZ2V0IHN1cHBvcnRzU2hhZG93RG9tKCkge1xuICAgIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiAodHlwZW9mIHRlc3RFbC5hdHRhY2hTaGFkb3cgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRTaGFkb3dEb21WMCgpIHtcbiAgICBjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBhbnk7XG4gICAgcmV0dXJuICh0eXBlb2YgdGVzdEVsLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxufVxuXG5Ccm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUeXBlOiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgZXZ0OiBFdmVudCA9IGdldERPTSgpLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIGdldERPTSgpLmRpc3BhdGNoRXZlbnQoZWxlbWVudCwgZXZ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBNb3VzZUV2ZW50IHtcbiAgY29uc3QgZXZ0OiBNb3VzZUV2ZW50ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICByZXR1cm4gZXZ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWwoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICByZXR1cm4gPEhUTUxFbGVtZW50PmdldENvbnRlbnQoY3JlYXRlVGVtcGxhdGUoaHRtbCkpLmZpcnN0Q2hpbGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDU1MoY3NzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY3NzLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgICAgLnJlcGxhY2UoLzpcXHMvZywgJzonKVxuICAgICAgLnJlcGxhY2UoLycvZywgJ1wiJylcbiAgICAgIC5yZXBsYWNlKC8gfS9nLCAnfScpXG4gICAgICAucmVwbGFjZSgvdXJsXFwoKFxcXCJ8XFxzKSguKykoXFxcInxcXHMpXFwpKFxccyopL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGB1cmwoXCIke21hdGNoWzJdfVwiKWApXG4gICAgICAucmVwbGFjZSgvXFxbKC4rKT0oW15cIlxcXV0rKVxcXS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgWyR7bWF0Y2hbMV19PVwiJHttYXRjaFsyXX1cIl1gKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlTWFwKGVsZW1lbnQ6IGFueSk6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICBjb25zdCByZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCBlbEF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhdHRyaWIgPSBlbEF0dHJzLml0ZW0oaSk7XG4gICAgcmVzLnNldChhdHRyaWIubmFtZSwgYXR0cmliLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBfc2VsZkNsb3NpbmdUYWdzID0gWydicicsICdocicsICdpbnB1dCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVsZW1lbnQoZWw6IGFueSAvKiogVE9ETyAjOTEwMCAqLyk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgY29uc3QgYXR0cmlidXRlTWFwID0gZ2V0QXR0cmlidXRlTWFwKGVsKTtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVNYXAua2V5cygpKS5zb3J0KCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2Ygc29ydGVkS2V5cykge1xuICAgICAgY29uc3QgbG93ZXJDYXNlS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgYXR0VmFsdWUgPSBhdHRyaWJ1dGVNYXAuZ2V0KGtleSk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0VmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VycyBvcmRlciBzdHlsZSBydWxlcyBkaWZmZXJlbnRseS4gT3JkZXIgdGhlbSBhbHBoYWJldGljYWxseSBmb3IgY29uc2lzdGVuY3kuXG4gICAgICAgIGlmIChsb3dlckNhc2VLZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICBhdHRWYWx1ZSA9IGF0dFZhbHVlLnNwbGl0KC87ID8vKS5maWx0ZXIocyA9PiAhIXMpLnNvcnQoKS5tYXAocyA9PiBgJHtzfTtgKS5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX09XCIke2F0dFZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc+JztcblxuICAgIC8vIENoaWxkcmVuXG4gICAgY29uc3QgY2hpbGRyZW5Sb290ID0gdGVtcGxhdGVBd2FyZVJvb3QoZWwpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5Sb290ID8gY2hpbGRyZW5Sb290LmNoaWxkTm9kZXMgOiBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5naWZ5RWxlbWVudChjaGlsZHJlbltqXSk7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2luZyB0YWdcbiAgICBpZiAoX3NlbGZDbG9zaW5nVGFncy5pbmRleE9mKHRhZ05hbWUpID09IC0xKSB7XG4gICAgICByZXN1bHQgKz0gYDwvJHt0YWdOYW1lfT5gO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0NvbW1lbnROb2RlKGVsKSkge1xuICAgIHJlc3VsdCArPSBgPCEtLSR7ZWwubm9kZVZhbHVlfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGVsLnRleHRDb250ZW50O1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29tbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RleHROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGVudChub2RlOiBOb2RlKTogTm9kZSB7XG4gIGlmICgnY29udGVudCcgaW4gbm9kZSkge1xuICAgIHJldHVybiAoPGFueT5ub2RlKS5jb250ZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBub2RlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUF3YXJlUm9vdChlbDogTm9kZSk6IGFueSB7XG4gIHJldHVybiBnZXRET00oKS5pc0VsZW1lbnROb2RlKGVsKSAmJiBlbC5ub2RlTmFtZSA9PT0gJ1RFTVBMQVRFJyA/IGdldENvbnRlbnQoZWwpIDogZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gIC8vIGRvY3VtZW50LmNvb2tpZSBpcyBtYWdpY2FsLCBhc3NpZ25pbmcgaW50byBpdCBhc3NpZ25zL292ZXJyaWRlcyBvbmUgY29va2llIHZhbHVlLCBidXQgZG9lc1xuICAvLyBub3QgY2xlYXIgb3RoZXIgY29va2llcy5cbiAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzV2ViQW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mKDxhbnk+RWxlbWVudCkucHJvdG90eXBlWydhbmltYXRlJ10gPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nIHwgbnVsbCk6IGJvb2xlYW4ge1xuICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSB8fCAnJztcbiAgcmV0dXJuIHN0eWxlVmFsdWUgPyB2YWx1ZSA9PSBzdHlsZVZhbHVlIDogdmFsdWUubGVuZ3RoID4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0ZWRDbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W10ge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5jbGFzc0xpc3QsIDApLnNvcnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgdCA9IGdldERPTSgpLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gIHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE5vZGVzQXNMaXN0KGVsOiBOb2RlKTogYW55W10ge1xuICBjb25zdCBjaGlsZE5vZGVzID0gZWwuY2hpbGROb2RlcztcbiAgY29uc3QgcmVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIHJlc1tpXSA9IGNoaWxkTm9kZXNbaV07XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbiJdfQ==