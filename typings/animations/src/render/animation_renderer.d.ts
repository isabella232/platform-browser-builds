/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationTriggerMetadata } from '@angular/animations';
import { RendererFactoryV2, RendererTypeV2, RendererV2 } from '@angular/core';
import { AnimationEngine } from './animation_engine';
export declare class AnimationRendererFactory implements RendererFactoryV2 {
    private delegate;
    private _engine;
    constructor(delegate: RendererFactoryV2, _engine: AnimationEngine);
    createRenderer(hostElement: any, type: RendererTypeV2): RendererV2;
}
export declare class AnimationRenderer implements RendererV2 {
    delegate: RendererV2;
    private _engine;
    destroyNode: (node: any) => (void | any);
    constructor(delegate: RendererV2, _engine: AnimationEngine, _triggers?: AnimationTriggerMetadata[]);
    destroy(): void;
    createElement(name: string, namespace?: string): any;
    createComment(value: string): any;
    createText(value: string): any;
    selectRootElement(selectorOrNode: string | any): any;
    parentNode(node: any): any;
    nextSibling(node: any): any;
    setAttribute(el: any, name: string, value: string, namespace?: string): void;
    removeAttribute(el: any, name: string, namespace?: string): void;
    addClass(el: any, name: string): void;
    removeClass(el: any, name: string): void;
    setStyle(el: any, style: string, value: any, hasVendorPrefix: boolean, hasImportant: boolean): void;
    removeStyle(el: any, style: string, hasVendorPrefix: boolean): void;
    setValue(node: any, value: string): void;
    appendChild(parent: any, newChild: any): void;
    insertBefore(parent: any, newChild: any, refChild: any): void;
    removeChild(parent: any, oldChild: any): void;
    setProperty(el: any, name: string, value: any): void;
    listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => any): () => void;
}
