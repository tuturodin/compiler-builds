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
        define("@angular/compiler/src/core", ["require", "exports", "tslib", "@angular/compiler/src/selector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSelectorToR3Selector = exports.MissingTranslationStrategy = exports.SecurityContext = exports.Type = exports.createHost = exports.createSkipSelf = exports.createSelf = exports.createOptional = exports.NO_ERRORS_SCHEMA = exports.CUSTOM_ELEMENTS_SCHEMA = exports.createInjectable = exports.createNgModule = exports.createHostListener = exports.createHostBinding = exports.createOutput = exports.createInput = exports.createPipe = exports.createComponent = exports.ChangeDetectionStrategy = exports.ViewEncapsulation = exports.createDirective = exports.createViewChild = exports.createViewChildren = exports.createContentChild = exports.createContentChildren = exports.emitDistinctChangesOnlyDefaultValue = exports.createAttribute = exports.createInjectionToken = exports.createInject = void 0;
    var tslib_1 = require("tslib");
    // Attention:
    // This file duplicates types and values from @angular/core
    // so that we are able to make @angular/compiler independent of @angular/core.
    // This is important to prevent a build cycle, as @angular/core needs to
    // be compiled with the compiler.
    var selector_1 = require("@angular/compiler/src/selector");
    exports.createInject = makeMetadataFactory('Inject', function (token) { return ({ token: token }); });
    exports.createInjectionToken = makeMetadataFactory('InjectionToken', function (desc) { return ({ _desc: desc, ɵprov: undefined }); });
    exports.createAttribute = makeMetadataFactory('Attribute', function (attributeName) { return ({ attributeName: attributeName }); });
    // Stores the default value of `emitDistinctChangesOnly` when the `emitDistinctChangesOnly` is not
    // explicitly set.
    exports.emitDistinctChangesOnlyDefaultValue = true;
    exports.createContentChildren = makeMetadataFactory('ContentChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: false, descendants: false, emitDistinctChangesOnly: exports.emitDistinctChangesOnlyDefaultValue }, data));
    });
    exports.createContentChild = makeMetadataFactory('ContentChild', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: false, descendants: true }, data));
    });
    exports.createViewChildren = makeMetadataFactory('ViewChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: true, descendants: true, emitDistinctChangesOnly: exports.emitDistinctChangesOnlyDefaultValue }, data));
    });
    exports.createViewChild = makeMetadataFactory('ViewChild', function (selector, data) {
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: true, descendants: true }, data));
    });
    exports.createDirective = makeMetadataFactory('Directive', function (dir) {
        if (dir === void 0) { dir = {}; }
        return dir;
    });
    var ViewEncapsulation;
    (function (ViewEncapsulation) {
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
        ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    })(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
    var ChangeDetectionStrategy;
    (function (ChangeDetectionStrategy) {
        ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
        ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    })(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
    exports.createComponent = makeMetadataFactory('Component', function (c) {
        if (c === void 0) { c = {}; }
        return (tslib_1.__assign({ changeDetection: ChangeDetectionStrategy.Default }, c));
    });
    exports.createPipe = makeMetadataFactory('Pipe', function (p) { return (tslib_1.__assign({ pure: true }, p)); });
    exports.createInput = makeMetadataFactory('Input', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createOutput = makeMetadataFactory('Output', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createHostBinding = makeMetadataFactory('HostBinding', function (hostPropertyName) { return ({ hostPropertyName: hostPropertyName }); });
    exports.createHostListener = makeMetadataFactory('HostListener', function (eventName, args) { return ({ eventName: eventName, args: args }); });
    exports.createNgModule = makeMetadataFactory('NgModule', function (ngModule) { return ngModule; });
    exports.createInjectable = makeMetadataFactory('Injectable', function (injectable) {
        if (injectable === void 0) { injectable = {}; }
        return injectable;
    });
    exports.CUSTOM_ELEMENTS_SCHEMA = {
        name: 'custom-elements'
    };
    exports.NO_ERRORS_SCHEMA = {
        name: 'no-errors-schema'
    };
    exports.createOptional = makeMetadataFactory('Optional');
    exports.createSelf = makeMetadataFactory('Self');
    exports.createSkipSelf = makeMetadataFactory('SkipSelf');
    exports.createHost = makeMetadataFactory('Host');
    exports.Type = Function;
    var SecurityContext;
    (function (SecurityContext) {
        SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
        SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
        SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
        SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
        SecurityContext[SecurityContext["URL"] = 4] = "URL";
        SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    })(SecurityContext = exports.SecurityContext || (exports.SecurityContext = {}));
    var MissingTranslationStrategy;
    (function (MissingTranslationStrategy) {
        MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
        MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
        MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
    })(MissingTranslationStrategy = exports.MissingTranslationStrategy || (exports.MissingTranslationStrategy = {}));
    function makeMetadataFactory(name, props) {
        // This must be declared as a function, not a fat arrow, so that ES2015 devmode produces code
        // that works with the static_reflector.ts in the ViewEngine compiler.
        // In particular, `_registerDecoratorOrConstructor` assumes that the value returned here can be
        // new'ed.
        function factory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var values = props ? props.apply(void 0, tslib_1.__spread(args)) : {};
            return tslib_1.__assign({ ngMetadataName: name }, values);
        }
        factory.isTypeOf = function (obj) { return obj && obj.ngMetadataName === name; };
        factory.ngMetadataName = name;
        return factory;
    }
    function parserSelectorToSimpleSelector(selector) {
        var classes = selector.classNames && selector.classNames.length ? tslib_1.__spread([8 /* CLASS */], selector.classNames) :
            [];
        var elementName = selector.element && selector.element !== '*' ? selector.element : '';
        return tslib_1.__spread([elementName], selector.attrs, classes);
    }
    function parserSelectorToNegativeSelector(selector) {
        var classes = selector.classNames && selector.classNames.length ? tslib_1.__spread([8 /* CLASS */], selector.classNames) :
            [];
        if (selector.element) {
            return tslib_1.__spread([
                1 /* NOT */ | 4 /* ELEMENT */, selector.element
            ], selector.attrs, classes);
        }
        else if (selector.attrs.length) {
            return tslib_1.__spread([1 /* NOT */ | 2 /* ATTRIBUTE */], selector.attrs, classes);
        }
        else {
            return selector.classNames && selector.classNames.length ? tslib_1.__spread([1 /* NOT */ | 8 /* CLASS */], selector.classNames) :
                [];
        }
    }
    function parserSelectorToR3Selector(selector) {
        var positive = parserSelectorToSimpleSelector(selector);
        var negative = selector.notSelectors && selector.notSelectors.length ?
            selector.notSelectors.map(function (notSelector) { return parserSelectorToNegativeSelector(notSelector); }) :
            [];
        return positive.concat.apply(positive, tslib_1.__spread(negative));
    }
    function parseSelectorToR3Selector(selector) {
        return selector ? selector_1.CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
    }
    exports.parseSelectorToR3Selector = parseSelectorToR3Selector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7SUFFSCxhQUFhO0lBQ2IsMkRBQTJEO0lBQzNELDhFQUE4RTtJQUM5RSx3RUFBd0U7SUFDeEUsaUNBQWlDO0lBRWpDLDJEQUF1QztJQUsxQixRQUFBLFlBQVksR0FBRyxtQkFBbUIsQ0FBUyxRQUFRLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxDQUFDLEVBQUMsS0FBSyxPQUFBLEVBQUMsQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFDO0lBQ2hGLFFBQUEsb0JBQW9CLEdBQUcsbUJBQW1CLENBQ25ELGdCQUFnQixFQUFFLFVBQUMsSUFBWSxJQUFLLE9BQUEsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUs5RCxRQUFBLGVBQWUsR0FDeEIsbUJBQW1CLENBQVksV0FBVyxFQUFFLFVBQUMsYUFBcUIsSUFBSyxPQUFBLENBQUMsRUFBQyxhQUFhLGVBQUEsRUFBQyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUU5RixrR0FBa0c7SUFDbEcsa0JBQWtCO0lBQ0wsUUFBQSxtQ0FBbUMsR0FBRyxJQUFJLENBQUM7SUFhM0MsUUFBQSxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FDcEQsaUJBQWlCLEVBQUUsVUFBQyxRQUFjLEVBQUUsSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztRQUFLLE9BQUEsb0JBQ2xDLFFBQVEsVUFBQSxFQUNSLEtBQUssRUFBRSxLQUFLLEVBQ1osV0FBVyxFQUFFLEtBQUssRUFDbEIsV0FBVyxFQUFFLEtBQUssRUFDbEIsdUJBQXVCLEVBQUUsMkNBQW1DLElBQ3pELElBQUksRUFDUDtJQVBrQyxDQU9sQyxDQUFD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QGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBBdHRlbnRpb246XG4vLyBUaGlzIGZpbGUgZHVwbGljYXRlcyB0eXBlcyBhbmQgdmFsdWVzIGZyb20gQGFuZ3VsYXIvY29yZVxuLy8gc28gdGhhdCB3ZSBhcmUgYWJsZSB0byBtYWtlIEBhbmd1bGFyL2NvbXBpbGVyIGluZGVwZW5kZW50IG9mIEBhbmd1bGFyL2NvcmUuXG4vLyBUaGlzIGlzIGltcG9ydGFudCB0byBwcmV2ZW50IGEgYnVpbGQgY3ljbGUsIGFzIEBhbmd1bGFyL2NvcmUgbmVlZHMgdG9cbi8vIGJlIGNvbXBpbGVkIHdpdGggdGhlIGNvbXBpbGVyLlxuXG5pbXBvcnQge0Nzc1NlbGVjdG9yfSBmcm9tICcuL3NlbGVjdG9yJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3Qge1xuICB0b2tlbjogYW55O1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUluamVjdCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8SW5qZWN0PignSW5qZWN0JywgKHRva2VuOiBhbnkpID0+ICh7dG9rZW59KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0aW9uVG9rZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PG9iamVjdD4oXG4gICAgJ0luamVjdGlvblRva2VuJywgKGRlc2M6IHN0cmluZykgPT4gKHtfZGVzYzogZGVzYywgybVwcm92OiB1bmRlZmluZWR9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlIHtcbiAgYXR0cmlidXRlTmFtZTogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUF0dHJpYnV0ZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxBdHRyaWJ1dGU+KCdBdHRyaWJ1dGUnLCAoYXR0cmlidXRlTmFtZTogc3RyaW5nKSA9PiAoe2F0dHJpYnV0ZU5hbWV9KSk7XG5cbi8vIFN0b3JlcyB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlgIHdoZW4gdGhlIGBlbWl0RGlzdGluY3RDaGFuZ2VzT25seWAgaXMgbm90XG4vLyBleHBsaWNpdGx5IHNldC5cbmV4cG9ydCBjb25zdCBlbWl0RGlzdGluY3RDaGFuZ2VzT25seURlZmF1bHRWYWx1ZSA9IHRydWU7XG5cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcmVhZDogYW55O1xuICBpc1ZpZXdRdWVyeTogYm9vbGVhbjtcbiAgc2VsZWN0b3I6IGFueTtcbiAgc3RhdGljPzogYm9vbGVhbjtcbiAgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZW50Q2hpbGRyZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnQ29udGVudENoaWxkcmVuJywgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXNWaWV3UXVlcnk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGVudENoaWxkID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ0NvbnRlbnRDaGlsZCcsXG4gICAgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT5cbiAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlVmlld0NoaWxkcmVuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ1ZpZXdDaGlsZHJlbicsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIGlzVmlld1F1ZXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5OiBlbWl0RGlzdGluY3RDaGFuZ2VzT25seURlZmF1bHRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkJyxcbiAgICAoc2VsZWN0b3I6IGFueSwgZGF0YTogYW55KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGl2ZSB7XG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuICBpbnB1dHM/OiBzdHJpbmdbXTtcbiAgb3V0cHV0cz86IHN0cmluZ1tdO1xuICBob3N0Pzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG4gIGV4cG9ydEFzPzogc3RyaW5nO1xuICBxdWVyaWVzPzoge1trZXk6IHN0cmluZ106IGFueX07XG4gIGd1YXJkcz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpcmVjdGl2ZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxEaXJlY3RpdmU+KCdEaXJlY3RpdmUnLCAoZGlyOiBEaXJlY3RpdmUgPSB7fSkgPT4gZGlyKTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnQgZXh0ZW5kcyBEaXJlY3RpdmUge1xuICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbiAgdmlld1Byb3ZpZGVycz86IFByb3ZpZGVyW107XG4gIG1vZHVsZUlkPzogc3RyaW5nO1xuICB0ZW1wbGF0ZVVybD86IHN0cmluZztcbiAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gIHN0eWxlVXJscz86IHN0cmluZ1tdO1xuICBzdHlsZXM/OiBzdHJpbmdbXTtcbiAgYW5pbWF0aW9ucz86IGFueVtdO1xuICBlbmNhcHN1bGF0aW9uPzogVmlld0VuY2Fwc3VsYXRpb247XG4gIGludGVycG9sYXRpb24/OiBbc3RyaW5nLCBzdHJpbmddO1xuICBlbnRyeUNvbXBvbmVudHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgcHJlc2VydmVXaGl0ZXNwYWNlcz86IGJvb2xlYW47XG59XG5leHBvcnQgZW51bSBWaWV3RW5jYXBzdWxhdGlvbiB7XG4gIEVtdWxhdGVkID0gMCxcbiAgLy8gSGlzdG9yaWNhbGx5IHRoZSAxIHZhbHVlIHdhcyBmb3IgYE5hdGl2ZWAgZW5jYXBzdWxhdGlvbiB3aGljaCBoYXMgYmVlbiByZW1vdmVkIGFzIG9mIHYxMS5cbiAgTm9uZSA9IDIsXG4gIFNoYWRvd0RvbSA9IDNcbn1cblxuZXhwb3J0IGVudW0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kge1xuICBPblB1c2ggPSAwLFxuICBEZWZhdWx0ID0gMVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29tcG9uZW50ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxDb21wb25lbnQ+KFxuICAgICdDb21wb25lbnQnLCAoYzogQ29tcG9uZW50ID0ge30pID0+ICh7Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LCAuLi5jfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpcGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHB1cmU/OiBib29sZWFuO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBpcGUgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFBpcGU+KCdQaXBlJywgKHA6IFBpcGUpID0+ICh7cHVyZTogdHJ1ZSwgLi4ucH0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBJbnB1dCB7XG4gIGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5wdXQgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8SW5wdXQ+KCdJbnB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3V0cHV0IHtcbiAgYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVPdXRwdXQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PE91dHB1dD4oXG4gICAgJ091dHB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdEJpbmRpbmcge1xuICBob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhvc3RCaW5kaW5nID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxIb3N0QmluZGluZz4oXG4gICAgJ0hvc3RCaW5kaW5nJywgKGhvc3RQcm9wZXJ0eU5hbWU/OiBzdHJpbmcpID0+ICh7aG9zdFByb3BlcnR5TmFtZX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBIb3N0TGlzdGVuZXIge1xuICBldmVudE5hbWU/OiBzdHJpbmc7XG4gIGFyZ3M/OiBzdHJpbmdbXTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0TGlzdGVuZXIgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PEhvc3RMaXN0ZW5lcj4oXG4gICAgJ0hvc3RMaXN0ZW5lcicsIChldmVudE5hbWU/OiBzdHJpbmcsIGFyZ3M/OiBzdHJpbmdbXSkgPT4gKHtldmVudE5hbWUsIGFyZ3N9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGUge1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBkZWNsYXJhdGlvbnM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgaW1wb3J0cz86IEFycmF5PFR5cGV8TW9kdWxlV2l0aFByb3ZpZGVyc3xhbnlbXT47XG4gIGV4cG9ydHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgZW50cnlDb21wb25lbnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGJvb3RzdHJhcD86IEFycmF5PFR5cGV8YW55W10+O1xuICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGF8YW55W10+O1xuICBpZD86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVOZ01vZHVsZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxOZ01vZHVsZT4oJ05nTW9kdWxlJywgKG5nTW9kdWxlOiBOZ01vZHVsZSkgPT4gbmdNb2R1bGUpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICBuZ01vZHVsZTogVHlwZTtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZSB7XG4gIHByb3ZpZGVkSW4/OiBUeXBlfCdyb290J3xhbnk7XG4gIHVzZUNsYXNzPzogVHlwZXxhbnk7XG4gIHVzZUV4aXN0aW5nPzogVHlwZXxhbnk7XG4gIHVzZVZhbHVlPzogYW55O1xuICB1c2VGYWN0b3J5PzogVHlwZXxhbnk7XG4gIGRlcHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3RhYmxlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5KCdJbmplY3RhYmxlJywgKGluamVjdGFibGU6IEluamVjdGFibGUgPSB7fSkgPT4gaW5qZWN0YWJsZSk7XG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG5leHBvcnQgY29uc3QgTk9fRVJST1JTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICduby1lcnJvcnMtc2NoZW1hJ1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9wdGlvbmFsID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnT3B0aW9uYWwnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2VsZicpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNraXBTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2tpcFNlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnSG9zdCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBGdW5jdGlvbiB7XG4gIG5ldyguLi5hcmdzOiBhbnlbXSk6IGFueTtcbn1cbmV4cG9ydCBjb25zdCBUeXBlID0gRnVuY3Rpb247XG5cbmV4cG9ydCBlbnVtIFNlY3VyaXR5Q29udGV4dCB7XG4gIE5PTkUgPSAwLFxuICBIVE1MID0gMSxcbiAgU1RZTEUgPSAyLFxuICBTQ1JJUFQgPSAzLFxuICBVUkwgPSA0LFxuICBSRVNPVVJDRV9VUkwgPSA1LFxufVxuXG5leHBvcnQgdHlwZSBQcm92aWRlciA9IGFueTtcblxuZXhwb3J0IGNvbnN0IGVudW0gTm9kZUZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFR5cGVFbGVtZW50ID0gMSA8PCAwLFxuICBUeXBlVGV4dCA9IDEgPDwgMSxcbiAgUHJvamVjdGVkVGVtcGxhdGUgPSAxIDw8IDIsXG4gIENhdFJlbmRlck5vZGUgPSBUeXBlRWxlbWVudCB8IFR5cGVUZXh0LFxuICBUeXBlTmdDb250ZW50ID0gMSA8PCAzLFxuICBUeXBlUGlwZSA9IDEgPDwgNCxcbiAgVHlwZVB1cmVBcnJheSA9IDEgPDwgNSxcbiAgVHlwZVB1cmVPYmplY3QgPSAxIDw8IDYsXG4gIFR5cGVQdXJlUGlwZSA9IDEgPDwgNyxcbiAgQ2F0UHVyZUV4cHJlc3Npb24gPSBUeXBlUHVyZUFycmF5IHwgVHlwZVB1cmVPYmplY3QgfCBUeXBlUHVyZVBpcGUsXG4gIFR5cGVWYWx1ZVByb3ZpZGVyID0gMSA8PCA4LFxuICBUeXBlQ2xhc3NQcm92aWRlciA9IDEgPDwgOSxcbiAgVHlwZUZhY3RvcnlQcm92aWRlciA9IDEgPDwgMTAsXG4gIFR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyID0gMSA8PCAxMSxcbiAgTGF6eVByb3ZpZGVyID0gMSA8PCAxMixcbiAgUHJpdmF0ZVByb3ZpZGVyID0gMSA8PCAxMyxcbiAgVHlwZURpcmVjdGl2ZSA9IDEgPDwgMTQsXG4gIENvbXBvbmVudCA9IDEgPDwgMTUsXG4gIENhdFByb3ZpZGVyTm9EaXJlY3RpdmUgPVxuICAgICAgVHlwZVZhbHVlUHJvdmlkZXIgfCBUeXBlQ2xhc3NQcm92aWRlciB8IFR5cGVGYWN0b3J5UHJvdmlkZXIgfCBUeXBlVXNlRXhpc3RpbmdQcm92aWRlcixcbiAgQ2F0UHJvdmlkZXIgPSBDYXRQcm92aWRlck5vRGlyZWN0aXZlIHwgVHlwZURpcmVjdGl2ZSxcbiAgT25Jbml0ID0gMSA8PCAxNixcbiAgT25EZXN0cm95ID0gMSA8PCAxNyxcbiAgRG9DaGVjayA9IDEgPDwgMTgsXG4gIE9uQ2hhbmdlcyA9IDEgPDwgMTksXG4gIEFmdGVyQ29udGVudEluaXQgPSAxIDw8IDIwLFxuICBBZnRlckNvbnRlbnRDaGVja2VkID0gMSA8PCAyMSxcbiAgQWZ0ZXJWaWV3SW5pdCA9IDEgPDwgMjIsXG4gIEFmdGVyVmlld0NoZWNrZWQgPSAxIDw8IDIzLFxuICBFbWJlZGRlZFZpZXdzID0gMSA8PCAyNCxcbiAgQ29tcG9uZW50VmlldyA9IDEgPDwgMjUsXG4gIFR5cGVDb250ZW50UXVlcnkgPSAxIDw8IDI2LFxuICBUeXBlVmlld1F1ZXJ5ID0gMSA8PCAyNyxcbiAgU3RhdGljUXVlcnkgPSAxIDw8IDI4LFxuICBEeW5hbWljUXVlcnkgPSAxIDw8IDI5LFxuICBUeXBlTW9kdWxlUHJvdmlkZXIgPSAxIDw8IDMwLFxuICBFbWl0RGlzdGluY3RDaGFuZ2VzT25seSA9IDEgPDwgMzEsXG4gIENhdFF1ZXJ5ID0gVHlwZUNvbnRlbnRRdWVyeSB8IFR5cGVWaWV3UXVlcnksXG5cbiAgLy8gbXV0dWFsbHkgZXhjbHVzaXZlIHZhbHVlcy4uLlxuICBUeXBlcyA9IENhdFJlbmRlck5vZGUgfCBUeXBlTmdDb250ZW50IHwgVHlwZVBpcGUgfCBDYXRQdXJlRXhwcmVzc2lvbiB8IENhdFByb3ZpZGVyIHwgQ2F0UXVlcnlcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gRGVwRmxhZ3Mge1xuICBOb25lID0gMCxcbiAgU2tpcFNlbGYgPSAxIDw8IDAsXG4gIE9wdGlvbmFsID0gMSA8PCAxLFxuICBTZWxmID0gMSA8PCAyLFxuICBWYWx1ZSA9IDEgPDwgMyxcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gZmxhZ3MgZm9yIERJLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBJbmplY3RGbGFncyB7XG4gIERlZmF1bHQgPSAwLFxuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBpbmplY3RvciBzaG91bGQgcmV0cmlldmUgYSBkZXBlbmRlbmN5IGZyb20gYW55IGluamVjdG9yIHVudGlsIHJlYWNoaW5nIHRoZVxuICAgKiBob3N0IGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50LiAoT25seSB1c2VkIHdpdGggRWxlbWVudCBJbmplY3RvcilcbiAgICovXG4gIEhvc3QgPSAxIDw8IDAsXG4gIC8qKiBEb24ndCBkZXNjZW5kIGludG8gYW5jZXN0b3JzIG9mIHRoZSBub2RlIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTZWxmID0gMSA8PCAxLFxuICAvKiogU2tpcCB0aGUgbm9kZSB0aGF0IGlzIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTa2lwU2VsZiA9IDEgPDwgMixcbiAgLyoqIEluamVjdCBgZGVmYXVsdFZhbHVlYCBpbnN0ZWFkIGlmIHRva2VuIG5vdCBmb3VuZC4gKi9cbiAgT3B0aW9uYWwgPSAxIDw8IDMsXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFyZ3VtZW50VHlwZSB7XG4gIElubGluZSA9IDAsXG4gIER5bmFtaWMgPSAxXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEJpbmRpbmdGbGFncyB7XG4gIFR5cGVFbGVtZW50QXR0cmlidXRlID0gMSA8PCAwLFxuICBUeXBlRWxlbWVudENsYXNzID0gMSA8PCAxLFxuICBUeXBlRWxlbWVudFN0eWxlID0gMSA8PCAyLFxuICBUeXBlUHJvcGVydHkgPSAxIDw8IDMsXG4gIFN5bnRoZXRpY1Byb3BlcnR5ID0gMSA8PCA0LFxuICBTeW50aGV0aWNIb3N0UHJvcGVydHkgPSAxIDw8IDUsXG4gIENhdFN5bnRoZXRpY1Byb3BlcnR5ID0gU3ludGhldGljUHJvcGVydHkgfCBTeW50aGV0aWNIb3N0UHJvcGVydHksXG5cbiAgLy8gbXV0dWFsbHkgZXhjbHVzaXZlIHZhbHVlcy4uLlxuICBUeXBlcyA9IFR5cGVFbGVtZW50QXR0cmlidXRlIHwgVHlwZUVsZW1lbnRDbGFzcyB8IFR5cGVFbGVtZW50U3R5bGUgfCBUeXBlUHJvcGVydHlcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlCaW5kaW5nVHlwZSB7XG4gIEZpcnN0ID0gMCxcbiAgQWxsID0gMVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBRdWVyeVZhbHVlVHlwZSB7XG4gIEVsZW1lbnRSZWYgPSAwLFxuICBSZW5kZXJFbGVtZW50ID0gMSxcbiAgVGVtcGxhdGVSZWYgPSAyLFxuICBWaWV3Q29udGFpbmVyUmVmID0gMyxcbiAgUHJvdmlkZXIgPSA0XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFZpZXdGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBPblB1c2ggPSAxIDw8IDEsXG59XG5cbmV4cG9ydCBlbnVtIE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5IHtcbiAgRXJyb3IgPSAwLFxuICBXYXJuaW5nID0gMSxcbiAgSWdub3JlID0gMixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YUZhY3Rvcnk8VD4ge1xuICAoLi4uYXJnczogYW55W10pOiBUO1xuICBpc1R5cGVPZihvYmo6IGFueSk6IG9iaiBpcyBUO1xuICBuZ01ldGFkYXRhTmFtZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBtYWtlTWV0YWRhdGFGYWN0b3J5PFQ+KG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IFQpOiBNZXRhZGF0YUZhY3Rvcnk8VD4ge1xuICAvLyBUaGlzIG11c3QgYmUgZGVjbGFyZWQgYXMgYSBmdW5jdGlvbiwgbm90IGEgZmF0IGFycm93LCBzbyB0aGF0IEVTMjAxNSBkZXZtb2RlIHByb2R1Y2VzIGNvZGVcbiAgLy8gdGhhdCB3b3JrcyB3aXRoIHRoZSBzdGF0aWNfcmVmbGVjdG9yLnRzIGluIHRoZSBWaWV3RW5naW5lIGNvbXBpbGVyLlxuICAvLyBJbiBwYXJ0aWN1bGFyLCBgX3JlZ2lzdGVyRGVjb3JhdG9yT3JDb25zdHJ1Y3RvcmAgYXNzdW1lcyB0aGF0IHRoZSB2YWx1ZSByZXR1cm5lZCBoZXJlIGNhbiBiZVxuICAvLyBuZXcnZWQuXG4gIGZ1bmN0aW9uIGZhY3RvcnkoLi4uYXJnczogYW55W10pIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBwcm9wcyA/IHByb3BzKC4uLmFyZ3MpIDoge307XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTWV0YWRhdGFOYW1lOiBuYW1lLFxuICAgICAgLi4udmFsdWVzLFxuICAgIH07XG4gIH1cbiAgKGZhY3RvcnkgYXMgYW55KS5pc1R5cGVPZiA9IChvYmo6IGFueSkgPT4gb2JqICYmIG9iai5uZ01ldGFkYXRhTmFtZSA9PT0gbmFtZTtcbiAgKGZhY3RvcnkgYXMgYW55KS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gIHJldHVybiBmYWN0b3J5IGFzIGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZSB7XG4gIGNoaWxkcmVuPzogUm91dGVbXTtcbiAgbG9hZENoaWxkcmVuPzogc3RyaW5nfFR5cGV8YW55O1xufVxuXG4vKipcbiAqIEZsYWdzIHVzZWQgdG8gZ2VuZXJhdGUgUjMtc3R5bGUgQ1NTIFNlbGVjdG9ycy4gVGhleSBhcmUgcGFzdGVkIGZyb21cbiAqIGNvcmUvc3JjL3JlbmRlcjMvcHJvamVjdGlvbi50cyBiZWNhdXNlIHRoZXkgY2Fubm90IGJlIHJlZmVyZW5jZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlbGVjdG9yRmxhZ3Mge1xuICAvKiogSW5kaWNhdGVzIHRoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhIG5ldyBuZWdhdGl2ZSBzZWxlY3RvciAqL1xuICBOT1QgPSAwYjAwMDEsXG5cbiAgLyoqIE1vZGUgZm9yIG1hdGNoaW5nIGF0dHJpYnV0ZXMgKi9cbiAgQVRUUklCVVRFID0gMGIwMDEwLFxuXG4gIC8qKiBNb2RlIGZvciBtYXRjaGluZyB0YWcgbmFtZXMgKi9cbiAgRUxFTUVOVCA9IDBiMDEwMCxcblxuICAvKiogTW9kZSBmb3IgbWF0Y2hpbmcgY2xhc3MgbmFtZXMgKi9cbiAgQ0xBU1MgPSAwYjEwMDAsXG59XG5cbi8vIFRoZXNlIGFyZSBhIGNvcHkgdGhlIENTUyB0eXBlcyBmcm9tIGNvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9wcm9qZWN0aW9uLnRzXG4vLyBUaGV5IGFyZSBkdXBsaWNhdGVkIGhlcmUgYXMgdGhleSBjYW5ub3QgYmUgZGlyZWN0bHkgcmVmZXJlbmNlZCBmcm9tIGNvcmUuXG5leHBvcnQgdHlwZSBSM0Nzc1NlbGVjdG9yID0gKHN0cmluZ3xTZWxlY3RvckZsYWdzKVtdO1xuZXhwb3J0IHR5cGUgUjNDc3NTZWxlY3Rvckxpc3QgPSBSM0Nzc1NlbGVjdG9yW107XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBSM0Nzc1NlbGVjdG9yIHtcbiAgY29uc3QgY2xhc3NlcyA9IHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgW1NlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgIFtdO1xuICBjb25zdCBlbGVtZW50TmFtZSA9IHNlbGVjdG9yLmVsZW1lbnQgJiYgc2VsZWN0b3IuZWxlbWVudCAhPT0gJyonID8gc2VsZWN0b3IuZWxlbWVudCA6ICcnO1xuICByZXR1cm4gW2VsZW1lbnROYW1lLCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc107XG59XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9OZWdhdGl2ZVNlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzQ3NzU2VsZWN0b3Ige1xuICBjb25zdCBjbGFzc2VzID0gc2VsZWN0b3IuY2xhc3NOYW1lcyAmJiBzZWxlY3Rvci5jbGFzc05hbWVzLmxlbmd0aCA/XG4gICAgICBbU2VsZWN0b3JGbGFncy5DTEFTUywgLi4uc2VsZWN0b3IuY2xhc3NOYW1lc10gOlxuICAgICAgW107XG5cbiAgaWYgKHNlbGVjdG9yLmVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkVMRU1FTlQsIHNlbGVjdG9yLmVsZW1lbnQsIC4uLnNlbGVjdG9yLmF0dHJzLCAuLi5jbGFzc2VzXG4gICAgXTtcbiAgfSBlbHNlIGlmIChzZWxlY3Rvci5hdHRycy5sZW5ndGgpIHtcbiAgICByZXR1cm4gW1NlbGVjdG9yRmxhZ3MuTk9UIHwgU2VsZWN0b3JGbGFncy5BVFRSSUJVVEUsIC4uLnNlbGVjdG9yLmF0dHJzLCAuLi5jbGFzc2VzXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2VsZWN0b3IuY2xhc3NOYW1lcyAmJiBzZWxlY3Rvci5jbGFzc05hbWVzLmxlbmd0aCA/XG4gICAgICAgIFtTZWxlY3RvckZsYWdzLk5PVCB8IFNlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgICAgW107XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyU2VsZWN0b3JUb1IzU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNDc3NTZWxlY3RvciB7XG4gIGNvbnN0IHBvc2l0aXZlID0gcGFyc2VyU2VsZWN0b3JUb1NpbXBsZVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICBjb25zdCBuZWdhdGl2ZTogUjNDc3NTZWxlY3Rvckxpc3QgPSBzZWxlY3Rvci5ub3RTZWxlY3RvcnMgJiYgc2VsZWN0b3Iubm90U2VsZWN0b3JzLmxlbmd0aCA/XG4gICAgICBzZWxlY3Rvci5ub3RTZWxlY3RvcnMubWFwKG5vdFNlbGVjdG9yID0+IHBhcnNlclNlbGVjdG9yVG9OZWdhdGl2ZVNlbGVjdG9yKG5vdFNlbGVjdG9yKSkgOlxuICAgICAgW107XG5cbiAgcmV0dXJuIHBvc2l0aXZlLmNvbmNhdCguLi5uZWdhdGl2ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yVG9SM1NlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmd8bnVsbCk6IFIzQ3NzU2VsZWN0b3JMaXN0IHtcbiAgcmV0dXJuIHNlbGVjdG9yID8gQ3NzU2VsZWN0b3IucGFyc2Uoc2VsZWN0b3IpLm1hcChwYXJzZXJTZWxlY3RvclRvUjNTZWxlY3RvcikgOiBbXTtcbn1cblxuLy8gUGFzdGVkIGZyb20gcmVuZGVyMy9pbnRlcmZhY2VzL2RlZmluaXRpb24gc2luY2UgaXQgY2Fubm90IGJlIHJlZmVyZW5jZWQgZGlyZWN0bHlcbi8qKlxuICogRmxhZ3MgcGFzc2VkIGludG8gdGVtcGxhdGUgZnVuY3Rpb25zIHRvIGRldGVybWluZSB3aGljaCBibG9ja3MgKGkuZS4gY3JlYXRpb24sIHVwZGF0ZSlcbiAqIHNob3VsZCBiZSBleGVjdXRlZC5cbiAqXG4gKiBUeXBpY2FsbHksIGEgdGVtcGxhdGUgcnVucyBib3RoIHRoZSBjcmVhdGlvbiBibG9jayBhbmQgdGhlIHVwZGF0ZSBibG9jayBvbiBpbml0aWFsaXphdGlvbiBhbmRcbiAqIHN1YnNlcXVlbnQgcnVucyBvbmx5IGV4ZWN1dGUgdGhlIHVwZGF0ZSBibG9jay4gSG93ZXZlciwgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3cyByZXF1aXJlIHRoYXRcbiAqIHRoZSBjcmVhdGlvbiBibG9jayBiZSBleGVjdXRlZCBzZXBhcmF0ZWx5IGZyb20gdGhlIHVwZGF0ZSBibG9jayAoZm9yIGJhY2t3YXJkcyBjb21wYXQpLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBSZW5kZXJGbGFncyB7XG4gIC8qIFdoZXRoZXIgdG8gcnVuIHRoZSBjcmVhdGlvbiBibG9jayAoZS5nLiBjcmVhdGUgZWxlbWVudHMgYW5kIGRpcmVjdGl2ZXMpICovXG4gIENyZWF0ZSA9IDBiMDEsXG5cbiAgLyogV2hldGhlciB0byBydW4gdGhlIHVwZGF0ZSBibG9jayAoZS5nLiByZWZyZXNoIGJpbmRpbmdzKSAqL1xuICBVcGRhdGUgPSAwYjEwXG59XG5cbi8vIFBhc3RlZCBmcm9tIHJlbmRlcjMvaW50ZXJmYWNlcy9ub2RlLnRzXG4vKipcbiAqIEEgc2V0IG9mIG1hcmtlciB2YWx1ZXMgdG8gYmUgdXNlZCBpbiB0aGUgYXR0cmlidXRlcyBhcnJheXMuIFRoZXNlIG1hcmtlcnMgaW5kaWNhdGUgdGhhdCBzb21lXG4gKiBpdGVtcyBhcmUgbm90IHJlZ3VsYXIgYXR0cmlidXRlcyBhbmQgdGhlIHByb2Nlc3Npbmcgc2hvdWxkIGJlIGFkYXB0ZWQgYWNjb3JkaW5nbHkuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEF0dHJpYnV0ZU1hcmtlciB7XG4gIC8qKlxuICAgKiBNYXJrZXIgaW5kaWNhdGVzIHRoYXQgdGhlIGZvbGxvd2luZyAzIHZhbHVlcyBpbiB0aGUgYXR0cmlidXRlcyBhcnJheSBhcmU6XG4gICAqIG5hbWVzcGFjZVVyaSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWVcbiAgICogaW4gdGhhdCBvcmRlci5cbiAgICovXG4gIE5hbWVzcGFjZVVSSSA9IDAsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgY2xhc3MgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEVhY2ggdmFsdWUgZm9sbG93aW5nIGBDbGFzc2VzYCBkZXNpZ25hdGVzIGEgY2xhc3MgbmFtZSB0byBpbmNsdWRlIG9uIHRoZSBlbGVtZW50LlxuICAgKiAjIyBFeGFtcGxlOlxuICAgKlxuICAgKiBHaXZlbjpcbiAgICogYGBgXG4gICAqIDxkaXYgY2xhc3M9XCJmb28gYmFyIGJhelwiPi4uLjxkL3ZpPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGlzOlxuICAgKiBgYGBcbiAgICogdmFyIF9jMSA9IFtBdHRyaWJ1dGVNYXJrZXIuQ2xhc3NlcywgJ2ZvbycsICdiYXInLCAnYmF6J107XG4gICAqIGBgYFxuICAgKi9cbiAgQ2xhc3NlcyA9IDEsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgc3R5bGUgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEVhY2ggcGFpciBvZiB2YWx1ZXMgZm9sbG93aW5nIGBTdHlsZXNgIGRlc2lnbmF0ZXMgYSBzdHlsZSBuYW1lIGFuZCB2YWx1ZSB0byBpbmNsdWRlIG9uIHRoZVxuICAgKiBlbGVtZW50LlxuICAgKiAjIyBFeGFtcGxlOlxuICAgKlxuICAgKiBHaXZlbjpcbiAgICogYGBgXG4gICAqIDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDBweDsgaGVpZ2h0OjIwMHB4OyBjb2xvcjpyZWRcIj4uLi48L2Rpdj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBpczpcbiAgICogYGBgXG4gICAqIHZhciBfYzEgPSBbQXR0cmlidXRlTWFya2VyLlN0eWxlcywgJ3dpZHRoJywgJzEwMHB4JywgJ2hlaWdodCcuICcyMDBweCcsICdjb2xvcicsICdyZWQnXTtcbiAgICogYGBgXG4gICAqL1xuICBTdHlsZXMgPSAyLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHRoYXQgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGUgbmFtZXMgd2VyZSBleHRyYWN0ZWQgZnJvbSBpbnB1dCBvciBvdXRwdXQgYmluZGluZ3MuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8ZGl2IG1vbz1cImNhclwiIFtmb29dPVwiZXhwXCIgKGJhcik9XCJkb1N0aCgpXCI+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gWydtb28nLCAnY2FyJywgQXR0cmlidXRlTWFya2VyLkJpbmRpbmdzLCAnZm9vJywgJ2JhciddO1xuICAgKiBgYGBcbiAgICovXG4gIEJpbmRpbmdzID0gMyxcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIG5hbWVzIHdlcmUgaG9pc3RlZCBmcm9tIGFuIGlubGluZS10ZW1wbGF0ZSBkZWNsYXJhdGlvbi5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGdpdmVuIHRoZSBmb2xsb3dpbmcgSFRNTDpcbiAgICpcbiAgICogYGBgXG4gICAqIDxkaXYgKm5nRm9yPVwibGV0IHZhbHVlIG9mIHZhbHVlczsgdHJhY2tCeTp0cmFja0J5XCIgZGlyQSBbZGlyQl09XCJ2YWx1ZVwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgYHRlbXBsYXRlKClgIGluc3RydWN0aW9uIHdvdWxkIGluY2x1ZGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBbJ2RpckEnLCAnJywgQXR0cmlidXRlTWFya2VyLkJpbmRpbmdzLCAnZGlyQicsIEF0dHJpYnV0ZU1hcmtlci5UZW1wbGF0ZSwgJ25nRm9yJywgJ25nRm9yT2YnLFxuICAgKiAnbmdGb3JUcmFja0J5JywgJ2xldC12YWx1ZSddXG4gICAqIGBgYFxuICAgKlxuICAgKiB3aGlsZSB0aGUgZ2VuZXJhdGVkIGNvZGUgZm9yIHRoZSBgZWxlbWVudCgpYCBpbnN0cnVjdGlvbiBpbnNpZGUgdGhlIHRlbXBsYXRlIGZ1bmN0aW9uIHdvdWxkXG4gICAqIGluY2x1ZGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBbJ2RpckEnLCAnJywgQXR0cmlidXRlTWFya2VyLkJpbmRpbmdzLCAnZGlyQiddXG4gICAqIGBgYFxuICAgKi9cbiAgVGVtcGxhdGUgPSA0LFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHRoYXQgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGUgaXMgYG5nUHJvamVjdEFzYCBhbmQgaXRzIHZhbHVlIGlzIGEgcGFyc2VkIGBDc3NTZWxlY3RvcmAuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8aDEgYXR0cj1cInZhbHVlXCIgbmdQcm9qZWN0QXM9XCJbdGl0bGVdXCI+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgZm9yIHRoZSBgZWxlbWVudCgpYCBpbnN0cnVjdGlvbiB3b3VsZCBpbmNsdWRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogWydhdHRyJywgJ3ZhbHVlJywgQXR0cmlidXRlTWFya2VyLlByb2plY3RBcywgWycnLCAndGl0bGUnLCAnJ11dXG4gICAqIGBgYFxuICAgKi9cbiAgUHJvamVjdEFzID0gNSxcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIHdpbGwgYmUgdHJhbnNsYXRlZCBieSBydW50aW1lIGkxOG5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGdpdmVuIHRoZSBmb2xsb3dpbmcgSFRNTDpcbiAgICpcbiAgICogYGBgXG4gICAqIDxkaXYgbW9vPVwiY2FyXCIgZm9vPVwidmFsdWVcIiBpMThuLWZvbyBbYmFyXT1cImJpbmRpbmdcIiBpMThuLWJhcj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBpczpcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBfYzEgPSBbJ21vbycsICdjYXInLCBBdHRyaWJ1dGVNYXJrZXIuSTE4biwgJ2ZvbycsICdiYXInXTtcbiAgICovXG4gIEkxOG4gPSA2LFxufVxuIl19