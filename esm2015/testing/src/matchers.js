/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { childNodesAsList, hasClass, hasStyle, isCommentNode } from './browser_util';
const _global = (typeof window === 'undefined' ? global : window);
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
export const expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] = function () {
    const m = this;
    if (!m) {
        return '' + m;
    }
    const res = [];
    m.forEach((v, k) => {
        res.push(`${String(k)}:${String(v)}`);
    });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    // Custom handler for Map as we use Jasmine 2.4, and support for maps is not
    // added until Jasmine 2.6.
    jasmine.addCustomEqualityTester(function compareMap(actual, expected) {
        if (actual instanceof Map) {
            let pass = actual.size === expected.size;
            if (pass) {
                actual.forEach((v, k) => {
                    pass = pass && jasmine.matchersUtil.equals(v, expected.get(k));
                });
            }
            return pass;
        }
        else {
            // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
            return undefined;
        }
    });
    jasmine.addMatchers({
        toBePromise: function () {
            return {
                compare: function (actual) {
                    const pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be a promise';
                        }
                    };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    const pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: hasClass(actual, className) == !isNot,
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    const errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() {
                            return 'Expected ' + errorMessage + ' to contain ' + expectedText;
                        }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    const intProps = Object.keys(expectedInterface.prototype);
                    const missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject +
                                ' to have the following methods: ' + missedMethods.join(', ');
                        }
                    };
                }
            };
        },
        toContainComponent: function () {
            return {
                compare: function (actualFixture, expectedComponentType) {
                    const failOutput = arguments[2];
                    const msgFn = (msg) => [msg, failOutput].filter(Boolean).join(', ');
                    // verify correct actual type
                    if (!(actualFixture instanceof ComponentFixture)) {
                        return {
                            pass: false,
                            message: msgFn(`Expected actual to be of type \'ComponentFixture\' [actual=${actualFixture.constructor.name}]`)
                        };
                    }
                    const found = !!actualFixture.debugElement.query(By.directive(expectedComponentType));
                    return found ?
                        { pass: true } :
                        { pass: false, message: msgFn(`Expected ${expectedComponentType.name} to show`) };
                }
            };
        }
    });
});
function elementText(n) {
    const hasNodes = (n) => {
        const children = n.childNodes;
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n)) {
        const tagName = n.tagName;
        if (tagName === 'CONTENT') {
            return elementText(Array.prototype.slice.apply(n.getDistributedNodes()));
        }
        else if (tagName === 'SLOT') {
            return elementText(Array.prototype.slice.apply(n.assignedNodes()));
        }
    }
    if (hasShadowRoot(n)) {
        return elementText(childNodesAsList(n.shadowRoot));
    }
    if (hasNodes(n)) {
        return elementText(childNodesAsList(n));
    }
    return n.textContent;
}
function hasShadowRoot(node) {
    return node.shadowRoot != null && node instanceof HTMLElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFPLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBMEZuRixNQUFNLE9BQU8sR0FBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2RTs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQTBDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFHNUUsa0VBQWtFO0FBQ2xFLHdDQUF3QztBQUN4QyxpRUFBaUU7QUFDakUsb0JBQW9CO0FBQ25CLEdBQVcsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRztJQUMxQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDZixJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ04sT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7SUFDRCxNQUFNLEdBQUcsR0FBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtRQUMzQixHQUFHLENBQUMsSUFBSSxDQUFD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Q2hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VHlwZSwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50Rml4dHVyZX0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7Qnl9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtjaGlsZE5vZGVzQXNMaXN0LCBoYXNDbGFzcywgaGFzU3R5bGUsIGlzQ29tbWVudE5vZGV9IGZyb20gJy4vYnJvd3Nlcl91dGlsJztcblxuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hlcnMgdGhhdCBjaGVjayBBbmd1bGFyIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gKlxuICogTm90ZTogVGhlc2UgbWF0Y2hlcnMgd2lsbCBvbmx5IHdvcmsgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTWF0Y2hlcnM8VCA9IGFueT4gZXh0ZW5kcyBqYXNtaW5lLk1hdGNoZXJzPFQ+IHtcbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYSBgUHJvbWlzZWAuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZVByb21pc2UnfVxuICAgKi9cbiAgdG9CZVByb21pc2UoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQmVBbkluc3RhbmNlT2YnfVxuICAgKi9cbiAgdG9CZUFuSW5zdGFuY2VPZihleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgZXhhY3RseSB0aGUgZ2l2ZW4gdGV4dC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAgICovXG4gIHRvSGF2ZVRleHQoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgY2xhc3MuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzQ2xhc3MnfVxuICAgKi9cbiAgdG9IYXZlQ3NzQ2xhc3MoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc1N0eWxlJ31cbiAgICovXG4gIHRvSGF2ZUNzc1N0eWxlKGV4cGVjdGVkOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgY2xhc3MgdG8gaW1wbGVtZW50IHRoZSBpbnRlcmZhY2Ugb2YgdGhlIGdpdmVuIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSW1wbGVtZW50J31cbiAgICovXG4gIHRvSW1wbGVtZW50KGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYW4gZXhjZXB0aW9uIHRvIGNvbnRhaW4gdGhlIGdpdmVuIGVycm9yIHRleHQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9Db250YWluRXJyb3InfVxuICAgKi9cbiAgdG9Db250YWluRXJyb3IoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gdHlwZSB0byBzaG93LlxuICAgKi9cbiAgdG9Db250YWluQ29tcG9uZW50KGV4cGVjdGVkQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+LCBleHBlY3RhdGlvbkZhaWxPdXRwdXQ/OiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbnZlcnQgdGhlIG1hdGNoZXJzLlxuICAgKi9cbiAgbm90OiBOZ01hdGNoZXJzPFQ+O1xufVxuXG5jb25zdCBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hpbmcgZnVuY3Rpb24gd2l0aCBBbmd1bGFyIG1hdGNoZXJzIG1peGVkIGluLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVRleHQnfVxuICovXG5leHBvcnQgY29uc3QgZXhwZWN0OiA8VCA9IGFueT4oYWN0dWFsOiBUKSA9PiBOZ01hdGNoZXJzPFQ+ID0gX2dsb2JhbC5leHBlY3Q7XG5cblxuLy8gU29tZSBNYXAgcG9seWZpbGxzIGRvbid0IHBvbHlmaWxsIE1hcC50b1N0cmluZyBjb3JyZWN0bHksIHdoaWNoXG4vLyBnaXZlcyB1cyBiYWQgZXJyb3IgbWVzc2FnZXMgaW4gdGVzdHMuXG4vLyBUaGUgb25seSB3YXkgdG8gZG8gdGhpcyBpbiBKYXNtaW5lIGlzIHRvIG1vbmtleSBwYXRjaCBhIG1ldGhvZFxuLy8gdG8gdGhlIG9iamVjdCA6LShcbihNYXAgYXMgYW55KS5wcm90b3R5cGVbJ2phc21pbmVUb1N0cmluZyddID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG0gPSB0aGlzO1xuICBpZiAoIW0pIHtcbiAgICByZXR1cm4gJycgKyBtO1xuICB9XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbS5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4ge1xuICAgIHJlcy5wdXNoKGAke1N0cmluZyhrKX06JHtTdHJpbmcodil9YCk7XG4gIH0pO1xuICByZXR1cm4gYHsgJHtyZXMuam9pbignLCcpfSB9YDtcbn07XG5cbl9nbG9iYWwuYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgLy8gQ3VzdG9tIGhhbmRsZXIgZm9yIE1hcCBhcyB3ZSB1c2UgSmFzbWluZSAyLjQsIGFuZCBzdXBwb3J0IGZvciBtYXBzIGlzIG5vdFxuICAvLyBhZGRlZCB1bnRpbCBKYXNtaW5lIDIuNi5cbiAgamFzbWluZS5hZGRDdXN0b21FcXVhbGl0eVRlc3RlcihmdW5jdGlvbiBjb21wYXJlTWFwKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgbGV0IHBhc3MgPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0ZWQuc2l6ZTtcbiAgICAgIGlmIChwYXNzKSB7XG4gICAgICAgIGFjdHVhbC5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4ge1xuICAgICAgICAgIHBhc3MgPSBwYXNzICYmIGphc21pbmUubWF0Y2hlcnNVdGlsLmVxdWFscyh2LCBleHBlY3RlZC5nZXQoaykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPKG1pc2tvKTogd2Ugc2hvdWxkIGNoYW5nZSB0aGUgcmV0dXJuLCBidXQgamFzbWluZS5kLnRzIGlzIG5vdCBudWxsIHNhZmVcbiAgICAgIHJldHVybiB1bmRlZmluZWQhO1xuICAgIH1cbiAgfSk7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIHRvQmVQcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhY3R1YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogcGFzcyxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWwgKyAnIHRvIGJlIGEgcHJvbWlzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9CZUFuSW5zdGFuY2VPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRDbGFzczogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IHBhc3MsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhbiBpbnN0YW5jZSBvZiAnICsgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IHN0cmluZykge1xuICAgICAgICAgIGNvbnN0IGFjdHVhbFRleHQgPSBlbGVtZW50VGV4dChhY3R1YWwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhY3R1YWxUZXh0ID09IGV4cGVjdGVkVGV4dCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxUZXh0ICsgJyB0byBiZSBlcXVhbCB0byAnICsgZXhwZWN0ZWRUZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc0NsYXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFjdHVhbDogYW55LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBoYXNDbGFzcyhhY3R1YWwsIGNsYXNzTmFtZSkgPT0gIWlzTm90LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAke1xuICAgICAgICAgICAgICAgICAgaXNOb3QgPyAnbm90ICcgOiAnJ310byBjb250YWluIHRoZSBDU1MgY2xhc3MgXCIke2NsYXNzTmFtZX1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIHN0eWxlczoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZykge1xuICAgICAgICAgIGxldCBhbGxQYXNzZWQ6IGJvb2xlYW47XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBoYXNTdHlsZShhY3R1YWwsIHN0eWxlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IE9iamVjdC5rZXlzKHN0eWxlcykubGVuZ3RoICE9PSAwO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgaGFzU3R5bGUoYWN0dWFsLCBwcm9wLCBzdHlsZXNbcHJvcF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFsbFBhc3NlZCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlU3RyID0gdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyBzdHlsZXMgOiBKU09OLnN0cmluZ2lmeShzdHlsZXMpO1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHshYWxsUGFzc2VkID8gJyAnIDogJ25vdCAnfXRvIGNvbnRhaW4gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgQ1NTICR7dHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyAncHJvcGVydHknIDogJ3N0eWxlcyd9IFwiJHtcbiAgICAgICAgICAgICAgICAgIGV4cGVjdGVkVmFsdWVTdHJ9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQ29udGFpbkVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGFjdHVhbC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBlcnJvck1lc3NhZ2UuaW5kZXhPZihleHBlY3RlZFRleHQpID4gLTEsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgZXJyb3JNZXNzYWdlICsgJyB0byBjb250YWluICcgKyBleHBlY3RlZFRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9JbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsT2JqZWN0OiBhbnksIGV4cGVjdGVkSW50ZXJmYWNlOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBpbnRQcm9wcyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkSW50ZXJmYWNlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICBjb25zdCBtaXNzZWRNZXRob2RzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIGludFByb3BzLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtrXSkgbWlzc2VkTWV0aG9kcy5wdXNoKGspO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IG1pc3NlZE1ldGhvZHMubGVuZ3RoID09IDAsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsT2JqZWN0ICtcbiAgICAgICAgICAgICAgICAgICcgdG8gaGF2ZSB0aGUgZm9sbG93aW5nIG1ldGhvZHM6ICcgKyBtaXNzZWRNZXRob2RzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9Db250YWluQ29tcG9uZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbEZpeHR1cmU6IGFueSwgZXhwZWN0ZWRDb21wb25lbnRUeXBlOiBUeXBlPGFueT4pIHtcbiAgICAgICAgICBjb25zdCBmYWlsT3V0cHV0ID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgIGNvbnN0IG1zZ0ZuID0gKG1zZzogc3RyaW5nKTogc3RyaW5nID0+IFttc2csIGZhaWxPdXRwdXRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpO1xuXG4gICAgICAgICAgLy8gdmVyaWZ5IGNvcnJlY3QgYWN0dWFsIHR5cGVcbiAgICAgICAgICBpZiAoIShhY3R1YWxGaXh0dXJlIGluc3RhbmNlb2YgQ29tcG9uZW50Rml4dHVyZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBhc3M6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBtc2dGbihgRXhwZWN0ZWQgYWN0dWFsIHRvIGJlIG9mIHR5cGUgXFwnQ29tcG9uZW50Rml4dHVyZVxcJyBbYWN0dWFsPSR7XG4gICAgICAgICAgICAgICAgICBhY3R1YWxGaXh0dXJlLmNvbnN0cnVjdG9yLm5hbWV9XWApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gISFhY3R1YWxGaXh0dXJlLmRlYnVnRWxlbWVudC5xdWVyeShCeS5kaXJlY3RpdmUoZXhwZWN0ZWRDb21wb25lbnRUeXBlKSk7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kID9cbiAgICAgICAgICAgICAge3Bhc3M6IHRydWV9IDpcbiAgICAgICAgICAgICAge3Bhc3M6IGZhbHNlLCBtZXNzYWdlOiBtc2dGbihgRXhwZWN0ZWQgJHtleHBlY3RlZENvbXBvbmVudFR5cGUubmFtZX0gdG8gc2hvd2ApfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0KG46IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhhc05vZGVzID0gKG46IGFueSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbi5jaGlsZE5vZGVzO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oJycpO1xuICB9XG5cbiAgaWYgKGlzQ29tbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShuKSkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSAobiBhcyBFbGVtZW50KS50YWdOYW1lO1xuXG4gICAgaWYgKHRhZ05hbWUgPT09ICdDT05URU5UJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseSgoPGFueT5uKS5nZXREaXN0cmlidXRlZE5vZGVzKCkpKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdTTE9UJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseSgoPGFueT5uKS5hc3NpZ25lZE5vZGVzKCkpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaGFzU2hhZG93Um9vdChuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChjaGlsZE5vZGVzQXNMaXN0KCg8YW55Pm4pLnNoYWRvd1Jvb3QpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChjaGlsZE5vZGVzQXNMaXN0KG4pKTtcbiAgfVxuXG4gIHJldHVybiAobiBhcyBhbnkpLnRleHRDb250ZW50O1xufVxuXG5mdW5jdGlvbiBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5zaGFkb3dSb290ICE9IG51bGwgJiYgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuIl19