import { APP_ID, NgModule, NgZone, PLATFORM_INITIALIZER, createPlatformFactory, platformCore } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as BrowserDomAdapter, ɵELEMENT_PROBE_PROVIDERS as ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { BrowserDetection, createNgZone } from './browser_util';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
/** @type {?} */
const _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/** *
 * Platform for testing
 *
 *
  @type {?} */
export const platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 *
 */
export class BrowserTestingModule {
}
BrowserTestingModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                providers: [
                    { provide: APP_ID, useValue: 'a' },
                    ELEMENT_PROBE_PROVIDERS,
                    { provide: NgZone, useFactory: createNgZone },
                ]
            },] },
];
BrowserTestingModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserTestingModule, bootstrap: [], declarations: [], imports: [], exports: [BrowserModule] });
BrowserTestingModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserTestingModule_Factory(t) { return new (t || BrowserTestingModule)(); }, providers: [
        { provide: APP_ID, useValue: 'a' },
        ELEMENT_PROBE_PROVIDERS,
        { provide: NgZone, useFactory: createNgZone },
    ], imports: [[BrowserModule]] });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQStCLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQUMsYUFBYSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEosT0FBTyxFQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFFOUQ7SUFDRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUMxQjs7QUFFRCxNQUFNLGdDQUFnQyxHQUNsQyxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7Ozs7O0FBTy9FLGFBQWEsc0JBQXNCLEdBQy9CLHFCQUFxQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDOzs7Ozs7QUFlNUYsTUFBTTs7O1lBUkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO29CQUNoQyx1QkFBdUI7b0JBQ3ZCLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDO2lCQUM1QzthQUNGOzs4REFDWSxvQkFBb0IsMERBUHJCLGFBQWE7OEhBT1osb0JBQW9CLG1CQU5wQjtRQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO1FBQ2hDLHVCQUF1QjtRQUN2QixFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQztLQUM1QyxZQUxRLENBQUMsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBQbGF0Zm9ybVJlZiwgU3RhdGljUHJvdmlkZXIsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlciwgybVFTEVNRU5UX1BST0JFX1BST1ZJREVSUyBhcyBFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0Jyb3dzZXJEZXRlY3Rpb24sIGNyZWF0ZU5nWm9uZX0gZnJvbSAnLi9icm93c2VyX3V0aWwnO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG59XG5cbmNvbnN0IF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID1cbiAgICBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdEJyb3dzZXJUZXN0cywgbXVsdGk6IHRydWV9XTtcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXJUZXN0aW5nID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnYnJvd3NlclRlc3RpbmcnLCBfVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogTmdNb2R1bGUgZm9yIHRlc3RpbmcuXG4gKlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogJ2EnfSxcbiAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogTmdab25lLCB1c2VGYWN0b3J5OiBjcmVhdGVOZ1pvbmV9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUZXN0aW5nTW9kdWxlIHtcbn1cbiJdfQ==