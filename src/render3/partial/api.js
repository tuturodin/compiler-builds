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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcGFydGlhbC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uLy4uL2NvcmUnO1xuaW1wb3J0IHtJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuLi8uLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi8uLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5cbi8qKlxuICogVGhpcyBpbnRlcmZhY2UgZGVzY3JpYmVzIHRoZSBzaGFwZSBvZiB0aGUgb2JqZWN0IHRoYXQgcGFydGlhbCBkaXJlY3RpdmUgZGVjbGFyYXRpb25zIGFyZSBjb21waWxlZFxuICogaW50by4gVGhpcyBzZXJ2ZXMgb25seSBhcyBkb2N1bWVudGF0aW9uLCBhcyBjb25mb3JtYW5jZSBvZiB0aGlzIGludGVyZmFjZSBpcyBub3QgZW5mb3JjZWQgZHVyaW5nXG4gKiB0aGUgZ2VuZXJhdGlvbiBvZiB0aGUgcGFydGlhbCBkZWNsYXJhdGlvbiwgbm9yIHdoZW4gdGhlIGxpbmtlciBhcHBsaWVzIGZ1bGwgY29tcGlsYXRpb24gZnJvbSB0aGVcbiAqIHBhcnRpYWwgZGVjbGFyYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWNsYXJlRGlyZWN0aXZlTWV0YWRhdGEge1xuICAvKipcbiAgICogVmVyc2lvbiBudW1iZXIgb2YgdGhlIG1ldGFkYXRhIGZvcm1hdC4gVGhpcyBpcyB1c2VkIHRvIGV2b2x2ZSB0aGUgbWV0YWRhdGFcbiAgICogaW50ZXJmYWNlIGxhdGVyIC0gdGhlIGxpbmtlciB3aWxsIGJlIGFibGUgdG8gZGV0ZWN0IHdoaWNoIHZlcnNpb24gYSBsaWJyYXJ5XG4gICAqIGlzIHVzaW5nIGFuZCBpbnRlcnByZXQgaXRzIG1ldGFkYXRhIGFjY29yZGluZ2x5LlxuICAgKi9cbiAgdmVyc2lvbjogMTtcblxuICAvKipcbiAgICogVW5wYXJzZWQgc2VsZWN0b3Igb2YgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGRpcmVjdGl2ZSBjbGFzcyBpdHNlbGYuXG4gICAqL1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIEEgbWFwcGluZyBvZiBpbnB1dHMgZnJvbSBjbGFzcyBwcm9wZXJ0eSBuYW1lcyB0byBiaW5kaW5nIHByb3BlcnR5IG5hbWVzLCBvciB0byBhIHR1cGxlIG9mXG4gICAqIGJpbmRpbmcgcHJvcGVydHkgbmFtZSBhbmQgY2xhc3MgcHJvcGVydHkgbmFtZSBpZiB0aGUgbmFtZXMgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIGlucHV0cz86IHtbY2xhc3NQcm9wZXJ0eU5hbWU6IHN0cmluZ106IHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddfTtcblxuICAvKipcbiAgICogQSBtYXBwaW5nIG9mIG91dHB1dHMgZnJvbSBjbGFzcyBwcm9wZXJ0eSBuYW1lcyB0byBiaW5kaW5nIHByb3BlcnR5IG5hbWVzLCBvciB0byBhIHR1cGxlIG9mXG4gICAqIGJpbmRpbmcgcHJvcGVydHkgbmFtZSBhbmQgY2xhc3MgcHJvcGVydHkgbmFtZSBpZiB0aGUgbmFtZXMgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIG91dHB1dHM/OiB7W2NsYXNzUHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBhYm91dCBob3N0IGJpbmRpbmdzIHByZXNlbnQgb24gdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGhvc3Q/OiB7XG4gICAgLyoqXG4gICAgICogQSBtYXBwaW5nIG9mIGF0dHJpYnV0ZSBuYW1lcyB0byB0aGVpciB2YWx1ZSBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIGF0dHJpYnV0ZXM/OiB7W2tleTogc3RyaW5nXTogby5FeHByZXNzaW9ufTtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwcGluZyBvZiBldmVudCBuYW1lcyB0byB0aGVpciB1bnBhcnNlZCBldmVudCBoYW5kbGVyIGV4cHJlc3Npb24uXG4gICAgICovXG4gICAgbGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwcGluZyBvZiBib3VuZCBwcm9wZXJ0aWVzIHRvIHRoZWlyIHVucGFyc2VkIGJpbmRpbmcgZXhwcmVzc2lvbi5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNsYXNzIGF0dHJpYnV0ZSwgaWYgcHJlc2VudC4gVGhpcyBpcyBzdG9yZWQgb3V0c2lkZSBvZiBgYXR0cmlidXRlc2AgYXMgaXRzXG4gICAgICogc3RyaW5nIHZhbHVlIG11c3QgYmUga25vd24gc3RhdGljYWxseS5cbiAgICAgKi9cbiAgICBjbGFzc0F0dHJpYnV0ZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgc3R5bGUgYXR0cmlidXRlLCBpZiBwcmVzZW50LiBUaGlzIGlzIHN0b3JlZCBvdXRzaWRlIG9mIGBhdHRyaWJ1dGVzYCBhcyBpdHNcbiAgICAgKiBzdHJpbmcgdmFsdWUgbXVzdCBiZSBrbm93biBzdGF0aWNhbGx5LlxuICAgICAqL1xuICAgIHN0eWxlQXR0cmlidXRlPzogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgY29udGVudCBxdWVyaWVzIG1hZGUgYnkgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHF1ZXJpZXM/OiBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSB2aWV3IHF1ZXJpZXMgbWFkZSBieSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgdmlld1F1ZXJpZXM/OiBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHByb3ZpZGVycyBwcm92aWRlZCBieSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgcHJvdmlkZXJzPzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZXMgYnkgd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBleHBvcnRlZC5cbiAgICovXG4gIGV4cG9ydEFzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRpcmVjdGl2ZSBoYXMgYW4gaW5oZXJpdGFuY2UgY2xhdXNlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHVzZXNJbmhlcml0YW5jZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRpcmVjdGl2ZSBpbXBsZW1lbnRzIHRoZSBgbmdPbkNoYW5nZXNgIGhvb2suIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgdXNlc09uQ2hhbmdlcz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBgQGFuZ3VsYXIvY29yZWAgRVMgbW9kdWxlLCB3aGljaCBhbGxvd3MgYWNjZXNzXG4gICAqIHRvIGFsbCBBbmd1bGFyIGV4cG9ydHMsIGluY2x1ZGluZyBJdnkgaW5zdHJ1Y3Rpb25zLlxuICAgKi9cbiAgbmdJbXBvcnQ6IG8uRXhwcmVzc2lvbjtcbn1cblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgYFIzRGVjbGFyZURpcmVjdGl2ZU1ldGFkYXRhYCB0aGF0IGRlY2xhcmVzIHRoZSBzaGFwZSBvZiBhIHBhcnRpYWwgZGVjbGFyYXRpb24gb2ZcbiAqIGEgY29tcG9uZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZUNvbXBvbmVudE1ldGFkYXRhIGV4dGVuZHMgUjNEZWNsYXJlRGlyZWN0aXZlTWV0YWRhdGEge1xuICAvKipcbiAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGNvbXBvbmVudCdzIHRlbXBsYXRlLlxuICAgKi9cbiAgdGVtcGxhdGU6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29tcG9uZW50J3MgdW5wYXJzZWQgdGVtcGxhdGUgc3RyaW5nIGFzIG9wYXF1ZSBleHByZXNzaW9uLiBUaGUgdGVtcGxhdGUgaXMgcmVwcmVzZW50ZWRcbiAgICAgKiB1c2luZyBlaXRoZXIgYSBzdHJpbmcgbGl0ZXJhbCBvciB0ZW1wbGF0ZSBsaXRlcmFsIHdpdGhvdXQgc3Vic3RpdHV0aW9ucywgYnV0IGl0cyB2YWx1ZSBpc1xuICAgICAqIG5vdCByZWFkIGRpcmVjdGx5LiBJbnN0ZWFkLCB0aGUgdGVtcGxhdGUgcGFyc2VyIGlzIGdpdmVuIHRoZSBmdWxsIHNvdXJjZSBmaWxlJ3MgdGV4dCBhbmRcbiAgICAgKiB0aGUgcmFuZ2Ugb2YgdGhpcyBleHByZXNzaW9uIHRvIHBhcnNlIGRpcmVjdGx5IGZyb20gc291cmNlLlxuICAgICAqL1xuICAgIHNvdXJjZTogby5FeHByZXNzaW9uO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGVtcGxhdGUgd2FzIGlubGluZSAodXNpbmcgYHRlbXBsYXRlYCkgb3IgZXh0ZXJuYWwgKHVzaW5nIGB0ZW1wbGF0ZVVybGApLlxuICAgICAqL1xuICAgIGlzSW5saW5lOiBib29sZWFuO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDU1MgZnJvbSBpbmxpbmUgc3R5bGVzIGFuZCBpbmNsdWRlZCBzdHlsZVVybHMuXG4gICAqL1xuICBzdHlsZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBkaXJlY3RpdmVzIHdoaWNoIG1hdGNoZWQgaW4gdGhlIHRlbXBsYXRlLCBpbmNsdWRpbmcgc3VmZmljaWVudFxuICAgKiBtZXRhZGF0YSBmb3IgZWFjaCBkaXJlY3RpdmUgdG8gYXR0cmlidXRlIGJpbmRpbmdzIGFuZCByZWZlcmVuY2VzIHdpdGhpblxuICAgKiB0aGUgdGVtcGxhdGUgdG8gZWFjaCBkaXJlY3RpdmUgc3BlY2lmaWNhbGx5LCBpZiB0aGUgcnVudGltZSBpbnN0cnVjdGlvbnNcbiAgICogc3VwcG9ydCB0aGlzLlxuICAgKi9cbiAgZGlyZWN0aXZlcz86IHtcbiAgICAvKipcbiAgICAgKiBTZWxlY3RvciBvZiB0aGUgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgIHNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGRpcmVjdGl2ZSBjbGFzcyAocG9zc2libHkgYSBmb3J3YXJkIHJlZmVyZW5jZSkuXG4gICAgICovXG4gICAgdHlwZTogby5FeHByZXNzaW9uIHwgKCgpID0+IG8uRXhwcmVzc2lvbik7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eSBuYW1lcyBvZiB0aGUgZGlyZWN0aXZlJ3MgaW5wdXRzLlxuICAgICAqL1xuICAgIGlucHV0cz86IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbmFtZXMgb2YgdGhlIGRpcmVjdGl2ZSdzIG91dHB1dHMuXG4gICAgICovXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogTmFtZXMgYnkgd2hpY2ggdGhpcyBkaXJlY3RpdmUgZXhwb3J0cyBpdHNlbGYgZm9yIHJlZmVyZW5jZXMuXG4gICAgICovXG4gICAgZXhwb3J0QXM/OiBzdHJpbmdbXTtcbiAgfVtdO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBwaXBlIG5hbWVzIHRvIGFuIGV4cHJlc3Npb24gcmVmZXJlbmNpbmcgdGhlIHBpcGUgdHlwZSAocG9zc2libHkgYSBmb3J3YXJkIHJlZmVyZW5jZSlcbiAgICogd2hpY2ggYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgcGlwZXM/OiB7W3BpcGVOYW1lOiBzdHJpbmddOiBvLkV4cHJlc3Npb258KCgpID0+IG8uRXhwcmVzc2lvbil9O1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiB2aWV3IHByb3ZpZGVycyBkZWZpbmVkIGluIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICB2aWV3UHJvdmlkZXJzPzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBBIGNvbGxlY3Rpb24gb2YgYW5pbWF0aW9uIHRyaWdnZXJzIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQgdGVtcGxhdGUuXG4gICAqL1xuICBhbmltYXRpb25zPzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBTdHJhdGVneSB1c2VkIGZvciBkZXRlY3RpbmcgY2hhbmdlcyBpbiB0aGUgY29tcG9uZW50LlxuICAgKiBEZWZhdWx0cyB0byBgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdGAuXG4gICAqL1xuICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcblxuICAvKipcbiAgICogQW4gZW5jYXBzdWxhdGlvbiBwb2xpY3kgZm9yIHRoZSB0ZW1wbGF0ZSBhbmQgQ1NTIHN0eWxlcy5cbiAgICogRGVmYXVsdHMgdG8gYFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkYC5cbiAgICovXG4gIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbjtcblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IGludGVycG9sYXRpb24gc3RhcnQgYW5kIGVuZCBkZWxpbWl0ZXJzLiBEZWZhdWx0cyB0byB7eyBhbmQgfX0uXG4gICAqL1xuICBpbnRlcnBvbGF0aW9uPzogSW50ZXJwb2xhdGlvbkNvbmZpZztcblxuICAvKipcbiAgICogV2hldGhlciB3aGl0ZXNwYWNlIGluIHRoZSB0ZW1wbGF0ZSBzaG91bGQgYmUgcHJlc2VydmVkLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVF1ZXJ5TWV0YWRhdGEge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgcHJvcGVydHkgb24gdGhlIGNsYXNzIHRvIHVwZGF0ZSB3aXRoIHF1ZXJ5IHJlc3VsdHMuXG4gICAqL1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWFkIG9ubHkgdGhlIGZpcnN0IG1hdGNoaW5nIHJlc3VsdCwgb3IgYW4gYXJyYXkgb2YgcmVzdWx0cy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBmaXJzdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVpdGhlciBhbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyBhIHR5cGUgb3IgYEluamVjdGlvblRva2VuYCBmb3IgdGhlIHF1ZXJ5XG4gICAqIHByZWRpY2F0ZSwgb3IgYSBzZXQgb2Ygc3RyaW5nIHNlbGVjdG9ycy5cbiAgICovXG4gIHByZWRpY2F0ZTogby5FeHByZXNzaW9ufHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGluY2x1ZGUgb25seSBkaXJlY3QgY2hpbGRyZW4gb3IgYWxsIGRlc2NlbmRhbnRzLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGRlc2NlbmRhbnRzPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgYSB0eXBlIHRvIHJlYWQgZnJvbSBlYWNoIG1hdGNoZWQgbm9kZSwgb3IgbnVsbCBpZiB0aGUgZGVmYXVsdCB2YWx1ZVxuICAgKiBmb3IgYSBnaXZlbiBub2RlIGlzIHRvIGJlIHJldHVybmVkLlxuICAgKi9cbiAgcmVhZD86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhpcyBxdWVyeSBzaG91bGQgY29sbGVjdCBvbmx5IHN0YXRpYyByZXN1bHRzLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICpcbiAgICogSWYgc3RhdGljIGlzIHRydWUsIHRoZSBxdWVyeSdzIHJlc3VsdHMgd2lsbCBiZSBzZXQgb24gdGhlIGNvbXBvbmVudCBhZnRlciBub2RlcyBhcmUgY3JlYXRlZCxcbiAgICogYnV0IGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuIFRoaXMgbWVhbnMgdGhhdCBhbnkgcmVzdWx0cyB0aGF0IHJlbGllZCB1cG9uIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogdG8gcnVuIChlLmcuIHJlc3VsdHMgaW5zaWRlICpuZ0lmIG9yICpuZ0ZvciB2aWV3cykgd2lsbCBub3QgYmUgY29sbGVjdGVkLiBRdWVyeSByZXN1bHRzIGFyZVxuICAgKiBhdmFpbGFibGUgaW4gdGhlIG5nT25Jbml0IGhvb2suXG4gICAqXG4gICAqIElmIHN0YXRpYyBpcyBmYWxzZSwgdGhlIHF1ZXJ5J3MgcmVzdWx0cyB3aWxsIGJlIHNldCBvbiB0aGUgY29tcG9uZW50IGFmdGVyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcnVucy4gVGhpcyBtZWFucyB0aGF0IHRoZSBxdWVyeSByZXN1bHRzIGNhbiBjb250YWluIG5vZGVzIGluc2lkZSAqbmdJZiBvciAqbmdGb3Igdmlld3MsIGJ1dFxuICAgKiB0aGUgcmVzdWx0cyB3aWxsIG5vdCBiZSBhdmFpbGFibGUgaW4gdGhlIG5nT25Jbml0IGhvb2sgKG9ubHkgaW4gdGhlIG5nQWZ0ZXJDb250ZW50SW5pdCBmb3JcbiAgICogY29udGVudCBob29rcyBhbmQgbmdBZnRlclZpZXdJbml0IGZvciB2aWV3IGhvb2tzKS5cbiAgICovXG4gIHN0YXRpYz86IGJvb2xlYW47XG59XG4iXX0=