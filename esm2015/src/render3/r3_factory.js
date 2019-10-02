/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StaticSymbol } from '../aot/static_symbol';
import { tokenReference } from '../compile_metadata';
import { Identifiers } from '../identifiers';
import * as o from '../output/output_ast';
import { Identifiers as R3 } from '../render3/r3_identifiers';
import { typeWithParameters } from './util';
import { unsupported } from './view/util';
export var R3FactoryDelegateType;
(function (R3FactoryDelegateType) {
    R3FactoryDelegateType[R3FactoryDelegateType["Class"] = 0] = "Class";
    R3FactoryDelegateType[R3FactoryDelegateType["Function"] = 1] = "Function";
    R3FactoryDelegateType[R3FactoryDelegateType["Factory"] = 2] = "Factory";
})(R3FactoryDelegateType || (R3FactoryDelegateType = {}));
/**
 * Resolved type of a dependency.
 *
 * Occasionally, dependencies will have special significance which is known statically. In that
 * case the `R3ResolvedDependencyType` informs the factory generator that a particular dependency
 * should be generated specially (usually by calling a special injection function instead of the
 * standard one).
 */
export var R3ResolvedDependencyType;
(function (R3ResolvedDependencyType) {
    /**
     * A normal token dependency.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
    /**
     * The dependency is for an attribute.
     *
     * The token expression is a string representing the attribute name.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
    /**
     * Injecting the `ChangeDetectorRef` token. Needs special handling when injected into a pipe.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 2] = "ChangeDetectorRef";
})(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
/**
 * Construct a factory function expression for the given `R3FactoryMetadata`.
 */
export function compileFactoryFunction(meta, isPipe = false) {
    const t = o.variable('t');
    const statements = [];
    // The type to instantiate via constructor invocation. If there is no delegated factory, meaning
    // this type is always created by constructor invocation, then this is the type-to-create
    // parameter provided by the user (t) if specified, or the current type if not. If there is a
    // delegated factory (which is used to create the current type) then this is only the type-to-
    // create parameter (t).
    const typeForCtor = !isDelegatedMetadata(meta) ? new o.BinaryOperatorExpr(o.BinaryOperator.Or, t, meta.type) : t;
    let ctorExpr = null;
    if (meta.deps !== null) {
        // There is a constructor (either explicitly or implicitly defined).
        if (meta.deps !== 'invalid') {
            ctorExpr =
                new o.InstantiateExpr(typeForCtor, injectDependencies(meta.deps, meta.injectFn, isPipe));
        }
    }
    else {
        const baseFactory = o.variable(`ɵ${meta.name}_BaseFactory`);
        const getInheritedFactory = o.importExpr(R3.getInheritedFactory);
        const baseFactoryStmt = baseFactory.set(getInheritedFactory.callFn([meta.type])).toDeclStmt(o.INFERRED_TYPE, [
            o.StmtModifier.Exported, o.StmtModifier.Final
        ]);
        statements.push(baseFactoryStmt);
        // There is no constructor, use the base class' factory to construct typeForCtor.
        ctorExpr = baseFactory.callFn([typeForCtor]);
    }
    const ctorExprFinal = ctorExpr;
    const body = [];
    let retExpr = null;
    function makeConditionalFactory(nonCtorExpr) {
        const r = o.variable('r');
        body.push(r.set(o.NULL_EXPR).toDeclStmt());
        let ctorStmt = null;
        if (ctorExprFinal !== null) {
            ctorStmt = r.set(ctorExprFinal).toStmt();
        }
        else {
            ctorStmt = makeErrorStmt(meta.name);
        }
        body.push(o.ifStmt(t, [ctorStmt], [r.set(nonCtorExpr).toStmt()]));
        return r;
    }
    if (isDelegatedMetadata(meta) && meta.delegateType === R3FactoryDelegateType.Factory) {
        const delegateFactory = o.variable(`ɵ${meta.name}_BaseFactory`);
        const getFactoryOf = o.importExpr(R3.getFactoryOf);
        if (meta.delegate.isEquivalent(meta.type)) {
            throw new Error(`Illegal state: compiling factory that delegates to itself`);
        }
        const delegateFactoryStmt = delegateFactory.set(getFactoryOf.callFn([meta.delegate])).toDeclStmt(o.INFERRED_TYPE, [
            o.StmtModifier.Exported, o.StmtModifier.Final
        ]);
        statements.push(delegateFactoryStmt);
        retExpr = makeConditionalFactory(delegateFactory.callFn([]));
    }
    else if (isDelegatedMetadata(meta)) {
        // This type is created with a delegated factory. If a type parameter is not specified, call
        // the factory instead.
        const delegateArgs = injectDependencies(meta.delegateDeps, meta.injectFn, isPipe);
        // Either call `new delegate(...)` or `delegate(...)` depending on meta.useNewForDelegate.
        const factoryExpr = new (meta.delegateType === R3FactoryDelegateType.Class ?
            o.InstantiateExpr :
            o.InvokeFunctionExpr)(meta.delegate, delegateArgs);
        retExpr = makeConditionalFactory(factoryExpr);
    }
    else if (isExpressionFactoryMetadata(meta)) {
        // TODO(alxhub): decide whether to lower the value here or in the caller
        retExpr = makeConditionalFactory(meta.expression);
    }
    else {
        retExpr = ctorExpr;
    }
    if (retExpr !== null) {
        body.push(new o.ReturnStatement(retExpr));
    }
    else {
        body.push(makeErrorStmt(meta.name));
    }
    return {
        factory: o.fn([new o.FnParam('t', o.DYNAMIC_TYPE)], body, o.INFERRED_TYPE, undefined, `${meta.name}_Factory`),
        statements,
        type: o.expressionType(o.importExpr(R3.FactoryDef, [typeWithParameters(meta.type, meta.typeArgumentCount)]))
    };
}
/**
 * Constructs the `ngFactoryDef` from directive/component/pipe metadata.
 */
export function compileFactoryFromMetadata(meta) {
    return compileFactoryFunction({
        name: meta.name,
        type: meta.type,
        deps: meta.deps,
        typeArgumentCount: meta.typeArgumentCount,
        injectFn: meta.injectFn,
    }, meta.isPipe);
}
function injectDependencies(deps, injectFn, isPipe) {
    return deps.map(dep => compileInjectDependency(dep, injectFn, isPipe));
}
function compileInjectDependency(dep, injectFn, isPipe) {
    // Interpret the dependency according to its resolved type.
    switch (dep.resolved) {
        case R3ResolvedDependencyType.Token:
        case R3ResolvedDependencyType.ChangeDetectorRef:
            // Build up the injection flags according to the metadata.
            const flags = 0 /* Default */ | (dep.self ? 2 /* Self */ : 0) |
                (dep.skipSelf ? 4 /* SkipSelf */ : 0) | (dep.host ? 1 /* Host */ : 0) |
                (dep.optional ? 8 /* Optional */ : 0);
            // If this dependency is optional or otherwise has non-default flags, then additional
            // parameters describing how to inject the dependency must be passed to the inject function
            // that's being used.
            let flagsParam = (flags !== 0 /* Default */ || dep.optional) ? o.literal(flags) : null;
            // We have a separate instruction for injecting ChangeDetectorRef into a pipe.
            if (isPipe && dep.resolved === R3ResolvedDependencyType.ChangeDetectorRef) {
                return o.importExpr(R3.injectPipeChangeDetectorRef).callFn(flagsParam ? [flagsParam] : []);
            }
            // Build up the arguments to the injectFn call.
            const injectArgs = [dep.token];
            if (flagsParam) {
                injectArgs.push(flagsParam);
            }
            return o.importExpr(injectFn).callFn(injectArgs);
        case R3ResolvedDependencyType.Attribute:
            // In the case of attributes, the attribute name in question is given as the token.
            return o.importExpr(R3.injectAttribute).callFn([dep.token]);
        default:
            return unsupported(`Unknown R3ResolvedDependencyType: ${R3ResolvedDependencyType[dep.resolved]}`);
    }
}
/**
 * A helper function useful for extracting `R3DependencyMetadata` from a Render2
 * `CompileTypeMetadata` instance.
 */
export function dependenciesFromGlobalMetadata(type, outputCtx, reflector) {
    // Use the `CompileReflector` to look up references to some well-known Angular types. These will
    // be compared with the token to statically determine whether the token has significance to
    // Angular, and set the correct `R3ResolvedDependencyType` as a result.
    const injectorRef = reflector.resolveExternalReference(Identifiers.Injector);
    // Iterate through the type's DI dependencies and produce `R3DependencyMetadata` for each of them.
    const deps = [];
    for (let dependency of type.diDeps) {
        if (dependency.token) {
            const tokenRef = tokenReference(dependency.token);
            let resolved = dependency.isAttribute ?
                R3ResolvedDependencyType.Attribute :
                R3ResolvedDependencyType.Token;
            // In the case of most dependencies, the token will be a reference to a type. Sometimes,
            // however, it can be a string, in the case of older Angular code or @Attribute injection.
            const token = tokenRef instanceof StaticSymbol ? outputCtx.importExpr(tokenRef) : o.literal(tokenRef);
            // Construct the dependency.
            deps.push({
                token,
                resolved,
                host: !!dependency.isHost,
                optional: !!dependency.isOptional,
                self: !!dependency.isSelf,
                skipSelf: !!dependency.isSkipSelf,
            });
        }
        else {
            unsupported('dependency without a token');
        }
    }
    return deps;
}
function makeErrorStmt(name) {
    return new o.ThrowStmt(new o.InstantiateExpr(new o.ReadVarExpr('Error'), [
        o.literal(`${name} has a constructor which is not compatible with Dependency Injection. It should probably not be @Injectable().`)
    ]));
}
function isDelegatedMetadata(meta) {
    return meta.delegateType !== undefined;
}
function isExpressionFactoryMetadata(meta) {
    return meta.expression !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBc0IsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHeEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQTBDeEMsTUFBTSxDQUFOLElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUMvQixtRUFBSyxDQUFBO0lBQ0wseUVBQVEsQ0FBQTtJQUNSLHVFQUFPLENBQUE7QUFDVCxDQUFDLEVBSlcscUJBQXFCLEtBQXJCLHFCQUFxQixRQUloQztBQTZCRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBaUJYO0FBakJELFdBQVksd0JBQXdCO0lBQ2xDOztPQUVHO0lBQ0gseUVBQVMsQ0FBQTtJQUVUOzs7O09BSUc7SUFDSCxpRkFBYSxDQUFBO0lBRWI7O09BRUc7SUFDSCxpR0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBakJXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFpQm5DO0FBNENEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLElBQXVCLEVBQUUsTUFBTSxHQUFHLEtBQUs7SUFDNUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEs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bUJBQW1CLENBQUMsSUFBdUI7SUFFbEQsT0FBUSxJQUFZLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsU0FBUywyQkFBMkIsQ0FBQyxJQUF1QjtJQUMxRCxPQUFRLElBQVksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO0FBQ2hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3RhdGljU3ltYm9sfSBmcm9tICcuLi9hb3Qvc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge0NvbXBpbGVUeXBlTWV0YWRhdGEsIHRva2VuUmVmZXJlbmNlfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVJlZmxlY3Rvcn0gZnJvbSAnLi4vY29tcGlsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7SWRlbnRpZmllcnMgYXMgUjN9IGZyb20gJy4uL3JlbmRlcjMvcjNfaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHt0eXBlV2l0aFBhcmFtZXRlcnN9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge3Vuc3VwcG9ydGVkfSBmcm9tICcuL3ZpZXcvdXRpbCc7XG5cblxuXG4vKipcbiAqIE1ldGFkYXRhIHJlcXVpcmVkIGJ5IHRoZSBmYWN0b3J5IGdlbmVyYXRvciB0byBnZW5lcmF0ZSBhIGBmYWN0b3J5YCBmdW5jdGlvbiBmb3IgYSB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzQ29uc3RydWN0b3JGYWN0b3J5TWV0YWRhdGEge1xuICAvKipcbiAgICogU3RyaW5nIG5hbWUgb2YgdGhlIHR5cGUgYmVpbmcgZ2VuZXJhdGVkICh1c2VkIHRvIG5hbWUgdGhlIGZhY3RvcnkgZnVuY3Rpb24pLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgZnVuY3Rpb24gKG9yIGNvbnN0cnVjdG9yKSB3aGljaCB3aWxsIGluc3RhbnRpYXRlIHRoZSByZXF1ZXN0ZWRcbiAgICogdHlwZS5cbiAgICpcbiAgICogVGhpcyBjb3VsZCBiZSBhIHJlZmVyZW5jZSB0byBhIGNvbnN0cnVjdG9yIHR5cGUsIG9yIHRvIGEgdXNlci1kZWZpbmVkIGZhY3RvcnkgZnVuY3Rpb24uIFRoZVxuICAgKiBgdXNlTmV3YCBwcm9wZXJ0eSBkZXRlcm1pbmVzIHdoZXRoZXIgaXQgd2lsbCBiZSBjYWxsZWQgYXMgYSBjb25zdHJ1Y3RvciBvciBub3QuXG4gICAqL1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqIE51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBgdHlwZWAuICovXG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBgZm5PckNsYXNzYCBpcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIG9yIGEgdXNlci1kZWZpbmVkIGZhY3RvcnksIGl0XG4gICAqIG1heSBoYXZlIDAgb3IgbW9yZSBwYXJhbWV0ZXJzLCB3aGljaCB3aWxsIGJlIGluamVjdGVkIGFjY29yZGluZyB0byB0aGUgYFIzRGVwZW5kZW5jeU1ldGFkYXRhYFxuICAgKiBmb3IgdGhvc2UgcGFyYW1ldGVycy4gSWYgdGhpcyBpcyBgbnVsbGAsIHRoZW4gdGhlIHR5cGUncyBjb25zdHJ1Y3RvciBpcyBub25leGlzdGVudCBhbmQgd2lsbFxuICAgKiBiZSBpbmhlcml0ZWQgZnJvbSBgZm5PckNsYXNzYCB3aGljaCBpcyBpbnRlcnByZXRlZCBhcyB0aGUgY3VycmVudCB0eXBlLiBJZiB0aGlzIGlzIGAnaW52YWxpZCdgLFxuICAgKiB0aGVuIG9uZSBvciBtb3JlIG9mIHRoZSBwYXJhbWV0ZXJzIHdhc24ndCByZXNvbHZhYmxlIGFuZCBhbnkgYXR0ZW1wdCB0byB1c2UgdGhlc2UgZGVwcyB3aWxsXG4gICAqIHJlc3VsdCBpbiBhIHJ1bnRpbWUgZXJyb3IuXG4gICAqL1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdfCdpbnZhbGlkJ3xudWxsO1xuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIGZvciB0aGUgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGluamVjdCBkZXBlbmRlbmNpZXMuIFRoZSBBUEkgb2YgdGhpc1xuICAgKiBmdW5jdGlvbiBjb3VsZCBiZSBkaWZmZXJlbnQsIGFuZCBvdGhlciBvcHRpb25zIGNvbnRyb2wgaG93IGl0IHdpbGwgYmUgaW52b2tlZC5cbiAgICovXG4gIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlO1xufVxuXG5leHBvcnQgZW51bSBSM0ZhY3RvcnlEZWxlZ2F0ZVR5cGUge1xuICBDbGFzcyxcbiAgRnVuY3Rpb24sXG4gIEZhY3RvcnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWxlZ2F0ZWRGYWN0b3J5TWV0YWRhdGEgZXh0ZW5kcyBSM0NvbnN0cnVjdG9yRmFjdG9yeU1ldGFkYXRhIHtcbiAgZGVsZWdhdGU6IG8uRXhwcmVzc2lvbjtcbiAgZGVsZWdhdGVUeXBlOiBSM0ZhY3RvcnlEZWxlZ2F0ZVR5cGUuRmFjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlbGVnYXRlZEZuT3JDbGFzc01ldGFkYXRhIGV4dGVuZHMgUjNDb25zdHJ1Y3RvckZhY3RvcnlNZXRhZGF0YSB7XG4gIGRlbGVnYXRlOiBvLkV4cHJlc3Npb247XG4gIGRlbGVnYXRlVHlwZTogUjNGYWN0b3J5RGVsZWdhdGVUeXBlLkNsYXNzfFIzRmFjdG9yeURlbGVnYXRlVHlwZS5GdW5jdGlvbjtcbiAgZGVsZWdhdGVEZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRXhwcmVzc2lvbkZhY3RvcnlNZXRhZGF0YSBleHRlbmRzIFIzQ29uc3RydWN0b3JGYWN0b3J5TWV0YWRhdGEge1xuICBleHByZXNzaW9uOiBvLkV4cHJlc3Npb247XG59XG5cbmV4cG9ydCB0eXBlIFIzRmFjdG9yeU1ldGFkYXRhID0gUjNDb25zdHJ1Y3RvckZhY3RvcnlNZXRhZGF0YSB8IFIzRGVsZWdhdGVkRmFjdG9yeU1ldGFkYXRhIHxcbiAgICBSM0RlbGVnYXRlZEZuT3JDbGFzc01ldGFkYXRhIHwgUjNFeHByZXNzaW9uRmFjdG9yeU1ldGFkYXRhO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzRmFjdG9yeURlZk1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW118J2ludmFsaWQnfG51bGw7XG4gIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlO1xuICBpc1BpcGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFJlc29sdmVkIHR5cGUgb2YgYSBkZXBlbmRlbmN5LlxuICpcbiAqIE9jY2FzaW9uYWxseSwgZGVwZW5kZW5jaWVzIHdpbGwgaGF2ZSBzcGVjaWFsIHNpZ25pZmljYW5jZSB3aGljaCBpcyBrbm93biBzdGF0aWNhbGx5LiBJbiB0aGF0XG4gKiBjYXNlIHRoZSBgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlYCBpbmZvcm1zIHRoZSBmYWN0b3J5IGdlbmVyYXRvciB0aGF0IGEgcGFydGljdWxhciBkZXBlbmRlbmN5XG4gKiBzaG91bGQgYmUgZ2VuZXJhdGVkIHNwZWNpYWxseSAodXN1YWxseSBieSBjYWxsaW5nIGEgc3BlY2lhbCBpbmplY3Rpb24gZnVuY3Rpb24gaW5zdGVhZCBvZiB0aGVcbiAqIHN0YW5kYXJkIG9uZSkuXG4gKi9cbmV4cG9ydCBlbnVtIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSB7XG4gIC8qKlxuICAgKiBBIG5vcm1hbCB0b2tlbiBkZXBlbmRlbmN5LlxuICAgKi9cbiAgVG9rZW4gPSAwLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYW4gYXR0cmlidXRlLlxuICAgKlxuICAgKiBUaGUgdG9rZW4gZXhwcmVzc2lvbiBpcyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGF0dHJpYnV0ZSBuYW1lLlxuICAgKi9cbiAgQXR0cmlidXRlID0gMSxcblxuICAvKipcbiAgICogSW5qZWN0aW5nIHRoZSBgQ2hhbmdlRGV0ZWN0b3JSZWZgIHRva2VuLiBOZWVkcyBzcGVjaWFsIGhhbmRsaW5nIHdoZW4gaW5qZWN0ZWQgaW50byBhIHBpcGUuXG4gICAqL1xuICBDaGFuZ2VEZXRlY3RvclJlZiA9IDIsXG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVwcmVzZW50aW5nIGEgc2luZ2xlIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQgaW50byBhIGNvbnN0cnVjdG9yIG9yIGZ1bmN0aW9uIGNhbGwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIHRva2VuIG9yIHZhbHVlIHRvIGJlIGluamVjdGVkLlxuICAgKi9cbiAgdG9rZW46IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogQW4gZW51bSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBkZXBlbmRlbmN5IGhhcyBzcGVjaWFsIG1lYW5pbmcgdG8gQW5ndWxhciBhbmQgbmVlZHMgdG8gYmVcbiAgICogaW5qZWN0ZWQgc3BlY2lhbGx5LlxuICAgKi9cbiAgcmVzb2x2ZWQ6IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQEhvc3QgcXVhbGlmaWVyLlxuICAgKi9cbiAgaG9zdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQE9wdGlvbmFsIHF1YWxpZmllci5cbiAgICovXG4gIG9wdGlvbmFsOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBAU2VsZiBxdWFsaWZpZXIuXG4gICAqL1xuICBzZWxmOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBAU2tpcFNlbGYgcXVhbGlmaWVyLlxuICAgKi9cbiAgc2tpcFNlbGY6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNGYWN0b3J5Rm4ge1xuICBmYWN0b3J5OiBvLkV4cHJlc3Npb247XG4gIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W107XG4gIHR5cGU6IG8uRXhwcmVzc2lvblR5cGU7XG59XG5cbi8qKlxuICogQ29uc3RydWN0IGEgZmFjdG9yeSBmdW5jdGlvbiBleHByZXNzaW9uIGZvciB0aGUgZ2l2ZW4gYFIzRmFjdG9yeU1ldGFkYXRhYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24obWV0YTogUjNGYWN0b3J5TWV0YWRhdGEsIGlzUGlwZSA9IGZhbHNlKTogUjNGYWN0b3J5Rm4ge1xuICBjb25zdCB0ID0gby52YXJpYWJsZSgndCcpO1xuICBjb25zdCBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdID0gW107XG5cbiAgLy8gVGhlIHR5cGUgdG8gaW5zdGFudGlhdGUgdmlhIGNvbnN0cnVjdG9yIGludm9jYXRpb24uIElmIHRoZXJlIGlzIG5vIGRlbGVnYXRlZCBmYWN0b3J5LCBtZWFuaW5nXG4gIC8vIHRoaXMgdHlwZSBpcyBhbHdheXMgY3JlYXRlZCBieSBjb25zdHJ1Y3RvciBpbnZvY2F0aW9uLCB0aGVuIHRoaXMgaXMgdGhlIHR5cGUtdG8tY3JlYXRlXG4gIC8vIHBhcmFtZXRlciBwcm92aWRlZCBieSB0aGUgdXNlciAodCkgaWYgc3BlY2lmaWVkLCBvciB0aGUgY3VycmVudCB0eXBlIGlmIG5vdC4gSWYgdGhlcmUgaXMgYVxuICAvLyBkZWxlZ2F0ZWQgZmFjdG9yeSAod2hpY2ggaXMgdXNlZCB0byBjcmVhdGUgdGhlIGN1cnJlbnQgdHlwZSkgdGhlbiB0aGlzIGlzIG9ubHkgdGhlIHR5cGUtdG8tXG4gIC8vIGNyZWF0ZSBwYXJhbWV0ZXIgKHQpLlxuICBjb25zdCB0eXBlRm9yQ3RvciA9XG4gICAgICAhaXNEZWxlZ2F0ZWRNZXRhZGF0YShtZXRhKSA/IG5ldyBvLkJpbmFyeU9wZXJhdG9yRXhwcihvLkJpbmFyeU9wZXJhdG9yLk9yLCB0LCBtZXRhLnR5cGUpIDogdDtcblxuICBsZXQgY3RvckV4cHI6IG8uRXhwcmVzc2lvbnxudWxsID0gbnVsbDtcbiAgaWYgKG1ldGEuZGVwcyAhPT0gbnVsbCkge1xuICAgIC8vIFRoZXJlIGlzIGEgY29uc3RydWN0b3IgKGVpdGhlciBleHBsaWNpdGx5IG9yIGltcGxpY2l0bHkgZGVmaW5lZCkuXG4gICAgaWYgKG1ldGEuZGVwcyAhPT0gJ2ludmFsaWQnKSB7XG4gICAgICBjdG9yRXhwciA9XG4gICAgICAgICAgbmV3IG8uSW5zdGFudGlhdGVFeHByKHR5cGVGb3JDdG9yLCBpbmplY3REZXBlbmRlbmNpZXMobWV0YS5kZXBzLCBtZXRhLmluamVjdEZuLCBpc1BpcGUpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYmFzZUZhY3RvcnkgPSBvLnZhcmlhYmxlKGDJtSR7bWV0YS5uYW1lfV9CYXNlRmFjdG9yeWApO1xuICAgIGNvbnN0IGdldEluaGVyaXRlZEZhY3RvcnkgPSBvLmltcG9ydEV4cHIoUjMuZ2V0SW5oZXJpdGVkRmFjdG9yeSk7XG4gICAgY29uc3QgYmFzZUZhY3RvcnlTdG10ID1cbiAgICAgICAgYmFzZUZhY3Rvcnkuc2V0KGdldEluaGVyaXRlZEZhY3RvcnkuY2FsbEZuKFttZXRhLnR5cGVdKSkudG9EZWNsU3RtdChvLklORkVSUkVEX1RZUEUsIFtcbiAgICAgICAgICBvLlN0bXRNb2RpZmllci5FeHBvcnRlZCwgby5TdG10TW9kaWZpZXIuRmluYWxcbiAgICAgICAgXSk7XG4gICAgc3RhdGVtZW50cy5wdXNoKGJhc2VGYWN0b3J5U3RtdCk7XG5cbiAgICAvLyBUaGVyZSBpcyBubyBjb25zdHJ1Y3RvciwgdXNlIHRoZSBiYXNlIGNsYXNzJyBmYWN0b3J5IHRvIGNvbnN0cnVjdCB0eXBlRm9yQ3Rvci5cbiAgICBjdG9yRXhwciA9IGJhc2VGYWN0b3J5LmNhbGxGbihbdHlwZUZvckN0b3JdKTtcbiAgfVxuICBjb25zdCBjdG9yRXhwckZpbmFsID0gY3RvckV4cHI7XG5cbiAgY29uc3QgYm9keTogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBsZXQgcmV0RXhwcjogby5FeHByZXNzaW9ufG51bGwgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG1ha2VDb25kaXRpb25hbEZhY3Rvcnkobm9uQ3RvckV4cHI6IG8uRXhwcmVzc2lvbik6IG8uUmVhZFZhckV4cHIge1xuICAgIGNvbnN0IHIgPSBvLnZhcmlhYmxlKCdyJyk7XG4gICAgYm9keS5wdXNoKHIuc2V0KG8uTlVMTF9FWFBSKS50b0RlY2xTdG10KCkpO1xuICAgIGxldCBjdG9yU3RtdDogby5TdGF0ZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgaWYgKGN0b3JFeHByRmluYWwgIT09IG51bGwpIHtcbiAgICAgIGN0b3JTdG10ID0gci5zZXQoY3RvckV4cHJGaW5hbCkudG9TdG10KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0b3JTdG10ID0gbWFrZUVycm9yU3RtdChtZXRhLm5hbWUpO1xuICAgIH1cbiAgICBib2R5LnB1c2goby5pZlN0bXQodCwgW2N0b3JTdG10XSwgW3Iuc2V0KG5vbkN0b3JFeHByKS50b1N0bXQoKV0pKTtcbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIGlmIChpc0RlbGVnYXRlZE1ldGFkYXRhKG1ldGEpICYmIG1ldGEuZGVsZWdhdGVUeXBlID09PSBSM0ZhY3RvcnlEZWxlZ2F0ZVR5cGUuRmFjdG9yeSkge1xuICAgIGNvbnN0IGRlbGVnYXRlRmFjdG9yeSA9IG8udmFyaWFibGUoYMm1JHttZXRhLm5hbWV9X0Jhc2VGYWN0b3J5YCk7XG4gICAgY29uc3QgZ2V0RmFjdG9yeU9mID0gby5pbXBvcnRFeHByKFIzLmdldEZhY3RvcnlPZik7XG4gICAgaWYgKG1ldGEuZGVsZWdhdGUuaXNFcXVpdmFsZW50KG1ldGEudHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBzdGF0ZTogY29tcGlsaW5nIGZhY3RvcnkgdGhhdCBkZWxlZ2F0ZXMgdG8gaXRzZWxmYCk7XG4gICAgfVxuICAgIGNvbnN0IGRlbGVnYXRlRmFjdG9yeVN0bXQgPVxuICAgICAgICBkZWxlZ2F0ZUZhY3Rvcnkuc2V0KGdldEZhY3RvcnlPZi5jYWxsRm4oW21ldGEuZGVsZWdhdGVdKSkudG9EZWNsU3RtdChvLklORkVSUkVEX1RZUEUsIFtcbiAgICAgICAgICBvLlN0bXRNb2RpZmllci5FeHBvcnRlZCwgby5TdG10TW9kaWZpZXIuRmluYWxcbiAgICAgICAgXSk7XG5cbiAgICBzdGF0ZW1lbnRzLnB1c2goZGVsZWdhdGVGYWN0b3J5U3RtdCk7XG4gICAgcmV0RXhwciA9IG1ha2VDb25kaXRpb25hbEZhY3RvcnkoZGVsZWdhdGVGYWN0b3J5LmNhbGxGbihbXSkpO1xuICB9IGVsc2UgaWYgKGlzRGVsZWdhdGVkTWV0YWRhdGEobWV0YSkpIHtcbiAgICAvLyBUaGlzIHR5cGUgaXMgY3JlYXRlZCB3aXRoIGEgZGVsZWdhdGVkIGZhY3RvcnkuIElmIGEgdHlwZSBwYXJhbWV0ZXIgaXMgbm90IHNwZWNpZmllZCwgY2FsbFxuICAgIC8vIHRoZSBmYWN0b3J5IGluc3RlYWQuXG4gICAgY29uc3QgZGVsZWdhdGVBcmdzID0gaW5qZWN0RGVwZW5kZW5jaWVzKG1ldGEuZGVsZWdhdGVEZXBzLCBtZXRhLmluamVjdEZuLCBpc1BpcGUpO1xuICAgIC8vIEVpdGhlciBjYWxsIGBuZXcgZGVsZWdhdGUoLi4uKWAgb3IgYGRlbGVnYXRlKC4uLilgIGRlcGVuZGluZyBvbiBtZXRhLnVzZU5ld0ZvckRlbGVnYXRlLlxuICAgIGNvbnN0IGZhY3RvcnlFeHByID0gbmV3IChcbiAgICAgICAgbWV0YS5kZWxlZ2F0ZVR5cGUgPT09IFIzRmFjdG9yeURlbGVnYXRlVHlwZS5DbGFzcyA/XG4gICAgICAgICAgICBvLkluc3RhbnRpYXRlRXhwciA6XG4gICAgICAgICAgICBvLkludm9rZUZ1bmN0aW9uRXhwcikobWV0YS5kZWxlZ2F0ZSwgZGVsZWdhdGVBcmdzKTtcbiAgICByZXRFeHByID0gbWFrZUNvbmRpdGlvbmFsRmFjdG9yeShmYWN0b3J5RXhwcik7XG4gIH0gZWxzZSBpZiAoaXNFeHByZXNzaW9uRmFjdG9yeU1ldGFkYXRhKG1ldGEpKSB7XG4gICAgLy8gVE9ETyhhbHhodWIpOiBkZWNpZGUgd2hldGhlciB0byBsb3dlciB0aGUgdmFsdWUgaGVyZSBvciBpbiB0aGUgY2FsbGVyXG4gICAgcmV0RXhwciA9IG1ha2VDb25kaXRpb25hbEZhY3RvcnkobWV0YS5leHByZXNzaW9uKTtcbiAgfSBlbHNlIHtcbiAgICByZXRFeHByID0gY3RvckV4cHI7XG4gIH1cblxuICBpZiAocmV0RXhwciAhPT0gbnVsbCkge1xuICAgIGJvZHkucHVzaChuZXcgby5SZXR1cm5TdGF0ZW1lbnQocmV0RXhwcikpO1xuICB9IGVsc2Uge1xuICAgIGJvZHkucHVzaChtYWtlRXJyb3JTdG10KG1ldGEubmFtZSkpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmYWN0b3J5OiBvLmZuKFxuICAgICAgICBbbmV3IG8uRm5QYXJhbSgndCcsIG8uRFlOQU1JQ19UWVBFKV0sIGJvZHksIG8uSU5GRVJSRURfVFlQRSwgdW5kZWZpbmVkLFxuICAgICAgICBgJHttZXRhLm5hbWV9X0ZhY3RvcnlgKSxcbiAgICBzdGF0ZW1lbnRzLFxuICAgIHR5cGU6IG8uZXhwcmVzc2lvblR5cGUoXG4gICAgICAgIG8uaW1wb3J0RXhwcihSMy5GYWN0b3J5RGVmLCBbdHlwZVdpdGhQYXJhbWV0ZXJzKG1ldGEudHlwZSwgbWV0YS50eXBlQXJndW1lbnRDb3VudCldKSlcbiAgfTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIHRoZSBgbmdGYWN0b3J5RGVmYCBmcm9tIGRpcmVjdGl2ZS9jb21wb25lbnQvcGlwZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVGYWN0b3J5RnJvbU1ldGFkYXRhKG1ldGE6IFIzRmFjdG9yeURlZk1ldGFkYXRhKTogUjNGYWN0b3J5Rm4ge1xuICByZXR1cm4gY29tcGlsZUZhY3RvcnlGdW5jdGlvbihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogbWV0YS5uYW1lLFxuICAgICAgICB0eXBlOiBtZXRhLnR5cGUsXG4gICAgICAgIGRlcHM6IG1ldGEuZGVwcyxcbiAgICAgICAgdHlwZUFyZ3VtZW50Q291bnQ6IG1ldGEudHlwZUFyZ3VtZW50Q291bnQsXG4gICAgICAgIGluamVjdEZuOiBtZXRhLmluamVjdEZuLFxuICAgICAgfSxcbiAgICAgIG1ldGEuaXNQaXBlKTtcbn1cblxuZnVuY3Rpb24gaW5qZWN0RGVwZW5kZW5jaWVzKFxuICAgIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW10sIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlLCBpc1BpcGU6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb25bXSB7XG4gIHJldHVybiBkZXBzLm1hcChkZXAgPT4gY29tcGlsZUluamVjdERlcGVuZGVuY3koZGVwLCBpbmplY3RGbiwgaXNQaXBlKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVJbmplY3REZXBlbmRlbmN5KFxuICAgIGRlcDogUjNEZXBlbmRlbmN5TWV0YWRhdGEsIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlLCBpc1BpcGU6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICAvLyBJbnRlcnByZXQgdGhlIGRlcGVuZGVuY3kgYWNjb3JkaW5nIHRvIGl0cyByZXNvbHZlZCB0eXBlLlxuICBzd2l0Y2ggKGRlcC5yZXNvbHZlZCkge1xuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlRva2VuOlxuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkNoYW5nZURldGVjdG9yUmVmOlxuICAgICAgLy8gQnVpbGQgdXAgdGhlIGluamVjdGlvbiBmbGFncyBhY2NvcmRpbmcgdG8gdGhlIG1ldGFkYXRhLlxuICAgICAgY29uc3QgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0IHwgKGRlcC5zZWxmID8gSW5qZWN0RmxhZ3MuU2VsZiA6IDApIHxcbiAgICAgICAgICAoZGVwLnNraXBTZWxmID8gSW5qZWN0RmxhZ3MuU2tpcFNlbGYgOiAwKSB8IChkZXAuaG9zdCA/IEluamVjdEZsYWdzLkhvc3QgOiAwKSB8XG4gICAgICAgICAgKGRlcC5vcHRpb25hbCA/IEluamVjdEZsYWdzLk9wdGlvbmFsIDogMCk7XG5cbiAgICAgIC8vIElmIHRoaXMgZGVwZW5kZW5jeSBpcyBvcHRpb25hbCBvciBvdGhlcndpc2UgaGFzIG5vbi1kZWZhdWx0IGZsYWdzLCB0aGVuIGFkZGl0aW9uYWxcbiAgICAgIC8vIHBhcmFtZXRlcnMgZGVzY3JpYmluZyBob3cgdG8gaW5qZWN0IHRoZSBkZXBlbmRlbmN5IG11c3QgYmUgcGFzc2VkIHRvIHRoZSBpbmplY3QgZnVuY3Rpb25cbiAgICAgIC8vIHRoYXQncyBiZWluZyB1c2VkLlxuICAgICAgbGV0IGZsYWdzUGFyYW06IG8uTGl0ZXJhbEV4cHJ8bnVsbCA9XG4gICAgICAgICAgKGZsYWdzICE9PSBJbmplY3RGbGFncy5EZWZhdWx0IHx8IGRlcC5vcHRpb25hbCkgPyBvLmxpdGVyYWwoZmxhZ3MpIDogbnVsbDtcblxuICAgICAgLy8gV2UgaGF2ZSBhIHNlcGFyYXRlIGluc3RydWN0aW9uIGZvciBpbmplY3RpbmcgQ2hhbmdlRGV0ZWN0b3JSZWYgaW50byBhIHBpcGUuXG4gICAgICBpZiAoaXNQaXBlICYmIGRlcC5yZXNvbHZlZCA9PT0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkNoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW5qZWN0UGlwZUNoYW5nZURldGVjdG9yUmVmKS5jYWxsRm4oZmxhZ3NQYXJhbSA/IFtmbGFnc1BhcmFtXSA6IFtdKTtcbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgdXAgdGhlIGFyZ3VtZW50cyB0byB0aGUgaW5qZWN0Rm4gY2FsbC5cbiAgICAgIGNvbnN0IGluamVjdEFyZ3MgPSBbZGVwLnRva2VuXTtcbiAgICAgIGlmIChmbGFnc1BhcmFtKSB7XG4gICAgICAgIGluamVjdEFyZ3MucHVzaChmbGFnc1BhcmFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoaW5qZWN0Rm4pLmNhbGxGbihpbmplY3RBcmdzKTtcbiAgICBjYXNlIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5BdHRyaWJ1dGU6XG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBhdHRyaWJ1dGVzLCB0aGUgYXR0cmlidXRlIG5hbWUgaW4gcXVlc3Rpb24gaXMgZ2l2ZW4gYXMgdGhlIHRva2VuLlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbmplY3RBdHRyaWJ1dGUpLmNhbGxGbihbZGVwLnRva2VuXSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bnN1cHBvcnRlZChcbiAgICAgICAgICBgVW5rbm93biBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGU6ICR7UjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlW2RlcC5yZXNvbHZlZF19YCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGhlbHBlciBmdW5jdGlvbiB1c2VmdWwgZm9yIGV4dHJhY3RpbmcgYFIzRGVwZW5kZW5jeU1ldGFkYXRhYCBmcm9tIGEgUmVuZGVyMlxuICogYENvbXBpbGVUeXBlTWV0YWRhdGFgIGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVwZW5kZW5jaWVzRnJvbUdsb2JhbE1ldGFkYXRhKFxuICAgIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCxcbiAgICByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IpOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdIHtcbiAgLy8gVXNlIHRoZSBgQ29tcGlsZVJlZmxlY3RvcmAgdG8gbG9vayB1cCByZWZlcmVuY2VzIHRvIHNvbWUgd2VsbC1rbm93biBBbmd1bGFyIHR5cGVzLiBUaGVzZSB3aWxsXG4gIC8vIGJlIGNvbXBhcmVkIHdpdGggdGhlIHRva2VuIHRvIHN0YXRpY2FsbHkgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHRva2VuIGhhcyBzaWduaWZpY2FuY2UgdG9cbiAgLy8gQW5ndWxhciwgYW5kIHNldCB0aGUgY29ycmVjdCBgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlYCBhcyBhIHJlc3VsdC5cbiAgY29uc3QgaW5qZWN0b3JSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkluamVjdG9yKTtcblxuICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHR5cGUncyBESSBkZXBlbmRlbmNpZXMgYW5kIHByb2R1Y2UgYFIzRGVwZW5kZW5jeU1ldGFkYXRhYCBmb3IgZWFjaCBvZiB0aGVtLlxuICBjb25zdCBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdID0gW107XG4gIGZvciAobGV0IGRlcGVuZGVuY3kgb2YgdHlwZS5kaURlcHMpIHtcbiAgICBpZiAoZGVwZW5kZW5jeS50b2tlbikge1xuICAgICAgY29uc3QgdG9rZW5SZWYgPSB0b2tlblJlZmVyZW5jZShkZXBlbmRlbmN5LnRva2VuKTtcbiAgICAgIGxldCByZXNvbHZlZDogUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlID0gZGVwZW5kZW5jeS5pc0F0dHJpYnV0ZSA/XG4gICAgICAgICAgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkF0dHJpYnV0ZSA6XG4gICAgICAgICAgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlRva2VuO1xuXG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBtb3N0IGRlcGVuZGVuY2llcywgdGhlIHRva2VuIHdpbGwgYmUgYSByZWZlcmVuY2UgdG8gYSB0eXBlLiBTb21ldGltZXMsXG4gICAgICAvLyBob3dldmVyLCBpdCBjYW4gYmUgYSBzdHJpbmcsIGluIHRoZSBjYXNlIG9mIG9sZGVyIEFuZ3VsYXIgY29kZSBvciBAQXR0cmlidXRlIGluamVjdGlvbi5cbiAgICAgIGNvbnN0IHRva2VuID1cbiAgICAgICAgICB0b2tlblJlZiBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCA/IG91dHB1dEN0eC5pbXBvcnRFeHByKHRva2VuUmVmKSA6IG8ubGl0ZXJhbCh0b2tlblJlZik7XG5cbiAgICAgIC8vIENvbnN0cnVjdCB0aGUgZGVwZW5kZW5jeS5cbiAgICAgIGRlcHMucHVzaCh7XG4gICAgICAgIHRva2VuLFxuICAgICAgICByZXNvbHZlZCxcbiAgICAgICAgaG9zdDogISFkZXBlbmRlbmN5LmlzSG9zdCxcbiAgICAgICAgb3B0aW9uYWw6ICEhZGVwZW5kZW5jeS5pc09wdGlvbmFsLFxuICAgICAgICBzZWxmOiAhIWRlcGVuZGVuY3kuaXNTZWxmLFxuICAgICAgICBza2lwU2VsZjogISFkZXBlbmRlbmN5LmlzU2tpcFNlbGYsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdW5zdXBwb3J0ZWQoJ2RlcGVuZGVuY3kgd2l0aG91dCBhIHRva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlcHM7XG59XG5cbmZ1bmN0aW9uIG1ha2VFcnJvclN0bXQobmFtZTogc3RyaW5nKTogby5TdGF0ZW1lbnQge1xuICByZXR1cm4gbmV3IG8uVGhyb3dTdG10KG5ldyBvLkluc3RhbnRpYXRlRXhwcihuZXcgby5SZWFkVmFyRXhwcignRXJyb3InKSwgW1xuICAgIG8ubGl0ZXJhbChcbiAgICAgICAgYCR7bmFtZX0gaGFzIGEgY29uc3RydWN0b3Igd2hpY2ggaXMgbm90IGNvbXBhdGlibGUgd2l0aCBEZXBlbmRlbmN5IEluamVjdGlvbi4gSXQgc2hvdWxkIHByb2JhYmx5IG5vdCBiZSBASW5qZWN0YWJsZSgpLmApXG4gIF0pKTtcbn1cblxuZnVuY3Rpb24gaXNEZWxlZ2F0ZWRNZXRhZGF0YShtZXRhOiBSM0ZhY3RvcnlNZXRhZGF0YSk6IG1ldGEgaXMgUjNEZWxlZ2F0ZWRGYWN0b3J5TWV0YWRhdGF8XG4gICAgUjNEZWxlZ2F0ZWRGbk9yQ2xhc3NNZXRhZGF0YSB7XG4gIHJldHVybiAobWV0YSBhcyBhbnkpLmRlbGVnYXRlVHlwZSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0V4cHJlc3Npb25GYWN0b3J5TWV0YWRhdGEobWV0YTogUjNGYWN0b3J5TWV0YWRhdGEpOiBtZXRhIGlzIFIzRXhwcmVzc2lvbkZhY3RvcnlNZXRhZGF0YSB7XG4gIHJldHVybiAobWV0YSBhcyBhbnkpLmV4cHJlc3Npb24gIT09IHVuZGVmaW5lZDtcbn1cbiJdfQ==