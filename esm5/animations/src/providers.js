import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationBuilder } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine as AnimationEngine, ɵAnimationStyleNormalizer as AnimationStyleNormalizer, ɵCssKeyframesDriver as CssKeyframesDriver, ɵNoopAnimationDriver as NoopAnimationDriver, ɵWebAnimationsDriver as WebAnimationsDriver, ɵWebAnimationsStyleNormalizer as WebAnimationsStyleNormalizer, ɵsupportsWebAnimations as supportsWebAnimations } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, RendererFactory2 } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { BrowserAnimationBuilder } from './animation_builder';
import { AnimationRendererFactory } from './animation_renderer';
import * as i0 from "@angular/core";
var InjectableAnimationEngine = /** @class */ (function (_super) {
    tslib_1.__extends(InjectableAnimationEngine, _super);
    function InjectableAnimationEngine(doc, driver, normalizer) {
        return _super.call(this, doc.body, driver, normalizer) || this;
    }
    InjectableAnimationEngine.ngInjectableDef = i0.defineInjectable({ token: InjectableAnimationEngine, factory: function InjectableAnimationEngine_Factory(t) { return new (t || InjectableAnimationEngine)(i0.inject(DOCUMENT), i0.inject(AnimationDriver), i0.inject(AnimationStyleNormalizer)); }, providedIn: null });
    return InjectableAnimationEngine;
}(AnimationEngine));
export { InjectableAnimationEngine };
export function instantiateSupportedAnimationDriver() {
    return supportsWebAnimations() ? new WebAnimationsDriver() : new CssKeyframesDriver();
}
export function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
export function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
/**
 * @experimental Animation support is experimental.
 */
