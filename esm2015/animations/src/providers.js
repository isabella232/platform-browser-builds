/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/animations/src/providers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AnimationBuilder } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine as AnimationEngine, ɵAnimationStyleNormalizer as AnimationStyleNormalizer, ɵCssKeyframesDriver as CssKeyframesDriver, ɵNoopAnimationDriver as NoopAnimationDriver, ɵWebAnimationsDriver as WebAnimationsDriver, ɵWebAnimationsStyleNormalizer as WebAnimationsStyleNormalizer, ɵsupportsWebAnimations as supportsWebAnimations } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, RendererFactory2 } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { BrowserAnimationBuilder } from './animation_builder';
import { AnimationRendererFactory } from './animation_renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class InjectableAnimationEngine extends AnimationEngine {
    /**
     * @param {?} doc
     * @param {?} driver
     * @param {?} normalizer
     */
    constructor(doc, driver, normalizer) {
        super(doc.body, driver, normalizer);
    }
}
InjectableAnimationEngine.decorators = [
    { type: Injectable },
];
/** @nocollapse */
InjectableAnimationEngine.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: AnimationDriver },
    { type: AnimationStyleNormalizer }
];
/** @nocollapse */ InjectableAnimationEngine.ɵfac = function InjectableAnimationEngine_Factory(t) { return new (t || InjectableAnimationEngine)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i1.AnimationDriver), i0.ɵɵinject(i1.ɵAnimationStyleNormalizer)); };
/** @nocollapse */ InjectableAnimationEngine.ɵprov = i0.ɵɵdefineInjectable({ token: InjectableAnimationEngine, factory: InjectableAnimationEngine.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(InjectableAnimationEngine, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i1.AnimationDriver }, { type: i1.ɵAnimationStyleNormalizer }]; }, null); })();
/**
 * @return {?}
 */
export function instantiateSupportedAnimationDriver() {
    return supportsWebAnimations() ? new WebAnimationsDriver() : new CssKeyframesDriver();
}
/**
 * @return {?}
 */
export function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
export function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
/**
 * \@publicApi
 * @type {?}
 */
