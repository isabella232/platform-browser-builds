/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ApplicationInitStatus, InjectionToken, Injector } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */
export var TRANSITION_ID = new InjectionToken('TRANSITION_ID');
export function appInitializerFactory(transitionId, document, injector) {
    return function () {
        // Wait for all application initializers to be completed before removing the styles set by
        // the server.
        injector.get(ApplicationInitStatus).donePromise.then(function () {
            var dom = getDOM();
            var styles = Array.prototype.slice.apply(dom.querySelectorAll(document, "style[ng-transition]"));
            styles.filter(function (el) { return dom.getAttribute(el, 'ng-transition') === transitionId; })
                .forEach(function (el) { return dom.remove(el); });
        });
    };
}
export var SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TRANSITION_ID, DOCUMENT, Injector],
        multi: true
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3NlcnZlci10cmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLHFCQUFxQixFQUFVLGNBQWMsRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakUsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFlBQW9CLEVBQUUsUUFBYSxFQUFFLFFBQWtCO0lBQzNGLE9BQU87UUFDTCwwRkFBMEY7UUFDMUYsY0FBYztRQUNkLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ25ELElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBQ3JCLElBQU0sTUFBTSxHQUNSLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUMsQ0FBQztZQUN4RixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLEtBQUssWUFBWSxFQUF0RCxDQUFzRCxDQUFDO2lCQUN0RSxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFxQjtJQUMzRDtRQUNFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDekMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcblxuLyoqXG4gKiBBbiBpZCB0aGF0IGlkZW50aWZpZXMgYSBwYXJ0aWN1bGFyIGFwcGxpY2F0aW9uIGJlaW5nIGJvb3RzdHJhcHBlZCwgdGhhdCBzaG91bGRcbiAqIG1hdGNoIGFjcm9zcyB0aGUgY2xpZW50L3NlcnZlciBib3VuZGFyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IFRSQU5TSVRJT05fSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1RSQU5TSVRJT05fSUQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcEluaXRpYWxpemVyRmFjdG9yeSh0cmFuc2l0aW9uSWQ6IHN0cmluZywgZG9jdW1lbnQ6IGFueSwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgLy8gV2FpdCBmb3IgYWxsIGFwcGxpY2F0aW9uIGluaXRpYWxpemVycyB0byBiZSBjb21wbGV0ZWQgYmVmb3JlIHJlbW92aW5nIHRoZSBzdHlsZXMgc2V0IGJ5XG4gICAgLy8gdGhlIHNlcnZlci5cbiAgICBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25Jbml0U3RhdHVzKS5kb25lUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvbSA9IGdldERPTSgpO1xuICAgICAgY29uc3Qgc3R5bGVzOiBhbnlbXSA9XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGRvbS5xdWVyeVNlbGVjdG9yQWxsKGRvY3VtZW50LCBgc3R5bGVbbmctdHJhbnNpdGlvbl1gKSk7XG4gICAgICBzdHlsZXMuZmlsdGVyKGVsID0+IGRvbS5nZXRBdHRyaWJ1dGUoZWwsICduZy10cmFuc2l0aW9uJykgPT09IHRyYW5zaXRpb25JZClcbiAgICAgICAgICAuZm9yRWFjaChlbCA9PiBkb20ucmVtb3ZlKGVsKSk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogYXBwSW5pdGlhbGl6ZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtUUkFOU0lUSU9OX0lELCBET0NVTUVOVCwgSW5qZWN0b3JdLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG5dO1xuIl19