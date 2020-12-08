(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/render3/partial/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcGFydGlhbC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uLy4uL2NvcmUnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi8uLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQYXJ0aWFsRGVjbGFyYXRpb24ge1xuICAvKipcbiAgICogVmVyc2lvbiBudW1iZXIgb2YgdGhlIEFuZ3VsYXIgY29tcGlsZXIgdGhhdCB3YXMgdXNlZCB0byBjb21waWxlIHRoaXMgZGVjbGFyYXRpb24uIFRoZSBsaW5rZXJcbiAgICogd2lsbCBiZSBhYmxlIHRvIGRldGVjdCB3aGljaCB2ZXJzaW9uIGEgbGlicmFyeSBpcyB1c2luZyBhbmQgaW50ZXJwcmV0IGl0cyBtZXRhZGF0YSBhY2NvcmRpbmdseS5cbiAgICovXG4gIHZlcnNpb246IHN0cmluZztcblxuICAvKipcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGBAYW5ndWxhci9jb3JlYCBFUyBtb2R1bGUsIHdoaWNoIGFsbG93cyBhY2Nlc3NcbiAgICogdG8gYWxsIEFuZ3VsYXIgZXhwb3J0cywgaW5jbHVkaW5nIEl2eSBpbnN0cnVjdGlvbnMuXG4gICAqL1xuICBuZ0ltcG9ydDogby5FeHByZXNzaW9uO1xufVxuXG4vKipcbiAqIFRoaXMgaW50ZXJmYWNlIGRlc2NyaWJlcyB0aGUgc2hhcGUgb2YgdGhlIG9iamVjdCB0aGF0IHBhcnRpYWwgZGlyZWN0aXZlIGRlY2xhcmF0aW9ucyBhcmUgY29tcGlsZWRcbiAqIGludG8uIFRoaXMgc2VydmVzIG9ubHkgYXMgZG9jdW1lbnRhdGlvbiwgYXMgY29uZm9ybWFuY2Ugb2YgdGhpcyBpbnRlcmZhY2UgaXMgbm90IGVuZm9yY2VkIGR1cmluZ1xuICogdGhlIGdlbmVyYXRpb24gb2YgdGhlIHBhcnRpYWwgZGVjbGFyYXRpb24sIG5vciB3aGVuIHRoZSBsaW5rZXIgYXBwbGllcyBmdWxsIGNvbXBpbGF0aW9uIGZyb20gdGhlXG4gKiBwYXJ0aWFsIGRlY2xhcmF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZURpcmVjdGl2ZU1ldGFkYXRhIGV4dGVuZHMgUjNQYXJ0aWFsRGVjbGFyYXRpb24ge1xuICAvKipcbiAgICogVW5wYXJzZWQgc2VsZWN0b3Igb2YgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGRpcmVjdGl2ZSBjbGFzcyBpdHNlbGYuXG4gICAqL1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIEEgbWFwcGluZyBvZiBpbnB1dHMgZnJvbSBjbGFzcyBwcm9wZXJ0eSBuYW1lcyB0byBiaW5kaW5nIHByb3BlcnR5IG5hbWVzLCBvciB0byBhIHR1cGxlIG9mXG4gICAqIGJpbmRpbmcgcHJvcGVydHkgbmFtZSBhbmQgY2xhc3MgcHJvcGVydHkgbmFtZSBpZiB0aGUgbmFtZXMgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIGlucHV0cz86IHtbY2xhc3NQcm9wZXJ0eU5hbWU6IHN0cmluZ106IHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddfTtcblxuICAvKipcbiAgICogQSBtYXBwaW5nIG9mIG91dHB1dHMgZnJvbSBjbGFzcyBwcm9wZXJ0eSBuYW1lcyB0byBiaW5kaW5nIHByb3BlcnR5IG5hbWVzLCBvciB0byBhIHR1cGxlIG9mXG4gICAqIGJpbmRpbmcgcHJvcGVydHkgbmFtZSBhbmQgY2xhc3MgcHJvcGVydHkgbmFtZSBpZiB0aGUgbmFtZXMgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIG91dHB1dHM/OiB7W2NsYXNzUHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBhYm91dCBob3N0IGJpbmRpbmdzIHByZXNlbnQgb24gdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGhvc3Q/OiB7XG4gICAgLyoqXG4gICAgICogQSBtYXBwaW5nIG9mIGF0dHJpYnV0ZSBuYW1lcyB0byB0aGVpciB2YWx1ZSBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIGF0dHJpYnV0ZXM/OiB7W2tleTogc3RyaW5nXTogby5FeHByZXNzaW9ufTtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwcGluZyBvZiBldmVudCBuYW1lcyB0byB0aGVpciB1bnBhcnNlZCBldmVudCBoYW5kbGVyIGV4cHJlc3Npb24uXG4gICAgICovXG4gICAgbGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwcGluZyBvZiBib3VuZCBwcm9wZXJ0aWVzIHRvIHRoZWlyIHVucGFyc2VkIGJpbmRpbmcgZXhwcmVzc2lvbi5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNsYXNzIGF0dHJpYnV0ZSwgaWYgcHJlc2VudC4gVGhpcyBpcyBzdG9yZWQgb3V0c2lkZSBvZiBgYXR0cmlidXRlc2AgYXMgaXRzXG4gICAgICogc3RyaW5nIHZhbHVlIG11c3QgYmUga25vd24gc3RhdGljYWxseS5cbiAgICAgKi9cbiAgICBjbGFzc0F0dHJpYnV0ZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgc3R5bGUgYXR0cmlidXRlLCBpZiBwcmVzZW50LiBUaGlzIGlzIHN0b3JlZCBvdXRzaWRlIG9mIGBhdHRyaWJ1dGVzYCBhcyBpdHNcbiAgICAgKiBzdHJpbmcgdmFsdWUgbXVzdCBiZSBrbm93biBzdGF0aWNhbGx5LlxuICAgICAqL1xuICAgIHN0eWxlQXR0cmlidXRlPzogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgY29udGVudCBxdWVyaWVzIG1hZGUgYnkgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHF1ZXJpZXM/OiBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSB2aWV3IHF1ZXJpZXMgbWFkZSBieSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgdmlld1F1ZXJpZXM/OiBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHByb3ZpZGVycyBwcm92aWRlZCBieSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgcHJvdmlkZXJzPzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZXMgYnkgd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBleHBvcnRlZC5cbiAgICovXG4gIGV4cG9ydEFzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRpcmVjdGl2ZSBoYXMgYW4gaW5oZXJpdGFuY2UgY2xhdXNlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHVzZXNJbmhlcml0YW5jZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRpcmVjdGl2ZSBpbXBsZW1lbnRzIHRoZSBgbmdPbkNoYW5nZXNgIGhvb2suIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgdXNlc09uQ2hhbmdlcz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQW4gZXh0ZW5zaW9uIG9mIGBSM0RlY2xhcmVEaXJlY3RpdmVNZXRhZGF0YWAgdGhhdCBkZWNsYXJlcyB0aGUgc2hhcGUgb2YgYSBwYXJ0aWFsIGRlY2xhcmF0aW9uIG9mXG4gKiBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVDb21wb25lbnRNZXRhZGF0YSBleHRlbmRzIFIzRGVjbGFyZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZS5cbiAgICovXG4gIHRlbXBsYXRlOiB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbXBvbmVudCdzIHVucGFyc2VkIHRlbXBsYXRlIHN0cmluZyBhcyBvcGFxdWUgZXhwcmVzc2lvbi4gVGhlIHRlbXBsYXRlIGlzIHJlcHJlc2VudGVkXG4gICAgICogdXNpbmcgZWl0aGVyIGEgc3RyaW5nIGxpdGVyYWwgb3IgdGVtcGxhdGUgbGl0ZXJhbCB3aXRob3V0IHN1YnN0aXR1dGlvbnMsIGJ1dCBpdHMgdmFsdWUgaXNcbiAgICAgKiBub3QgcmVhZCBkaXJlY3RseS4gSW5zdGVhZCwgdGhlIHRlbXBsYXRlIHBhcnNlciBpcyBnaXZlbiB0aGUgZnVsbCBzb3VyY2UgZmlsZSdzIHRleHQgYW5kXG4gICAgICogdGhlIHJhbmdlIG9mIHRoaXMgZXhwcmVzc2lvbiB0byBwYXJzZSBkaXJlY3RseSBmcm9tIHNvdXJjZS5cbiAgICAgKi9cbiAgICBzb3VyY2U6IG8uRXhwcmVzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRlbXBsYXRlIHdhcyBpbmxpbmUgKHVzaW5nIGB0ZW1wbGF0ZWApIG9yIGV4dGVybmFsICh1c2luZyBgdGVtcGxhdGVVcmxgKS5cbiAgICAgKi9cbiAgICBpc0lubGluZTogYm9vbGVhbjtcbiAgfTtcblxuICAvKipcbiAgICogQ1NTIGZyb20gaW5saW5lIHN0eWxlcyBhbmQgaW5jbHVkZWQgc3R5bGVVcmxzLlxuICAgKi9cbiAgc3R5bGVzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgZGlyZWN0aXZlcyB3aGljaCBtYXRjaGVkIGluIHRoZSB0ZW1wbGF0ZSwgaW5jbHVkaW5nIHN1ZmZpY2llbnRcbiAgICogbWV0YWRhdGEgZm9yIGVhY2ggZGlyZWN0aXZlIHRvIGF0dHJpYnV0ZSBiaW5kaW5ncyBhbmQgcmVmZXJlbmNlcyB3aXRoaW5cbiAgICogdGhlIHRlbXBsYXRlIHRvIGVhY2ggZGlyZWN0aXZlIHNwZWNpZmljYWxseSwgaWYgdGhlIHJ1bnRpbWUgaW5zdHJ1Y3Rpb25zXG4gICAqIHN1cHBvcnQgdGhpcy5cbiAgICovXG4gIGRpcmVjdGl2ZXM/OiB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0b3Igb2YgdGhlIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICBzZWxlY3Rvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHRoZSBkaXJlY3RpdmUgY2xhc3MgKHBvc3NpYmx5IGEgZm9yd2FyZCByZWZlcmVuY2UpLlxuICAgICAqL1xuICAgIHR5cGU6IG8uRXhwcmVzc2lvbiB8ICgoKSA9PiBvLkV4cHJlc3Npb24pO1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHkgbmFtZXMgb2YgdGhlIGRpcmVjdGl2ZSdzIGlucHV0cy5cbiAgICAgKi9cbiAgICBpbnB1dHM/OiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IG5hbWVzIG9mIHRoZSBkaXJlY3RpdmUncyBvdXRwdXRzLlxuICAgICAqL1xuICAgIG91dHB1dHM/OiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIE5hbWVzIGJ5IHdoaWNoIHRoaXMgZGlyZWN0aXZlIGV4cG9ydHMgaXRzZWxmIGZvciByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIGV4cG9ydEFzPzogc3RyaW5nW107XG4gIH1bXTtcblxuICAvKipcbiAgICogQSBtYXAgb2YgcGlwZSBuYW1lcyB0byBhbiBleHByZXNzaW9uIHJlZmVyZW5jaW5nIHRoZSBwaXBlIHR5cGUgKHBvc3NpYmx5IGEgZm9yd2FyZCByZWZlcmVuY2UpXG4gICAqIHdoaWNoIGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIHBpcGVzPzoge1twaXBlTmFtZTogc3RyaW5nXTogby5FeHByZXNzaW9ufCgoKSA9PiBvLkV4cHJlc3Npb24pfTtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdmlldyBwcm92aWRlcnMgZGVmaW5lZCBpbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgdmlld1Byb3ZpZGVycz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIGFuaW1hdGlvbiB0cmlnZ2VycyB0aGF0IHdpbGwgYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50IHRlbXBsYXRlLlxuICAgKi9cbiAgYW5pbWF0aW9ucz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogU3RyYXRlZ3kgdXNlZCBmb3IgZGV0ZWN0aW5nIGNoYW5nZXMgaW4gdGhlIGNvbXBvbmVudC5cbiAgICogRGVmYXVsdHMgdG8gYENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRgLlxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG5cbiAgLyoqXG4gICAqIEFuIGVuY2Fwc3VsYXRpb24gcG9saWN5IGZvciB0aGUgdGVtcGxhdGUgYW5kIENTUyBzdHlsZXMuXG4gICAqIERlZmF1bHRzIHRvIGBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZGAuXG4gICAqL1xuICBlbmNhcHN1bGF0aW9uPzogVmlld0VuY2Fwc3VsYXRpb247XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgZGVmYXVsdCBpbnRlcnBvbGF0aW9uIHN0YXJ0IGFuZCBlbmQgZGVsaW1pdGVycy4gRGVmYXVsdHMgdG8ge3sgYW5kIH19LlxuICAgKi9cbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgd2hpdGVzcGFjZSBpbiB0aGUgdGVtcGxhdGUgc2hvdWxkIGJlIHByZXNlcnZlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIHByb3BlcnR5IG9uIHRoZSBjbGFzcyB0byB1cGRhdGUgd2l0aCBxdWVyeSByZXN1bHRzLlxuICAgKi9cbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVhZCBvbmx5IHRoZSBmaXJzdCBtYXRjaGluZyByZXN1bHQsIG9yIGFuIGFycmF5IG9mIHJlc3VsdHMuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgZmlyc3Q/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFaXRoZXIgYW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgYSB0eXBlIG9yIGBJbmplY3Rpb25Ub2tlbmAgZm9yIHRoZSBxdWVyeVxuICAgKiBwcmVkaWNhdGUsIG9yIGEgc2V0IG9mIHN0cmluZyBzZWxlY3RvcnMuXG4gICAqL1xuICBwcmVkaWNhdGU6IG8uRXhwcmVzc2lvbnxzdHJpbmdbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBpbmNsdWRlIG9ubHkgZGlyZWN0IGNoaWxkcmVuIG9yIGFsbCBkZXNjZW5kYW50cy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBkZXNjZW5kYW50cz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFuIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIGEgdHlwZSB0byByZWFkIGZyb20gZWFjaCBtYXRjaGVkIG5vZGUsIG9yIG51bGwgaWYgdGhlIGRlZmF1bHQgdmFsdWVcbiAgICogZm9yIGEgZ2l2ZW4gbm9kZSBpcyB0byBiZSByZXR1cm5lZC5cbiAgICovXG4gIHJlYWQ/OiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoaXMgcXVlcnkgc2hvdWxkIGNvbGxlY3Qgb25seSBzdGF0aWMgcmVzdWx0cy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqXG4gICAqIElmIHN0YXRpYyBpcyB0cnVlLCB0aGUgcXVlcnkncyByZXN1bHRzIHdpbGwgYmUgc2V0IG9uIHRoZSBjb21wb25lbnQgYWZ0ZXIgbm9kZXMgYXJlIGNyZWF0ZWQsXG4gICAqIGJ1dCBiZWZvcmUgY2hhbmdlIGRldGVjdGlvbiBydW5zLiBUaGlzIG1lYW5zIHRoYXQgYW55IHJlc3VsdHMgdGhhdCByZWxpZWQgdXBvbiBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIHRvIHJ1biAoZS5nLiByZXN1bHRzIGluc2lkZSAqbmdJZiBvciAqbmdGb3Igdmlld3MpIHdpbGwgbm90IGJlIGNvbGxlY3RlZC4gUXVlcnkgcmVzdWx0cyBhcmVcbiAgICogYXZhaWxhYmxlIGluIHRoZSBuZ09uSW5pdCBob29rLlxuICAgKlxuICAgKiBJZiBzdGF0aWMgaXMgZmFsc2UsIHRoZSBxdWVyeSdzIHJlc3VsdHMgd2lsbCBiZSBzZXQgb24gdGhlIGNvbXBvbmVudCBhZnRlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIHJ1bnMuIFRoaXMgbWVhbnMgdGhhdCB0aGUgcXVlcnkgcmVzdWx0cyBjYW4gY29udGFpbiBub2RlcyBpbnNpZGUgKm5nSWYgb3IgKm5nRm9yIHZpZXdzLCBidXRcbiAgICogdGhlIHJlc3VsdHMgd2lsbCBub3QgYmUgYXZhaWxhYmxlIGluIHRoZSBuZ09uSW5pdCBob29rIChvbmx5IGluIHRoZSBuZ0FmdGVyQ29udGVudEluaXQgZm9yXG4gICAqIGNvbnRlbnQgaG9va3MgYW5kIG5nQWZ0ZXJWaWV3SW5pdCBmb3IgdmlldyBob29rcykuXG4gICAqL1xuICBzdGF0aWM/OiBib29sZWFuO1xufVxuIl19