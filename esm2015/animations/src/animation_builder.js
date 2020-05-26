import { __decorate, __metadata, __param } from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationBuilder, AnimationFactory, sequence } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
let BrowserAnimationBuilder = /** @class */ (() => {
    let BrowserAnimationBuilder = class BrowserAnimationBuilder extends AnimationBuilder {
        constructor(rootRenderer, doc) {
            super();
            this._nextAnimationId = 0;
            const typeData = { id: '0', encapsulation: ViewEncapsulation.None, styles: [], data: { animation: [] } };
            this._renderer = rootRenderer.createRenderer(doc.body, typeData);
        }
        build(animation) {
            const id = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const entry = Array.isArray(animation) ? sequence(animation) : animation;
            issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
            return new BrowserAnimationFactory(id, this._renderer);
        }
    };
    BrowserAnimationBuilder = __decorate([
        Injectable(),
        __param(1, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [RendererFactory2, Object])
    ], BrowserAnimationBuilder);
    return BrowserAnimationBuilder;
})();
export { BrowserAnimationBuilder };
export class BrowserAnimationFactory extends AnimationFactory {
    constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
    }
    create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    }
}
export class RendererAnimationPlayer {
    constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
    }
    _command(command, ...args) {
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    }
    onDone(fn) {
        this._listen('done', fn);
    }
    onStart(fn) {
        this._listen('start', fn);
    }
    onDestroy(fn) {
        this._listen('destroy', fn);
    }
    init() {
        this._command('init');
    }
    hasStarted() {
        return this._started;
    }
    play() {
        this._command('play');
        this._started = true;
    }
    pause() {
        this._command('pause');
    }
    restart() {
        this._command('restart');
    }
    finish() {
        this._command('finish');
    }
    destroy() {
        this._command('destroy');
    }
    reset() {
        this._command('reset');
    }
    setPosition(p) {
        this._command('setPosition', p);
    }
    getPosition() {
        return 0;
    }
}
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, `@@${id}:${command}`, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQXdELFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZJLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLckc7SUFBQSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGdCQUFnQjtRQUkzRCxZQUFZLFlBQThCLEVBQW9CLEdBQVE7WUFDcEUsS0FBSyxFQUFFLENBQUM7WUFKRixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFLM0IsTUFBTSxRQUFRLEdBQ1YsRUFBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFDLEVBQ3JFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFzQixDQUFDO1FBQ3hGLENBQUM7UUFFRCxLQUFLLENBQUMsU0FBZ0Q7WUFDcEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMs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QUFPO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVyxDQUFDLENBQVM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FHRjtBQUVELFNBQVMscUJBQXFCLENBQzFCLFFBQTJCLEVBQUUsT0FBWSxFQUFFLEVBQVUsRUFBRSxPQUFlLEVBQUUsSUFBVztJQUNyRixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlciwgQW5pbWF0aW9uRmFjdG9yeSwgQW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk9wdGlvbnMsIEFuaW1hdGlvblBsYXllciwgc2VxdWVuY2V9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QW5pbWF0aW9uUmVuZGVyZXJ9IGZyb20gJy4vYW5pbWF0aW9uX3JlbmRlcmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJBbmltYXRpb25CdWlsZGVyIGV4dGVuZHMgQW5pbWF0aW9uQnVpbGRlciB7XG4gIHByaXZhdGUgX25leHRBbmltYXRpb25JZCA9IDA7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcjtcblxuICBjb25zdHJ1Y3Rvcihyb290UmVuZGVyZXI6IFJlbmRlcmVyRmFjdG9yeTIsIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCB0eXBlRGF0YSA9XG4gICAgICAgIHtpZDogJzAnLCBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLCBzdHlsZXM6IFtdLCBkYXRhOiB7YW5pbWF0aW9uOiBbXX19IGFzXG4gICAgICAgIFJlbmRlcmVyVHlwZTI7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByb290UmVuZGVyZXIuY3JlYXRlUmVuZGVyZXIoZG9jLmJvZHksIHR5cGVEYXRhKSBhcyBBbmltYXRpb25SZW5kZXJlcjtcbiAgfVxuXG4gIGJ1aWxkKGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSk6IEFuaW1hdGlvbkZhY3Rvcnkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5fbmV4dEFuaW1hdGlvbklkLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbmV4dEFuaW1hdGlvbklkKys7XG4gICAgY29uc3QgZW50cnkgPSBBcnJheS5pc0FycmF5KGFuaW1hdGlvbikgPyBzZXF1ZW5jZShhbmltYXRpb24pIDogYW5pbWF0aW9uO1xuICAgIGlzc3VlQW5pbWF0aW9uQ29tbWFuZCh0aGlzLl9yZW5kZXJlciwgbnVsbCwgaWQsICdyZWdpc3RlcicsIFtlbnRyeV0pO1xuICAgIHJldHVybiBuZXcgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkoaWQsIHRoaXMuX3JlbmRlcmVyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkgZXh0ZW5kcyBBbmltYXRpb25GYWN0b3J5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaWQ6IHN0cmluZywgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZShlbGVtZW50OiBhbnksIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyKHRoaXMuX2lkLCBlbGVtZW50LCBvcHRpb25zIHx8IHt9LCB0aGlzLl9yZW5kZXJlcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHVibGljIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9zdGFydGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIGVsZW1lbnQ6IGFueSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcikge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2NyZWF0ZScsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50LCBgQEAke3RoaXMuaWR9OiR7ZXZlbnROYW1lfWAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIHJldHVybiBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQodGhpcy5fcmVuZGVyZXIsIHRoaXMuZWxlbWVudCwgdGhpcy5pZCwgY29tbWFuZCwgYXJncyk7XG4gIH1cblxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW4oJ2RvbmUnLCBmbik7XG4gIH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuKCdzdGFydCcsIGZuKTtcbiAgfVxuXG4gIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbignZGVzdHJveScsIGZuKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnaW5pdCcpO1xuICB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRlZDtcbiAgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGxheScpO1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGF1c2UnKTtcbiAgfVxuXG4gIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncmVzdGFydCcpO1xuICB9XG5cbiAgZmluaXNoKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2ZpbmlzaCcpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdkZXN0cm95Jyk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdyZXNldCcpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnc2V0UG9zaXRpb24nLCBwKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwdWJsaWMgdG90YWxUaW1lID0gMDtcbn1cblxuZnVuY3Rpb24gaXNzdWVBbmltYXRpb25Db21tYW5kKFxuICAgIHJlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlciwgZWxlbWVudDogYW55LCBpZDogc3RyaW5nLCBjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIHJlbmRlcmVyLnNldFByb3BlcnR5KGVsZW1lbnQsIGBAQCR7aWR9OiR7Y29tbWFuZH1gLCBhcmdzKTtcbn1cbiJdfQ==