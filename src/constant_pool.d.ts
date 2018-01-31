/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from './output/output_ast';
import { OutputContext } from './util';
export declare const enum DefinitionKind {
    Injector = 0,
    Directive = 1,
    Component = 2,
}
/**
 * A constant pool allows a code emitter to share constant in an output context.
 *
 * The constant pool also supports sharing access to ivy definitions references.
 */
export declare class ConstantPool {
    statements: o.Statement[];
    private literals;
    private injectorDefinitions;
    private directiveDefinitions;
    private componentDefinitions;
    private nextNameIndex;
    getConstLiteral(literal: o.Expression, forceShared?: boolean): o.Expression;
    getDefinition(type: any, kind: DefinitionKind, ctx: OutputContext): o.Expression;
    /**
     * Produce a unique name.
     *
     * The name might be unique among different prefixes if any of the prefixes end in
     * a digit so the prefix should be a constant string (not based on user input) and
     * must not end in a digit.
     */
    uniqueName(prefix: string): string;
    private freshName();
    private keyOf(expression);
}
