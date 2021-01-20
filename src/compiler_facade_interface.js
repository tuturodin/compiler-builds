/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/compiler_facade_interface", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewEncapsulation = exports.R3FactoryTarget = exports.R3ResolvedDependencyType = void 0;
    var R3ResolvedDependencyType;
    (function (R3ResolvedDependencyType) {
        R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
        R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
        R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 2] = "ChangeDetectorRef";
        R3ResolvedDependencyType[R3ResolvedDependencyType["Invalid"] = 3] = "Invalid";
    })(R3ResolvedDependencyType = exports.R3ResolvedDependencyType || (exports.R3ResolvedDependencyType = {}));
    var R3FactoryTarget;
    (function (R3FactoryTarget) {
        R3FactoryTarget[R3FactoryTarget["Directive"] = 0] = "Directive";
        R3FactoryTarget[R3FactoryTarget["Component"] = 1] = "Component";
        R3FactoryTarget[R3FactoryTarget["Injectable"] = 2] = "Injectable";
        R3FactoryTarget[R3FactoryTarget["Pipe"] = 3] = "Pipe";
        R3FactoryTarget[R3FactoryTarget["NgModule"] = 4] = "NgModule";
    })(R3FactoryTarget = exports.R3FactoryTarget || (exports.R3FactoryTarget = {}));
    var ViewEncapsulation;
    (function (ViewEncapsulation) {
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
        ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    })(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQStESCxJQUFZLHdCQUtYO0lBTEQsV0FBWSx3QkFBd0I7UUFDbEMseUVBQVMsQ0FBQTtRQUNULGlGQUFhLENBQUE7UUFDYixpR0FBcUIsQ0FBQTtRQUNyQiw2RUFBVyxDQUFBO0lBQ2IsQ0FBQyxFQUxXLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBS25DO0lBRUQsSUFBWSxlQU1YO0lBTkQsV0FBWSxlQUFlO1FBQ3pCLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO1FBQ2IsaUVBQWMsQ0FBQTtRQUNkLHFEQUFRLENBQUE7UUFDUiw2REFBWSxDQUFBO0lBQ2QsQ0FBQyxFQU5XLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0lBbUdELElBQVksaUJBS1g7SUFMRCxXQUFZLGlCQUFpQjtRQUMzQixpRUFBWSxDQUFBO1FBQ1osNEZBQTRGO1FBQzVGLHlEQUFRLENBQUE7UUFDUixtRUFBYSxDQUFBO0lBQ2YsQ0FBQyxFQUxXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSzVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLyoqXG4gKiBBIHNldCBvZiBpbnRlcmZhY2VzIHdoaWNoIGFyZSBzaGFyZWQgYmV0d2VlbiBgQGFuZ3VsYXIvY29yZWAgYW5kIGBAYW5ndWxhci9jb21waWxlcmAgdG8gYWxsb3dcbiAqIGZvciBsYXRlIGJpbmRpbmcgb2YgYEBhbmd1bGFyL2NvbXBpbGVyYCBmb3IgSklUIHB1cnBvc2VzLlxuICpcbiAqIFRoaXMgZmlsZSBoYXMgdHdvIGNvcGllcy4gUGxlYXNlIGVuc3VyZSB0aGF0IHRoZXkgYXJlIGluIHN5bmM6XG4gKiAgLSBwYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyAgICAgICAgICAobWFpbilcbiAqICAtIHBhY2thZ2VzL2NvcmUvc3JjL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMgICAgIChyZXBsaWNhKVxuICpcbiAqIFBsZWFzZSBlbnN1cmUgdGhhdCB0aGUgdHdvIGZpbGVzIGFyZSBpbiBzeW5jIHVzaW5nIHRoaXMgY29tbWFuZDpcbiAqIGBgYFxuICogY3AgcGFja2FnZXMvY29tcGlsZXIvc3JjL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMgXFxcbiAqICAgIHBhY2thZ2VzL2NvcmUvc3JjL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHNcbiAqIGBgYFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0ZWRDb21waWxlckZhY2FkZSB7XG4gIMm1Y29tcGlsZXJGYWNhZGU6IENvbXBpbGVyRmFjYWRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVyRmFjYWRlIHtcbiAgY29tcGlsZVBpcGUoYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzUGlwZU1ldGFkYXRhRmFjYWRlKTpcbiAgICAgIGFueTtcbiAgY29tcGlsZUluamVjdGFibGUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNJbmplY3RhYmxlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVJbmplY3RvcihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0luamVjdG9yTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVOZ01vZHVsZShcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM05nTW9kdWxlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVEaXJlY3RpdmUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUNvbXBvbmVudChcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlRmFjdG9yeShcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0ZhY3RvcnlEZWZNZXRhZGF0YUZhY2FkZSk6IGFueTtcblxuICBjcmVhdGVQYXJzZVNvdXJjZVNwYW4oa2luZDogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nLCBzb3VyY2VVcmw6IHN0cmluZyk6IFBhcnNlU291cmNlU3BhbjtcblxuICBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGU6IHR5cGVvZiBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGU7XG4gIFIzRmFjdG9yeVRhcmdldDogdHlwZW9mIFIzRmFjdG9yeVRhcmdldDtcbiAgUmVzb3VyY2VMb2FkZXI6IHtuZXcoKTogUmVzb3VyY2VMb2FkZXJ9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvcmVFbnZpcm9ubWVudCB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IHR5cGUgUmVzb3VyY2VMb2FkZXIgPSB7XG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPnxzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTdHJpbmdNYXAgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFN0cmluZ01hcFdpdGhSZW5hbWUgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvdmlkZXIgPSBhbnk7XG5cbmV4cG9ydCBlbnVtIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSB7XG4gIFRva2VuID0gMCxcbiAgQXR0cmlidXRlID0gMSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYgPSAyLFxuICBJbnZhbGlkID0gMyxcbn1cblxuZXhwb3J0IGVudW0gUjNGYWN0b3J5VGFyZ2V0IHtcbiAgRGlyZWN0aXZlID0gMCxcbiAgQ29tcG9uZW50ID0gMSxcbiAgSW5qZWN0YWJsZSA9IDIsXG4gIFBpcGUgPSAzLFxuICBOZ01vZHVsZSA9IDQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGUge1xuICB0b2tlbjogYW55O1xuICByZXNvbHZlZDogUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlO1xuICBob3N0OiBib29sZWFuO1xuICBvcHRpb25hbDogYm9vbGVhbjtcbiAgc2VsZjogYm9vbGVhbjtcbiAgc2tpcFNlbGY6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQaXBlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgcGlwZU5hbWU6IHN0cmluZztcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBwdXJlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHByb3ZpZGVkSW46IGFueTtcbiAgdXNlQ2xhc3M/OiBhbnk7XG4gIHVzZUZhY3Rvcnk/OiBhbnk7XG4gIHVzZUV4aXN0aW5nPzogYW55O1xuICB1c2VWYWx1ZT86IGFueTtcbiAgdXNlckRlcHM/OiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzTmdNb2R1bGVNZXRhZGF0YUZhY2FkZSB7XG4gIHR5cGU6IGFueTtcbiAgYm9vdHN0cmFwOiBGdW5jdGlvbltdO1xuICBkZWNsYXJhdGlvbnM6IEZ1bmN0aW9uW107XG4gIGltcG9ydHM6IEZ1bmN0aW9uW107XG4gIGV4cG9ydHM6IEZ1bmN0aW9uW107XG4gIHNjaGVtYXM6IHtuYW1lOiBzdHJpbmd9W118bnVsbDtcbiAgaWQ6IHN0cmluZ3xudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0b3JNZXRhZGF0YUZhY2FkZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogYW55O1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdfG51bGw7XG4gIHByb3ZpZGVyczogYW55W107XG4gIGltcG9ydHM6IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgdHlwZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBzZWxlY3Rvcjogc3RyaW5nfG51bGw7XG4gIHF1ZXJpZXM6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdO1xuICBob3N0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgcHJvcE1ldGFkYXRhOiB7W2tleTogc3RyaW5nXTogYW55W119O1xuICBsaWZlY3ljbGU6IHt1c2VzT25DaGFuZ2VzOiBib29sZWFuO307XG4gIGlucHV0czogc3RyaW5nW107XG4gIG91dHB1dHM6IHN0cmluZ1tdO1xuICB1c2VzSW5oZXJpdGFuY2U6IGJvb2xlYW47XG4gIGV4cG9ydEFzOiBzdHJpbmdbXXxudWxsO1xuICBwcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgdmlld1F1ZXJpZXM6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzQ29tcG9uZW50TWV0YWRhdGFGYWNhZGUgZXh0ZW5kcyBSM0RpcmVjdGl2ZU1ldGFkYXRhRmFjYWRlIHtcbiAgdGVtcGxhdGU6IHN0cmluZztcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogYm9vbGVhbjtcbiAgYW5pbWF0aW9uczogYW55W118dW5kZWZpbmVkO1xuICBwaXBlczogTWFwPHN0cmluZywgYW55PjtcbiAgZGlyZWN0aXZlczogUjNVc2VkRGlyZWN0aXZlTWV0YWRhdGFbXTtcbiAgc3R5bGVzOiBzdHJpbmdbXTtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHZpZXdQcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzVXNlZERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgaW5wdXRzOiBzdHJpbmdbXTtcbiAgb3V0cHV0czogc3RyaW5nW107XG4gIGV4cG9ydEFzOiBzdHJpbmdbXXxudWxsO1xuICB0eXBlOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNGYWN0b3J5RGVmTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBpbmplY3RGbjogJ2RpcmVjdGl2ZUluamVjdCd8J2luamVjdCc7XG4gIHRhcmdldDogUjNGYWN0b3J5VGFyZ2V0O1xufVxuXG5leHBvcnQgZW51bSBWaWV3RW5jYXBzdWxhdGlvbiB7XG4gIEVtdWxhdGVkID0gMCxcbiAgLy8gSGlzdG9yaWNhbGx5IHRoZSAxIHZhbHVlIHdhcyBmb3IgYE5hdGl2ZWAgZW5jYXBzdWxhdGlvbiB3aGljaCBoYXMgYmVlbiByZW1vdmVkIGFzIG9mIHYxMS5cbiAgTm9uZSA9IDIsXG4gIFNoYWRvd0RvbSA9IDNcbn1cblxuZXhwb3J0IHR5cGUgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPSBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNRdWVyeU1ldGFkYXRhRmFjYWRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGZpcnN0OiBib29sZWFuO1xuICBwcmVkaWNhdGU6IGFueXxzdHJpbmdbXTtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIHJlYWQ6IGFueXxudWxsO1xuICBzdGF0aWM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VTb3VyY2VTcGFuIHtcbiAgc3RhcnQ6IGFueTtcbiAgZW5kOiBhbnk7XG4gIGRldGFpbHM6IGFueTtcbiAgZnVsbFN0YXJ0OiBhbnk7XG59XG4iXX0=