export var ANIMATION_MODULE_TYPE = new InjectionToken('AnimationModuleType');
var SHARED_ANIMATION_PROVIDERS = [
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
 */
export var BROWSER_ANIMATIONS_PROVIDERS = tslib_1.__spread([
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }
], SHARED_ANIMATION_PROVIDERS);
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
export var BROWSER_NOOP_ANIMATIONS_PROVIDERS = tslib_1.__spread([
    { provide: AnimationDriver, useClass: NoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }
], SHARED_ANIMATION_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUUsZ0JBQWdCLElBQUksZUFBZSxFQUFFLHlCQUF5QixJQUFJLHdCQUF3QixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFFLDZCQUE2QixJQUFJLDRCQUE0QixFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN1ksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQVksZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBRTlEO0lBQytDLHFEQUFlO0lBQzVELG1DQUNzQixHQUFRLEVBQUUsTUFBdUIsRUFBRSxVQUFvQztlQUMzRixrQkFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUM7SUFDckMsQ0FBQzs2RUFKVSx5QkFBeUIsNEVBQXpCLHlCQUF5QixZQUV4QixRQUFRLGFBQW9CLGVBQWUsYUFBYyx3QkFBd0I7b0NBcEIvRjtDQXVCQyxBQU5ELENBQytDLGVBQWUsR0FLN0Q7U0FMWSx5QkFBeUI7QUFPdEMsTUFBTTtJQUNKLE9BQU8scUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFDeEYsQ0FBQztBQUVELE1BQU07SUFDSixPQUFPLElBQUksNEJBQTRCLEVBQUUsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxxQ0FDRixRQUE2QixFQUFFLE1BQXVCLEVBQUUsSUFBWTtJQUN0RSxPQUFPLElBQUksd0JBQXdCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FDOUIsSUFBSSxjQUFjLENBQXVDLHFCQUFxQixDQUFDLENBQUM7QUFFcEYsSUFBTSwwQkFBMEIsR0FBZTtJQUM3QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7SUFDOUQsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLGlDQUFpQyxFQUFDO0lBQ2xGLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUMsRUFBRTtRQUMvRCxPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLFVBQVUsRUFBRSwwQkFBMEI7UUFDdEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQztLQUNyRDtDQUNGLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSw0QkFBNEI7SUFDdkMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBQztJQUMzRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7R0FBSywwQkFBMEIsQ0FDL0YsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLGlDQUFpQztJQUM1QyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDO0lBQ3pELEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQztHQUFLLDBCQUEwQixDQUM1RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtBbmltYXRpb25Ecml2ZXIsIMm1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZSwgybVBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIgYXMgQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyLCDJtUNzc0tleWZyYW1lc0RyaXZlciBhcyBDc3NLZXlmcmFtZXNEcml2ZXIsIMm1Tm9vcEFuaW1hdGlvbkRyaXZlciBhcyBOb29wQW5pbWF0aW9uRHJpdmVyLCDJtVdlYkFuaW1hdGlvbnNEcml2ZXIgYXMgV2ViQW5pbWF0aW9uc0RyaXZlciwgybVXZWJBbmltYXRpb25zU3R5bGVOb3JtYWxpemVyIGFzIFdlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIsIMm1c3VwcG9ydHNXZWJBbmltYXRpb25zIGFzIHN1cHBvcnRzV2ViQW5pbWF0aW9uc30gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgUHJvdmlkZXIsIFJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtURvbVJlbmRlcmVyRmFjdG9yeTIgYXMgRG9tUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJy4vYW5pbWF0aW9uX2J1aWxkZXInO1xuaW1wb3J0IHtBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJy4vYW5pbWF0aW9uX3JlbmRlcmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluamVjdGFibGVBbmltYXRpb25FbmdpbmUgZXh0ZW5kcyBBbmltYXRpb25FbmdpbmUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55LCBkcml2ZXI6IEFuaW1hdGlvbkRyaXZlciwgbm9ybWFsaXplcjogQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyKSB7XG4gICAgc3VwZXIoZG9jLmJvZHksIGRyaXZlciwgbm9ybWFsaXplcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlU3VwcG9ydGVkQW5pbWF0aW9uRHJpdmVyKCkge1xuICByZXR1cm4gc3VwcG9ydHNXZWJBbmltYXRpb25zKCkgPyBuZXcgV2ViQW5pbWF0aW9uc0RyaXZlcigpIDogbmV3IENzc0tleWZyYW1lc0RyaXZlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVEZWZhdWx0U3R5bGVOb3JtYWxpemVyKCkge1xuICByZXR1cm4gbmV3IFdlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlUmVuZGVyZXJGYWN0b3J5KFxuICAgIHJlbmRlcmVyOiBEb21SZW5kZXJlckZhY3RvcnkyLCBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSwgem9uZTogTmdab25lKSB7XG4gIHJldHVybiBuZXcgQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KHJlbmRlcmVyLCBlbmdpbmUsIHpvbmUpO1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgQW5pbWF0aW9uIHN1cHBvcnQgaXMgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX01PRFVMRV9UWVBFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48J05vb3BBbmltYXRpb25zJ3wnQnJvd3NlckFuaW1hdGlvbnMnPignQW5pbWF0aW9uTW9kdWxlVHlwZScpO1xuXG5jb25zdCBTSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEFuaW1hdGlvbkJ1aWxkZXIsIHVzZUNsYXNzOiBCcm93c2VyQW5pbWF0aW9uQnVpbGRlcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlRGVmYXVsdFN0eWxlTm9ybWFsaXplcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25FbmdpbmUsIHVzZUNsYXNzOiBJbmplY3RhYmxlQW5pbWF0aW9uRW5naW5lfSwge1xuICAgIHByb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgdXNlRmFjdG9yeTogaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnksXG4gICAgZGVwczogW0RvbVJlbmRlcmVyRmFjdG9yeTIsIEFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9XG5dO1xuXG4vKipcbiAqIFNlcGFyYXRlIHByb3ZpZGVycyBmcm9tIHRoZSBhY3R1YWwgbW9kdWxlIHNvIHRoYXQgd2UgY2FuIGRvIGEgbG9jYWwgbW9kaWZpY2F0aW9uIGluIEdvb2dsZTMgdG9cbiAqIGluY2x1ZGUgdGhlbSBpbiB0aGUgQnJvd3Nlck1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBBbmltYXRpb25Ecml2ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU3VwcG9ydGVkQW5pbWF0aW9uRHJpdmVyfSxcbiAge3Byb3ZpZGU6IEFOSU1BVElPTl9NT0RVTEVfVFlQRSwgdXNlVmFsdWU6ICdCcm93c2VyQW5pbWF0aW9ucyd9LCAuLi5TSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSU1xuXTtcblxuLyoqXG4gKiBTZXBhcmF0ZSBwcm92aWRlcnMgZnJvbSB0aGUgYWN0dWFsIG1vZHVsZSBzbyB0aGF0IHdlIGNhbiBkbyBhIGxvY2FsIG1vZGlmaWNhdGlvbiBpbiBHb29nbGUzIHRvXG4gKiBpbmNsdWRlIHRoZW0gaW4gdGhlIEJyb3dzZXJUZXN0aW5nTW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uRHJpdmVyLCB1c2VDbGFzczogTm9vcEFuaW1hdGlvbkRyaXZlcn0sXG4gIHtwcm92aWRlOiBBTklNQVRJT05fTU9EVUxFX1RZUEUsIHVzZVZhbHVlOiAnTm9vcEFuaW1hdGlvbnMnfSwgLi4uU0hBUkVEX0FOSU1BVElPTl9QUk9WSURFUlNcbl07XG4iXX0=