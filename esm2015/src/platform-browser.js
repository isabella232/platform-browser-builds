/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { BrowserModule, platformBrowser } from './browser';
export { Meta } from './browser/meta';
export { Title } from './browser/title';
export { disableDebugTools, enableDebugTools } from './browser/tools/tools';
export { BrowserTransferStateModule, TransferState, makeStateKey } from './browser/transfer_state';
export { By } from './dom/debug/by';
export { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
export { HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig } from './dom/events/hammer_gestures';
export { DomSanitizer } from './security/dom_sanitization_service';
export { ɵBROWSER_SANITIZATION_PROVIDERS, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, ɵinitDomAdapter, ɵBrowserDomAdapter, ɵBrowserPlatformLocation, ɵTRANSITION_ID, ɵBrowserGetTestability, ɵescapeHtml, ɵELEMENT_PROBE_PROVIDERS, ɵDomAdapter, ɵgetDOM, ɵsetRootDomAdapter, ɵDomRendererFactory2, ɵNAMESPACE_URIS, ɵflattenStyles, ɵshimContentAttribute, ɵshimHostAttribute, ɵDomEventsPlugin, ɵHammerGesturesPlugin, ɵKeyEventsPlugin, ɵDomSharedStylesHost, ɵSharedStylesHost, ɵDomSanitizerImpl } from './private_export';
export { VERSION } from './version';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3BsYXRmb3JtLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN6RCxPQUFPLEVBQUMsSUFBSSxFQUFpQixNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsMEJBQTBCLEVBQVksYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzNHLE9BQU8sRUFBQyxFQUFFLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBZSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JILE9BQU8sRUFBQyxZQUFZLEVBQXVFLE1BQU0scUNBQXFDLENBQUM7QUFFdkksdWVBQWMsa0JBQWtCLENBQUM7QUFDakMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0IHtCcm93c2VyTW9kdWxlLCBwbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJy4vYnJvd3Nlcic7XG5leHBvcnQge01ldGEsIE1ldGFEZWZpbml0aW9ufSBmcm9tICcuL2Jyb3dzZXIvbWV0YSc7XG5leHBvcnQge1RpdGxlfSBmcm9tICcuL2Jyb3dzZXIvdGl0bGUnO1xuZXhwb3J0IHtkaXNhYmxlRGVidWdUb29scywgZW5hYmxlRGVidWdUb29sc30gZnJvbSAnLi9icm93c2VyL3Rvb2xzL3Rvb2xzJztcbmV4cG9ydCB7QnJvd3NlclRyYW5zZmVyU3RhdGVNb2R1bGUsIFN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlLCBtYWtlU3RhdGVLZXl9IGZyb20gJy4vYnJvd3Nlci90cmFuc2Zlcl9zdGF0ZSc7XG5leHBvcnQge0J5fSBmcm9tICcuL2RvbS9kZWJ1Zy9ieSc7XG5leHBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5leHBvcnQge0hBTU1FUl9HRVNUVVJFX0NPTkZJRywgSEFNTUVSX0xPQURFUiwgSGFtbWVyR2VzdHVyZUNvbmZpZywgSGFtbWVyTG9hZGVyfSBmcm9tICcuL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmV4cG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbCwgU2FmZVJlc291cmNlVXJsLCBTYWZlU2NyaXB0LCBTYWZlU3R5bGUsIFNhZmVVcmwsIFNhZmVWYWx1ZX0gZnJvbSAnLi9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCB7VkVSU0lPTn0gZnJvbSAnLi92ZXJzaW9uJztcbiJdfQ==