export const ANIMATION_MODULE_TYPE = new InjectionToken('AnimationModuleType');
/** @type {?} */
const SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: AnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: AnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [DomRendererFactory2, AnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 * @type {?}
 */
export const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 * @type {?}
 */
export const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useClass: NoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSx5QkFBeUIsSUFBSSx3QkFBd0IsRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSw2QkFBNkIsSUFBSSw0QkFBNEIsRUFBRSxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdZLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFZLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7O0FBRzlELE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxlQUFlOzs7Ozs7SUFDNUQsWUFDc0IsR0FBUSxFQUFFLE1BQXVCLEVBQUUsVUFBb0M7UUFDM0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQUxGLFVBQVU7Ozs7NENBR0osTUFBTSxTQUFDLFFBQVE7WUFYZCxlQUFlO1lBQW9FLHdCQUF3Qjs7a0dBU3RHLHlCQUF5QixjQUV4QixRQUFRO2lFQUZULHlCQUF5QixXQUF6Qix5QkFBeUI7a0RBQXpCLHlCQUF5QjtjQURyQyxVQUFVOztzQkFHSixNQUFNO3VCQUFDLFFBQVE7Ozs7O0FBS3RCLE1BQU0sVUFBVSxtQ0FBbUM7SUFDakQsT0FBTyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUN4RixDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLGlDQUFpQztJQUMvQyxPQUFPLElBQUksNEJBQTRCLEVBQUUsQ0FBQztBQUM1QyxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN0QyxRQUE2QixFQUFFLE1BQXVCLEVBQUUsSUFBWTtJQUN0RSxPQUFPLElBQUksd0JBQXdCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7OztBQUtELE1BQU0sT0FBTyxxQkFBcUIsR0FDOUIsSUFBSSxjQUFjLENBQXVDLHFCQUFxQixDQUFDOztNQUU3RSwwQkFBMEIsR0FBZTtJQUM3QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7SUFDOUQsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLGlDQUFpQyxFQUFDO0lBQ2xGLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUMsRUFBRTtRQUMvRCxPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLFVBQVUsRUFBRSwwQkFBMEI7UUFDdEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQztLQUNyRDtDQUNGOzs7Ozs7QUFNRCxNQUFNLE9BQU8sNEJBQTRCLEdBQWU7SUFDdEQsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBQztJQUMzRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUMsRUFBRSxHQUFHLDBCQUEwQjtDQUMvRjs7Ozs7O0FBTUQsTUFBTSxPQUFPLGlDQUFpQyxHQUFlO0lBQzNELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7SUFDekQsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFDLEVBQUUsR0FBRywwQkFBMEI7Q0FDNUYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlciwgybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lLCDJtUFuaW1hdGlvblN0eWxlTm9ybWFsaXplciBhcyBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIsIMm1Q3NzS2V5ZnJhbWVzRHJpdmVyIGFzIENzc0tleWZyYW1lc0RyaXZlciwgybVOb29wQW5pbWF0aW9uRHJpdmVyIGFzIE5vb3BBbmltYXRpb25Ecml2ZXIsIMm1V2ViQW5pbWF0aW9uc0RyaXZlciBhcyBXZWJBbmltYXRpb25zRHJpdmVyLCDJtVdlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIgYXMgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplciwgybVzdXBwb3J0c1dlYkFuaW1hdGlvbnMgYXMgc3VwcG9ydHNXZWJBbmltYXRpb25zfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnLi9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnLi9hbmltYXRpb25fcmVuZGVyZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5qZWN0YWJsZUFuaW1hdGlvbkVuZ2luZSBleHRlbmRzIEFuaW1hdGlvbkVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksIGRyaXZlcjogQW5pbWF0aW9uRHJpdmVyLCBub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpIHtcbiAgICBzdXBlcihkb2MuYm9keSwgZHJpdmVyLCBub3JtYWxpemVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVTdXBwb3J0ZWRBbmltYXRpb25Ecml2ZXIoKSB7XG4gIHJldHVybiBzdXBwb3J0c1dlYkFuaW1hdGlvbnMoKSA/IG5ldyBXZWJBbmltYXRpb25zRHJpdmVyKCkgOiBuZXcgQ3NzS2V5ZnJhbWVzRHJpdmVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZURlZmF1bHRTdHlsZU5vcm1hbGl6ZXIoKSB7XG4gIHJldHVybiBuZXcgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkocmVuZGVyZXIsIGVuZ2luZSwgem9uZSk7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX01PRFVMRV9UWVBFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48J05vb3BBbmltYXRpb25zJ3wnQnJvd3NlckFuaW1hdGlvbnMnPignQW5pbWF0aW9uTW9kdWxlVHlwZScpO1xuXG5jb25zdCBTSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEFuaW1hdGlvbkJ1aWxkZXIsIHVzZUNsYXNzOiBCcm93c2VyQW5pbWF0aW9uQnVpbGRlcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlRGVmYXVsdFN0eWxlTm9ybWFsaXplcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25FbmdpbmUsIHVzZUNsYXNzOiBJbmplY3RhYmxlQW5pbWF0aW9uRW5naW5lfSwge1xuICAgIHByb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgdXNlRmFjdG9yeTogaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnksXG4gICAgZGVwczogW0RvbVJlbmRlcmVyRmFjdG9yeTIsIEFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9XG5dO1xuXG4vKipcbiAqIFNlcGFyYXRlIHByb3ZpZGVycyBmcm9tIHRoZSBhY3R1YWwgbW9kdWxlIHNvIHRoYXQgd2UgY2FuIGRvIGEgbG9jYWwgbW9kaWZpY2F0aW9uIGluIEdvb2dsZTMgdG9cbiAqIGluY2x1ZGUgdGhlbSBpbiB0aGUgQnJvd3Nlck1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBBbmltYXRpb25Ecml2ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU3VwcG9ydGVkQW5pbWF0aW9uRHJpdmVyfSxcbiAge3Byb3ZpZGU6IEFOSU1BVElPTl9NT0RVTEVfVFlQRSwgdXNlVmFsdWU6ICdCcm93c2VyQW5pbWF0aW9ucyd9LCAuLi5TSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSU1xuXTtcblxuLyoqXG4gKiBTZXBhcmF0ZSBwcm92aWRlcnMgZnJvbSB0aGUgYWN0dWFsIG1vZHVsZSBzbyB0aGF0IHdlIGNhbiBkbyBhIGxvY2FsIG1vZGlmaWNhdGlvbiBpbiBHb29nbGUzIHRvXG4gKiBpbmNsdWRlIHRoZW0gaW4gdGhlIEJyb3dzZXJUZXN0aW5nTW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uRHJpdmVyLCB1c2VDbGFzczogTm9vcEFuaW1hdGlvbkRyaXZlcn0sXG4gIHtwcm92aWRlOiBBTklNQVRJT05fTU9EVUxFX1RZUEUsIHVzZVZhbHVlOiAnTm9vcEFuaW1hdGlvbnMnfSwgLi4uU0hBUkVEX0FOSU1BVElPTl9QUk9WSURFUlNcbl07XG4iXX0=