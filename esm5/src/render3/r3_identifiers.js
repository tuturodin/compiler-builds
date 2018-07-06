/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var CORE = '@angular/core';
var Identifiers = /** @class */ (function () {
    function Identifiers() {
    }
    /* Methods */
    Identifiers.NEW_METHOD = 'factory';
    Identifiers.TRANSFORM_METHOD = 'transform';
    Identifiers.PATCH_DEPS = 'patchedDeps';
    /* Instructions */
    Identifiers.namespaceHTML = { name: 'ɵNH', moduleName: CORE };
    Identifiers.namespaceMathML = { name: 'ɵNM', moduleName: CORE };
    Identifiers.namespaceSVG = { name: 'ɵNS', moduleName: CORE };
    Identifiers.element = { name: 'ɵEe', moduleName: CORE };
    Identifiers.elementStart = { name: 'ɵE', moduleName: CORE };
    Identifiers.elementEnd = { name: 'ɵe', moduleName: CORE };
    Identifiers.elementProperty = { name: 'ɵp', moduleName: CORE };
    Identifiers.elementAttribute = { name: 'ɵa', moduleName: CORE };
    Identifiers.elementClass = { name: 'ɵk', moduleName: CORE };
    Identifiers.elementClassNamed = { name: 'ɵkn', moduleName: CORE };
    Identifiers.elementStyle = { name: 'ɵs', moduleName: CORE };
    Identifiers.elementStyleNamed = { name: 'ɵsn', moduleName: CORE };
    Identifiers.containerCreate = { name: 'ɵC', moduleName: CORE };
    Identifiers.text = { name: 'ɵT', moduleName: CORE };
    Identifiers.textBinding = { name: 'ɵt', moduleName: CORE };
    Identifiers.bind = { name: 'ɵb', moduleName: CORE };
    Identifiers.interpolation1 = { name: 'ɵi1', moduleName: CORE };
    Identifiers.interpolation2 = { name: 'ɵi2', moduleName: CORE };
    Identifiers.interpolation3 = { name: 'ɵi3', moduleName: CORE };
    Identifiers.interpolation4 = { name: 'ɵi4', moduleName: CORE };
    Identifiers.interpolation5 = { name: 'ɵi5', moduleName: CORE };
    Identifiers.interpolation6 = { name: 'ɵi6', moduleName: CORE };
    Identifiers.interpolation7 = { name: 'ɵi7', moduleName: CORE };
    Identifiers.interpolation8 = { name: 'ɵi8', moduleName: CORE };
    Identifiers.interpolationV = { name: 'ɵiV', moduleName: CORE };
    Identifiers.pureFunction0 = { name: 'ɵf0', moduleName: CORE };
    Identifiers.pureFunction1 = { name: 'ɵf1', moduleName: CORE };
    Identifiers.pureFunction2 = { name: 'ɵf2', moduleName: CORE };
    Identifiers.pureFunction3 = { name: 'ɵf3', moduleName: CORE };
    Identifiers.pureFunction4 = { name: 'ɵf4', moduleName: CORE };
    Identifiers.pureFunction5 = { name: 'ɵf5', moduleName: CORE };
    Identifiers.pureFunction6 = { name: 'ɵf6', moduleName: CORE };
    Identifiers.pureFunction7 = { name: 'ɵf7', moduleName: CORE };
    Identifiers.pureFunction8 = { name: 'ɵf8', moduleName: CORE };
    Identifiers.pureFunctionV = { name: 'ɵfV', moduleName: CORE };
    Identifiers.pipeBind1 = { name: 'ɵpb1', moduleName: CORE };
    Identifiers.pipeBind2 = { name: 'ɵpb2', moduleName: CORE };
    Identifiers.pipeBind3 = { name: 'ɵpb3', moduleName: CORE };
    Identifiers.pipeBind4 = { name: 'ɵpb4', moduleName: CORE };
    Identifiers.pipeBindV = { name: 'ɵpbV', moduleName: CORE };
    Identifiers.load = { name: 'ɵld', moduleName: CORE };
    Identifiers.loadDirective = { name: 'ɵd', moduleName: CORE };
    Identifiers.pipe = { name: 'ɵPp', moduleName: CORE };
    Identifiers.projection = { name: 'ɵP', moduleName: CORE };
    Identifiers.projectionDef = { name: 'ɵpD', moduleName: CORE };
    Identifiers.inject = { name: 'inject', moduleName: CORE };
    Identifiers.injectAttribute = { name: 'ɵinjectAttribute', moduleName: CORE };
    Identifiers.injectElementRef = { name: 'ɵinjectElementRef', moduleName: CORE };
    Identifiers.injectTemplateRef = { name: 'ɵinjectTemplateRef', moduleName: CORE };
    Identifiers.injectViewContainerRef = { name: 'ɵinjectViewContainerRef', moduleName: CORE };
    Identifiers.directiveInject = { name: 'ɵdirectiveInject', moduleName: CORE };
    Identifiers.defineComponent = { name: 'ɵdefineComponent', moduleName: CORE };
    Identifiers.ComponentDef = {
        name: 'ComponentDef',
        moduleName: CORE,
    };
    Identifiers.defineDirective = {
        name: 'ɵdefineDirective',
        moduleName: CORE,
    };
    Identifiers.DirectiveDef = {
        name: 'DirectiveDef',
        moduleName: CORE,
    };
    Identifiers.InjectorDef = {
        name: 'InjectorDef',
        moduleName: CORE,
    };
    Identifiers.defineInjector = {
        name: 'defineInjector',
        moduleName: CORE,
    };
    Identifiers.NgModuleDef = {
        name: 'NgModuleDef',
        moduleName: CORE,
    };
    Identifiers.defineNgModule = { name: 'ɵdefineNgModule', moduleName: CORE };
    Identifiers.PipeDef = { name: 'ɵPipeDef', moduleName: CORE };
    Identifiers.definePipe = { name: 'ɵdefinePipe', moduleName: CORE };
    Identifiers.query = { name: 'ɵQ', moduleName: CORE };
    Identifiers.queryRefresh = { name: 'ɵqR', moduleName: CORE };
    Identifiers.NgOnChangesFeature = { name: 'ɵNgOnChangesFeature', moduleName: CORE };
    Identifiers.InheritDefinitionFeature = { name: 'ɵInheritDefinitionFeature', moduleName: CORE };
    Identifiers.listener = { name: 'ɵL', moduleName: CORE };
    // Reserve slots for pure functions
    Identifiers.reserveSlots = { name: 'ɵrS', moduleName: CORE };
    return Identifiers;
}());
export { Identifiers };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfaWRlbnRpZmllcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvcmVuZGVyMy9yM19pZGVudGlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxJQUFNLElBQUksR0FBRyxlQUFlLENBQUM7QUFFN0I7SUFBQTtJQXlJQSxDQUFDO0lBeElDLGFBQWE7SUFDTixzQkFBVSxHQUFHLFNBQVMsQ0FBQztJQUN2Qiw0QkFBZ0IsR0FBRyxXQUFXLENBQUM7SUFDL0Isc0JBQVUsR0FBRyxhQUFhLENBQUM7SUFFbEMsa0JBQWtCO0lBQ1gseUJBQWEsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUVyRSwyQkFBZSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXZFLHdCQUFZLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFcEUsbUJBQU8sR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUUvRCx3QkFBWSxHQUF3QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRW5FLHNCQUFVLEdBQXdCLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFakUsMkJBQWUsR0FBd0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV0RSw0QkFBZ0IsR0FBd0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV2RSx3QkFBWSxHQUF3QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRW5FLDZCQUFpQixHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXpFLHdCQUFZLEdBQXdCLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFbkUsNkJBQWlCLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFekUsMkJBQWUsR0FBd0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV0RSxnQkFBSSxHQUF3QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRTNELHVCQUFXLEdBQXdCLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFbEUsZ0JBQUksR0FBd0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUUzRCwwQkFBYyxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3RFLDBCQUFjLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDdEUsMEJBQWMsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUN0RSwwQkFBYyxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3RFLDBCQUFjLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDdEUsMEJBQWMsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUN0RSwwQkFBYyxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3RFLDBCQUFjLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDdEUsMEJBQWMsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV0RSx5QkFBYSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3JFLHlCQUFhLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDckUseUJBQWEsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNyRSx5QkFBYSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3JFLHlCQUFhLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDckUseUJBQWEsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNyRSx5QkFBYSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3JFLHlCQUFhLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDckUseUJBQWEsR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNyRSx5QkFBYSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXJFLHFCQUFTLEdBQXdCLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDbEUscUJBQVMsR0FBd0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNsRSxxQkFBUyxHQUF3QixFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ2xFLHFCQUFTLEdBQXdCLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDbEUscUJBQVMsR0FBd0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUVsRSxnQkFBSSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzVELHlCQUFhLEdBQXdCLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFcEUsZ0JBQUksR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUU1RCxzQkFBVSxHQUF3QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ2pFLHlCQUFhLEdBQXdCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFckUsa0JBQU0sR0FBd0IsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUVqRSwyQkFBZSxHQUF3QixFQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFcEYsNEJBQWdCLEdBQXdCLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV0Riw2QkFBaUIsR0FBd0IsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXhGLGtDQUFzQixHQUNILEVBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV2RSwyQkFBZSxHQUF3QixFQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFcEYsMkJBQWUsR0FBd0IsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXBGLHdCQUFZLEdBQXdCO1FBQ3pDLElBQUksRUFBRSxjQUFjO1FBQ3BCLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLENBQUM7SUFFSywyQkFBZSxHQUF3QjtRQUM1QyxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLENBQUM7SUFFSyx3QkFBWSxHQUF3QjtRQUN6QyxJQUFJLEVBQUUsY0FBYztRQUNwQixVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDO0lBRUssdUJBQVcsR0FBd0I7UUFDeEMsSUFBSSxFQUFFLGFBQWE7UUFDbkIsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQztJQUVLLDBCQUFjLEdBQXdCO1FBQzNDLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQztJQUVLLHVCQUFXLEdBQXdCO1FBQ3hDLElBQUksRUFBRSxhQUFhO1FBQ25CLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLENBQUM7SUFFSywwQkFBYyxHQUF3QixFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFbEYsbUJBQU8sR0FBd0IsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUVwRSxzQkFBVSxHQUF3QixFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRTFFLGlCQUFLLEdBQXdCLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUQsd0JBQVksR0FBd0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUVwRSw4QkFBa0IsR0FBd0IsRUFBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRTFGLG9DQUF3QixHQUNMLEVBQUMsSUFBSSxFQUFFLDJCQUEyQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUV6RSxvQkFBUSxHQUF3QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRXRFLG1DQUFtQztJQUM1Qix3QkFBWSxHQUF3QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzdFLGtCQUFDO0NBQUEsQUF6SUQsSUF5SUM7U0F6SVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5cbmNvbnN0IENPUkUgPSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVycyB7XG4gIC8qIE1ldGhvZHMgKi9cbiAgc3RhdGljIE5FV19NRVRIT0QgPSAnZmFjdG9yeSc7XG4gIHN0YXRpYyBUUkFOU0ZPUk1fTUVUSE9EID0gJ3RyYW5zZm9ybSc7XG4gIHN0YXRpYyBQQVRDSF9ERVBTID0gJ3BhdGNoZWREZXBzJztcblxuICAvKiBJbnN0cnVjdGlvbnMgKi9cbiAgc3RhdGljIG5hbWVzcGFjZUhUTUw6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1TkgnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgbmFtZXNwYWNlTWF0aE1MOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtU5NJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIG5hbWVzcGFjZVNWRzogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVOUycsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBlbGVtZW50OiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtUVlJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGVsZW1lbnRTdGFydDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVFJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGVsZW1lbnRFbmQ6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1ZScsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBlbGVtZW50UHJvcGVydHk6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBlbGVtZW50QXR0cmlidXRlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWEnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgZWxlbWVudENsYXNzOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWsnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgZWxlbWVudENsYXNzTmFtZWQ6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1a24nLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgZWxlbWVudFN0eWxlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtXMnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgZWxlbWVudFN0eWxlTmFtZWQ6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1c24nLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgY29udGFpbmVyQ3JlYXRlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtUMnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgdGV4dDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVUJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIHRleHRCaW5kaW5nOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtXQnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgYmluZDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybViJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGludGVycG9sYXRpb24xOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWkxJywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBpbnRlcnBvbGF0aW9uMjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVpMicsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgaW50ZXJwb2xhdGlvbjM6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1aTMnLCBtb2R1bGVOYW1lOiBDT1JFfTtcbiAgc3RhdGljIGludGVycG9sYXRpb240OiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWk0JywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBpbnRlcnBvbGF0aW9uNTogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVpNScsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgaW50ZXJwb2xhdGlvbjY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1aTYnLCBtb2R1bGVOYW1lOiBDT1JFfTtcbiAgc3RhdGljIGludGVycG9sYXRpb243OiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWk3JywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBpbnRlcnBvbGF0aW9uODogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVpOCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgaW50ZXJwb2xhdGlvblY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1aVYnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgcHVyZUZ1bmN0aW9uMDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmMCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uMTogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmMScsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uMjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmMicsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uMzogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmMycsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uNDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmNCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uNTogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmNScsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uNjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmNicsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uNzogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmNycsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uODogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmOCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHVyZUZ1bmN0aW9uVjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVmVicsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBwaXBlQmluZDE6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cGIxJywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBwaXBlQmluZDI6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cGIyJywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBwaXBlQmluZDM6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cGIzJywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBwaXBlQmluZDQ6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cGI0JywgbW9kdWxlTmFtZTogQ09SRX07XG4gIHN0YXRpYyBwaXBlQmluZFY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1cGJWJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGxvYWQ6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1bGQnLCBtb2R1bGVOYW1lOiBDT1JFfTtcbiAgc3RhdGljIGxvYWREaXJlY3RpdmU6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1ZCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBwaXBlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtVBwJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIHByb2plY3Rpb246IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1UCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcHJvamVjdGlvbkRlZjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVwRCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBpbmplY3Q6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ2luamVjdCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBpbmplY3RBdHRyaWJ1dGU6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1aW5qZWN0QXR0cmlidXRlJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGluamVjdEVsZW1lbnRSZWY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1aW5qZWN0RWxlbWVudFJlZicsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBpbmplY3RUZW1wbGF0ZVJlZjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVpbmplY3RUZW1wbGF0ZVJlZicsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBpbmplY3RWaWV3Q29udGFpbmVyUmVmOlxuICAgICAgby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVpbmplY3RWaWV3Q29udGFpbmVyUmVmJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIGRpcmVjdGl2ZUluamVjdDogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVkaXJlY3RpdmVJbmplY3QnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgZGVmaW5lQ29tcG9uZW50OiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWRlZmluZUNvbXBvbmVudCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBDb21wb25lbnREZWY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7XG4gICAgbmFtZTogJ0NvbXBvbmVudERlZicsXG4gICAgbW9kdWxlTmFtZTogQ09SRSxcbiAgfTtcblxuICBzdGF0aWMgZGVmaW5lRGlyZWN0aXZlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge1xuICAgIG5hbWU6ICfJtWRlZmluZURpcmVjdGl2ZScsXG4gICAgbW9kdWxlTmFtZTogQ09SRSxcbiAgfTtcblxuICBzdGF0aWMgRGlyZWN0aXZlRGVmOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge1xuICAgIG5hbWU6ICdEaXJlY3RpdmVEZWYnLFxuICAgIG1vZHVsZU5hbWU6IENPUkUsXG4gIH07XG5cbiAgc3RhdGljIEluamVjdG9yRGVmOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge1xuICAgIG5hbWU6ICdJbmplY3RvckRlZicsXG4gICAgbW9kdWxlTmFtZTogQ09SRSxcbiAgfTtcblxuICBzdGF0aWMgZGVmaW5lSW5qZWN0b3I6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7XG4gICAgbmFtZTogJ2RlZmluZUluamVjdG9yJyxcbiAgICBtb2R1bGVOYW1lOiBDT1JFLFxuICB9O1xuXG4gIHN0YXRpYyBOZ01vZHVsZURlZjogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtcbiAgICBuYW1lOiAnTmdNb2R1bGVEZWYnLFxuICAgIG1vZHVsZU5hbWU6IENPUkUsXG4gIH07XG5cbiAgc3RhdGljIGRlZmluZU5nTW9kdWxlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWRlZmluZU5nTW9kdWxlJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIFBpcGVEZWY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1UGlwZURlZicsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIHN0YXRpYyBkZWZpbmVQaXBlOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtWRlZmluZVBpcGUnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgcXVlcnk6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1UScsIG1vZHVsZU5hbWU6IENPUkV9O1xuICBzdGF0aWMgcXVlcnlSZWZyZXNoOiBvLkV4dGVybmFsUmVmZXJlbmNlID0ge25hbWU6ICfJtXFSJywgbW9kdWxlTmFtZTogQ09SRX07XG5cbiAgc3RhdGljIE5nT25DaGFuZ2VzRmVhdHVyZTogby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVOZ09uQ2hhbmdlc0ZlYXR1cmUnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgSW5oZXJpdERlZmluaXRpb25GZWF0dXJlOlxuICAgICAgby5FeHRlcm5hbFJlZmVyZW5jZSA9IHtuYW1lOiAnybVJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUnLCBtb2R1bGVOYW1lOiBDT1JFfTtcblxuICBzdGF0aWMgbGlzdGVuZXI6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1TCcsIG1vZHVsZU5hbWU6IENPUkV9O1xuXG4gIC8vIFJlc2VydmUgc2xvdHMgZm9yIHB1cmUgZnVuY3Rpb25zXG4gIHN0YXRpYyByZXNlcnZlU2xvdHM6IG8uRXh0ZXJuYWxSZWZlcmVuY2UgPSB7bmFtZTogJ8m1clMnLCBtb2R1bGVOYW1lOiBDT1JFfTtcbn1cbiJdfQ==