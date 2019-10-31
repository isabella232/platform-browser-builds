/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { ɵgetDOM } from '@angular/common';
export { BROWSER_SANITIZATION_PROVIDERS as ɵBROWSER_SANITIZATION_PROVIDERS, BROWSER_SANITIZATION_PROVIDERS__POST_R3__ as ɵBROWSER_SANITIZATION_PROVIDERS__POST_R3__, INTERNAL_BROWSER_PLATFORM_PROVIDERS as ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, initDomAdapter as ɵinitDomAdapter } from './browser';
export { BrowserDomAdapter as ɵBrowserDomAdapter } from './browser/browser_adapter';
export { TRANSITION_ID as ɵTRANSITION_ID } from './browser/server-transition';
export { BrowserGetTestability as ɵBrowserGetTestability } from './browser/testability';
export { escapeHtml as ɵescapeHtml } from './browser/transfer_state';
export { ELEMENT_PROBE_PROVIDERS as ɵELEMENT_PROBE_PROVIDERS } from './dom/debug/ng_probe';
export { DomRendererFactory2 as ɵDomRendererFactory2, NAMESPACE_URIS as ɵNAMESPACE_URIS, flattenStyles as ɵflattenStyles, shimContentAttribute as ɵshimContentAttribute, shimHostAttribute as ɵshimHostAttribute } from './dom/dom_renderer';
export { DomEventsPlugin as ɵDomEventsPlugin } from './dom/events/dom_events';
export { HammerGesturesPlugin as ɵHammerGesturesPlugin } from './dom/events/hammer_gestures';
export { KeyEventsPlugin as ɵKeyEventsPlugin } from './dom/events/key_events';
export { DomSharedStylesHost as ɵDomSharedStylesHost, SharedStylesHost as ɵSharedStylesHost } from './dom/shared_styles_host';
export { DomSanitizerImpl as ɵDomSanitizerImpl } from './security/dom_sanitization_service';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9wcml2YXRlX2V4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLEVBQUMsOEJBQThCLElBQUksK0JBQStCLEVBQUUseUNBQXlDLElBQUksMENBQTBDLEVBQUUsbUNBQW1DLElBQUksb0NBQW9DLEVBQUUsY0FBYyxJQUFJLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyUyxPQUFPLEVBQUMsaUJBQWlCLElBQUksa0JBQWtCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUMsYUFBYSxJQUFJLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVFLE9BQU8sRUFBQyxxQkFBcUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLElBQUksV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFDLHVCQUF1QixJQUFJLHdCQUF3QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDekYsT0FBTyxFQUFDLG1CQUFtQixJQUFJLG9CQUFvQixFQUFFLGNBQWMsSUFBSSxlQUFlLEVBQUUsYUFBYSxJQUFJLGNBQWMsRUFBRSxvQkFBb0IsSUFBSSxxQkFBcUIsRUFBRSxpQkFBaUIsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzNPLE9BQU8sRUFBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsb0JBQW9CLElBQUkscUJBQXFCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRixPQUFPLEVBQUMsZUFBZSxJQUFJLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLG1CQUFtQixJQUFJLG9CQUFvQixFQUFFLGdCQUFnQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDNUgsT0FBTyxFQUFDLGdCQUFnQixJQUFJLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCB7ybVnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5leHBvcnQge0JST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyDJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUywgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTX19QT1NUX1IzX18gYXMgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlNfX1BPU1RfUjNfXywgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMgYXMgybVJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUywgaW5pdERvbUFkYXB0ZXIgYXMgybVpbml0RG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyJztcbmV4cG9ydCB7QnJvd3NlckRvbUFkYXB0ZXIgYXMgybVCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5leHBvcnQge1RSQU5TSVRJT05fSUQgYXMgybVUUkFOU0lUSU9OX0lEfSBmcm9tICcuL2Jyb3dzZXIvc2VydmVyLXRyYW5zaXRpb24nO1xuZXhwb3J0IHtCcm93c2VyR2V0VGVzdGFiaWxpdHkgYXMgybVCcm93c2VyR2V0VGVzdGFiaWxpdHl9IGZyb20gJy4vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5leHBvcnQge2VzY2FwZUh0bWwgYXMgybVlc2NhcGVIdG1sfSBmcm9tICcuL2Jyb3dzZXIvdHJhbnNmZXJfc3RhdGUnO1xuZXhwb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSUyBhcyDJtUVMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICcuL2RvbS9kZWJ1Zy9uZ19wcm9iZSc7XG5leHBvcnQge0RvbVJlbmRlcmVyRmFjdG9yeTIgYXMgybVEb21SZW5kZXJlckZhY3RvcnkyLCBOQU1FU1BBQ0VfVVJJUyBhcyDJtU5BTUVTUEFDRV9VUklTLCBmbGF0dGVuU3R5bGVzIGFzIMm1ZmxhdHRlblN0eWxlcywgc2hpbUNvbnRlbnRBdHRyaWJ1dGUgYXMgybVzaGltQ29udGVudEF0dHJpYnV0ZSwgc2hpbUhvc3RBdHRyaWJ1dGUgYXMgybVzaGltSG9zdEF0dHJpYnV0ZX0gZnJvbSAnLi9kb20vZG9tX3JlbmRlcmVyJztcbmV4cG9ydCB7RG9tRXZlbnRzUGx1Z2luIGFzIMm1RG9tRXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5leHBvcnQge0hhbW1lckdlc3R1cmVzUGx1Z2luIGFzIMm1SGFtbWVyR2VzdHVyZXNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuZXhwb3J0IHtLZXlFdmVudHNQbHVnaW4gYXMgybVLZXlFdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmV4cG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdCBhcyDJtURvbVNoYXJlZFN0eWxlc0hvc3QsIFNoYXJlZFN0eWxlc0hvc3QgYXMgybVTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuZXhwb3J0IHtEb21TYW5pdGl6ZXJJbXBsIGFzIMm1RG9tU2FuaXRpemVySW1wbH0gZnJvbSAnLi9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UnO1xuIl19