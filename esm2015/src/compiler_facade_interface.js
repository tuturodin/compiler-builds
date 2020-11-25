/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var R3ResolvedDependencyType;
(function (R3ResolvedDependencyType) {
    R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
    R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
    R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 2] = "ChangeDetectorRef";
    R3ResolvedDependencyType[R3ResolvedDependencyType["Invalid"] = 3] = "Invalid";
})(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
export var R3FactoryTarget;
(function (R3FactoryTarget) {
    R3FactoryTarget[R3FactoryTarget["Directive"] = 0] = "Directive";
    R3FactoryTarget[R3FactoryTarget["Component"] = 1] = "Component";
    R3FactoryTarget[R3FactoryTarget["Injectable"] = 2] = "Injectable";
    R3FactoryTarget[R3FactoryTarget["Pipe"] = 3] = "Pipe";
    R3FactoryTarget[R3FactoryTarget["NgModule"] = 4] = "NgModule";
})(R3FactoryTarget || (R3FactoryTarget = {}));
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQStESCxNQUFNLENBQU4sSUFBWSx3QkFLWDtBQUxELFdBQVksd0JBQXdCO0lBQ2xDLHlFQUFTLENBQUE7SUFDVCxpRkFBYSxDQUFBO0lBQ2IsaUdBQXFCLENBQUE7SUFDckIsNkVBQVcsQ0FBQTtBQUNiLENBQUMsRUFMVyx3QkFBd0IsS0FBeEIsd0JBQXdCLFFBS25DO0FBRUQsTUFBTSxDQUFOLElBQVksZUFNWDtBQU5ELFdBQVksZUFBZTtJQUN6QiwrREFBYSxDQUFBO0lBQ2IsK0RBQWEsQ0FBQTtJQUNiLGlFQUFjLENBQUE7SUFDZCxxREFBUSxDQUFBO0lBQ1IsNkRBQVksQ0FBQTtBQUNkLENBQUMsRUFOVyxlQUFlLEtBQWYsZUFBZSxRQU0xQjtBQW1HRCxNQUFNLENBQU4sSUFBWSxpQkFLWDtBQUxELFdBQVksaUJBQWlCO0lBQzNCLGlFQUFZLENBQUE7SUFDWiw0RkFBNEY7SUFDNUYseURBQVEsQ0FBQTtJQUNSLG1FQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQUs1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbi8qKlxuICogQSBzZXQgb2YgaW50ZXJmYWNlcyB3aGljaCBhcmUgc2hhcmVkIGJldHdlZW4gYEBhbmd1bGFyL2NvcmVgIGFuZCBgQGFuZ3VsYXIvY29tcGlsZXJgIHRvIGFsbG93XG4gKiBmb3IgbGF0ZSBiaW5kaW5nIG9mIGBAYW5ndWxhci9jb21waWxlcmAgZm9yIEpJVCBwdXJwb3Nlcy5cbiAqXG4gKiBUaGlzIGZpbGUgaGFzIHR3byBjb3BpZXMuIFBsZWFzZSBlbnN1cmUgdGhhdCB0aGV5IGFyZSBpbiBzeW5jOlxuICogIC0gcGFja2FnZXMvY29tcGlsZXIvc3JjL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMgICAgICAgICAgKG1haW4pXG4gKiAgLSBwYWNrYWdlcy9jb3JlL3NyYy9jb21waWxlci9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzICAgICAocmVwbGljYSlcbiAqXG4gKiBQbGVhc2UgZW5zdXJlIHRoYXQgdGhlIHR3byBmaWxlcyBhcmUgaW4gc3luYyB1c2luZyB0aGlzIGNvbW1hbmQ6XG4gKiBgYGBcbiAqIGNwIHBhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzIFxcXG4gKiAgICBwYWNrYWdlcy9jb3JlL3NyYy9jb21waWxlci9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzXG4gKiBgYGBcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4cG9ydGVkQ29tcGlsZXJGYWNhZGUge1xuICDJtWNvbXBpbGVyRmFjYWRlOiBDb21waWxlckZhY2FkZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlckZhY2FkZSB7XG4gIGNvbXBpbGVQaXBlKGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM1BpcGVNZXRhZGF0YUZhY2FkZSk6XG4gICAgICBhbnk7XG4gIGNvbXBpbGVJbmplY3RhYmxlKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlSW5qZWN0b3IoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNJbmplY3Rvck1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlTmdNb2R1bGUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNOZ01vZHVsZU1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlRGlyZWN0aXZlKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVDb21wb25lbnQoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNDb21wb25lbnRNZXRhZGF0YUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUZhY3RvcnkoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNGYWN0b3J5RGVmTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG5cbiAgY3JlYXRlUGFyc2VTb3VyY2VTcGFuKGtpbmQ6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcpOiBQYXJzZVNvdXJjZVNwYW47XG5cbiAgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlOiB0eXBlb2YgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlO1xuICBSM0ZhY3RvcnlUYXJnZXQ6IHR5cGVvZiBSM0ZhY3RvcnlUYXJnZXQ7XG4gIFJlc291cmNlTG9hZGVyOiB7bmV3KCk6IFJlc291cmNlTG9hZGVyfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb3JlRW52aXJvbm1lbnQge1xuICBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb247XG59XG5cbmV4cG9ydCB0eXBlIFJlc291cmNlTG9hZGVyID0ge1xuICBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz58c3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgU3RyaW5nTWFwID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTdHJpbmdNYXBXaXRoUmVuYW1lID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmd8W3N0cmluZywgc3RyaW5nXTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3ZpZGVyID0gYW55O1xuXG5leHBvcnQgZW51bSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUge1xuICBUb2tlbiA9IDAsXG4gIEF0dHJpYnV0ZSA9IDEsXG4gIENoYW5nZURldGVjdG9yUmVmID0gMixcbiAgSW52YWxpZCA9IDMsXG59XG5cbmV4cG9ydCBlbnVtIFIzRmFjdG9yeVRhcmdldCB7XG4gIERpcmVjdGl2ZSA9IDAsXG4gIENvbXBvbmVudCA9IDEsXG4gIEluamVjdGFibGUgPSAyLFxuICBQaXBlID0gMyxcbiAgTmdNb2R1bGUgPSA0LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlIHtcbiAgdG9rZW46IGFueTtcbiAgcmVzb2x2ZWQ6IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZTtcbiAgaG9zdDogYm9vbGVhbjtcbiAgb3B0aW9uYWw6IGJvb2xlYW47XG4gIHNlbGY6IGJvb2xlYW47XG4gIHNraXBTZWxmOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzUGlwZU1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHBpcGVOYW1lOiBzdHJpbmc7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgcHVyZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0luamVjdGFibGVNZXRhZGF0YUZhY2FkZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogYW55O1xuICB0eXBlQXJndW1lbnRDb3VudDogbnVtYmVyO1xuICBwcm92aWRlZEluOiBhbnk7XG4gIHVzZUNsYXNzPzogYW55O1xuICB1c2VGYWN0b3J5PzogYW55O1xuICB1c2VFeGlzdGluZz86IGFueTtcbiAgdXNlVmFsdWU/OiBhbnk7XG4gIHVzZXJEZXBzPzogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM05nTW9kdWxlTWV0YWRhdGFGYWNhZGUge1xuICB0eXBlOiBhbnk7XG4gIGJvb3RzdHJhcDogRnVuY3Rpb25bXTtcbiAgZGVjbGFyYXRpb25zOiBGdW5jdGlvbltdO1xuICBpbXBvcnRzOiBGdW5jdGlvbltdO1xuICBleHBvcnRzOiBGdW5jdGlvbltdO1xuICBzY2hlbWFzOiB7bmFtZTogc3RyaW5nfVtdfG51bGw7XG4gIGlkOiBzdHJpbmd8bnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0luamVjdG9yTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBwcm92aWRlcnM6IGFueVtdO1xuICBpbXBvcnRzOiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RpcmVjdGl2ZU1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHR5cGVTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW47XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgc2VsZWN0b3I6IHN0cmluZ3xudWxsO1xuICBxdWVyaWVzOiBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGVbXTtcbiAgaG9zdDoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByb3BNZXRhZGF0YToge1trZXk6IHN0cmluZ106IGFueVtdfTtcbiAgbGlmZWN5Y2xlOiB7dXNlc09uQ2hhbmdlczogYm9vbGVhbjt9O1xuICBpbnB1dHM6IHN0cmluZ1tdO1xuICBvdXRwdXRzOiBzdHJpbmdbXTtcbiAgdXNlc0luaGVyaXRhbmNlOiBib29sZWFuO1xuICBleHBvcnRBczogc3RyaW5nW118bnVsbDtcbiAgcHJvdmlkZXJzOiBQcm92aWRlcltdfG51bGw7XG4gIHZpZXdRdWVyaWVzOiBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlIGV4dGVuZHMgUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSB7XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGJvb2xlYW47XG4gIGFuaW1hdGlvbnM6IGFueVtdfHVuZGVmaW5lZDtcbiAgcGlwZXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIGRpcmVjdGl2ZXM6IFIzVXNlZERpcmVjdGl2ZU1ldGFkYXRhW107XG4gIHN0eWxlczogc3RyaW5nW107XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuICB2aWV3UHJvdmlkZXJzOiBQcm92aWRlcltdfG51bGw7XG4gIGludGVycG9sYXRpb24/OiBbc3RyaW5nLCBzdHJpbmddO1xuICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM1VzZWREaXJlY3RpdmVNZXRhZGF0YSB7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGlucHV0czogc3RyaW5nW107XG4gIG91dHB1dHM6IHN0cmluZ1tdO1xuICBleHBvcnRBczogc3RyaW5nW118bnVsbDtcbiAgdHlwZTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRmFjdG9yeURlZk1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgaW5qZWN0Rm46ICdkaXJlY3RpdmVJbmplY3QnfCdpbmplY3QnO1xuICB0YXJnZXQ6IFIzRmFjdG9yeVRhcmdldDtcbn1cblxuZXhwb3J0IGVudW0gVmlld0VuY2Fwc3VsYXRpb24ge1xuICBFbXVsYXRlZCA9IDAsXG4gIC8vIEhpc3RvcmljYWxseSB0aGUgMSB2YWx1ZSB3YXMgZm9yIGBOYXRpdmVgIGVuY2Fwc3VsYXRpb24gd2hpY2ggaGFzIGJlZW4gcmVtb3ZlZCBhcyBvZiB2MTEuXG4gIE5vbmUgPSAyLFxuICBTaGFkb3dEb20gPSAzXG59XG5cbmV4cG9ydCB0eXBlIENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzUXVlcnlNZXRhZGF0YUZhY2FkZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcHJlZGljYXRlOiBhbnl8c3RyaW5nW107XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICByZWFkOiBhbnl8bnVsbDtcbiAgc3RhdGljOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlU291cmNlU3BhbiB7XG4gIHN0YXJ0OiBhbnk7XG4gIGVuZDogYW55O1xuICBkZXRhaWxzOiBhbnk7XG4gIGZ1bGxTdGFydDogYW55O1xufVxuIl19