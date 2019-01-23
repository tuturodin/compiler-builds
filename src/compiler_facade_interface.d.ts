/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A set of interfaces which are shared between `@angular/core` and `@angular/compiler` to allow
 * for late binding of `@angular/compiler` for JIT purposes.
 *
 * This file has two copies. Please ensure that they are in sync:
 *  - packages/compiler/src/compiler_facade_interface.ts             (master)
 *  - packages/core/src/render3/jit/compiler_facade_interface.ts     (copy)
 *
 * Please ensure that the two files are in sync using this command:
 * ```
 * cp packages/compiler/src/compiler_facade_interface.ts \
 *    packages/core/src/render3/jit/compiler_facade_interface.ts
 * ```
 */
export interface ExportedCompilerFacade {
    ɵcompilerFacade: CompilerFacade;
}
export interface CompilerFacade {
    compilePipe(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3PipeMetadataFacade): any;
    compileInjectable(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3InjectableMetadataFacade): any;
    compileInjector(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3InjectorMetadataFacade): any;
    compileNgModule(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3NgModuleMetadataFacade): any;
    compileDirective(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3DirectiveMetadataFacade): any;
    compileComponent(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3ComponentMetadataFacade): any;
    R3ResolvedDependencyType: typeof R3ResolvedDependencyType;
}
export interface CoreEnvironment {
    [name: string]: Function;
}
export declare type StringMap = {
    [key: string]: string;
};
export declare type StringMapWithRename = {
    [key: string]: string | [string, string];
};
export declare type Provider = any;
export declare enum R3ResolvedDependencyType {
    Token = 0,
    Attribute = 1
}
export interface R3DependencyMetadataFacade {
    token: any;
    resolved: R3ResolvedDependencyType;
    host: boolean;
    optional: boolean;
    self: boolean;
    skipSelf: boolean;
}
export interface R3PipeMetadataFacade {
    name: string;
    type: any;
    pipeName: string;
    deps: R3DependencyMetadataFacade[] | null;
    pure: boolean;
}
export interface R3InjectableMetadataFacade {
    name: string;
    type: any;
    typeArgumentCount: number;
    ctorDeps: R3DependencyMetadataFacade[] | null;
    providedIn: any;
    useClass?: any;
    useFactory?: any;
    useExisting?: any;
    useValue?: any;
    userDeps?: R3DependencyMetadataFacade[];
}
export interface R3NgModuleMetadataFacade {
    type: any;
    bootstrap: Function[];
    declarations: Function[];
    imports: Function[];
    exports: Function[];
    emitInline: boolean;
}
export interface R3InjectorMetadataFacade {
    name: string;
    type: any;
    deps: R3DependencyMetadataFacade[] | null;
    providers: any;
    imports: any;
}
export interface R3DirectiveMetadataFacade {
    name: string;
    type: any;
    typeArgumentCount: number;
    typeSourceSpan: null;
    deps: R3DependencyMetadataFacade[] | null;
    selector: string | null;
    queries: R3QueryMetadataFacade[];
    host: {
        [key: string]: string;
    };
    propMetadata: {
        [key: string]: any[];
    };
    inputs: string[];
    outputs: string[];
    usesInheritance: boolean;
    exportAs: string[] | null;
    providers: Provider[] | null;
}
export interface R3ComponentMetadataFacade extends R3DirectiveMetadataFacade {
    template: string;
    preserveWhitespaces: boolean;
    animations: any[] | undefined;
    viewQueries: R3QueryMetadataFacade[];
    pipes: Map<string, any>;
    directives: {
        selector: string;
        expression: any;
    }[];
    styles: string[];
    encapsulation: ViewEncapsulation;
    viewProviders: Provider[] | null;
    interpolation?: [string, string];
    changeDetection?: ChangeDetectionStrategy;
}
export declare type ViewEncapsulation = number;
export declare type ChangeDetectionStrategy = number;
export interface R3QueryMetadataFacade {
    propertyName: string;
    first: boolean;
    predicate: any | string[];
    descendants: boolean;
    read: any | null;
}
