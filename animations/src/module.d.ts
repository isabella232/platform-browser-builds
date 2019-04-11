import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
export declare class BrowserAnimationsModule {
    static ngModuleDef: i0.ɵɵNgModuleDefWithMeta<BrowserAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ngInjectorDef: i0.ɵɵInjectorDef<BrowserAnimationsModule>;
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export declare class NoopAnimationsModule {
    static ngModuleDef: i0.ɵɵNgModuleDefWithMeta<NoopAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ngInjectorDef: i0.ɵɵInjectorDef<NoopAnimationsModule>;
}
