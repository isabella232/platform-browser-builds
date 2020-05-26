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
export { BrowserTransferStateModule, makeStateKey, TransferState } from './browser/transfer_state';
export { By } from './dom/debug/by';
export { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
export { HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HAMMER_PROVIDERS__POST_R3__ as ɵHAMMER_PROVIDERS__POST_R3__, HammerGestureConfig, HammerModule } from './dom/events/hammer_gestures';
export { DomSanitizer } from './security/dom_sanitization_service';
export * from './private_export';
export { VERSION } from './version';
// This must be exported so it doesn't get tree-shaken away prematurely
export { ELEMENT_PROBE_PROVIDERS__POST_R3__ as ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from './dom/debug/ng_probe';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3BsYXRmb3JtLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLElBQUksRUFBaUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLDBCQUEwQixFQUFFLFlBQVksRUFBWSxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRyxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEMsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9FLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsMkJBQTJCLElBQUksNEJBQTRCLEVBQUUsbUJBQW1CLEVBQWdCLFlBQVksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hNLE9BQU8sRUFBQyxZQUFZLEVBQXVFLE1BQU0scUNBQXFDLENBQUM7QUFFdkksY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLHVFQUF1RTtBQUN2RSxPQUFPLEVBQUMsa0NBQWtDLElBQUksbUNBQW1DLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0IHtCcm93c2VyTW9kdWxlLCBwbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJy4vYnJvd3Nlcic7XG5leHBvcnQge01ldGEsIE1ldGFEZWZpbml0aW9ufSBmcm9tICcuL2Jyb3dzZXIvbWV0YSc7XG5leHBvcnQge1RpdGxlfSBmcm9tICcuL2Jyb3dzZXIvdGl0bGUnO1xuZXhwb3J0IHtkaXNhYmxlRGVidWdUb29scywgZW5hYmxlRGVidWdUb29sc30gZnJvbSAnLi9icm93c2VyL3Rvb2xzL3Rvb2xzJztcbmV4cG9ydCB7QnJvd3NlclRyYW5zZmVyU3RhdGVNb2R1bGUsIG1ha2VTdGF0ZUtleSwgU3RhdGVLZXksIFRyYW5zZmVyU3RhdGV9IGZyb20gJy4vYnJvd3Nlci90cmFuc2Zlcl9zdGF0ZSc7XG5leHBvcnQge0J5fSBmcm9tICcuL2RvbS9kZWJ1Zy9ieSc7XG5leHBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5leHBvcnQge0hBTU1FUl9HRVNUVVJFX0NPTkZJRywgSEFNTUVSX0xPQURFUiwgSEFNTUVSX1BST1ZJREVSU19fUE9TVF9SM19fIGFzIMm1SEFNTUVSX1BST1ZJREVSU19fUE9TVF9SM19fLCBIYW1tZXJHZXN0dXJlQ29uZmlnLCBIYW1tZXJMb2FkZXIsIEhhbW1lck1vZHVsZX0gZnJvbSAnLi9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5leHBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWwsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVNjcmlwdCwgU2FmZVN0eWxlLCBTYWZlVXJsLCBTYWZlVmFsdWV9IGZyb20gJy4vc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQge1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbic7XG4vLyBUaGlzIG11c3QgYmUgZXhwb3J0ZWQgc28gaXQgZG9lc24ndCBnZXQgdHJlZS1zaGFrZW4gYXdheSBwcmVtYXR1cmVseVxuZXhwb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUE9TVF9SM19fIGFzIMm1RUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BPU1RfUjNfX30gZnJvbSAnLi9kb20vZGVidWcvbmdfcHJvYmUnO1xuIl19