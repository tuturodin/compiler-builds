/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class ParserError {
    constructor(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
    }
}
export class ParseSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    toAbsolute(absoluteOffset) {
        return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
    }
}
export class AST {
    constructor(span, 
    /**
     * Absolute location of the expression AST in a source code file.
     */
    sourceSpan) {
        this.span = span;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context = null) {
        return null;
    }
    toString() {
        return 'AST';
    }
}
export class ASTWithName extends AST {
    constructor(span, sourceSpan, nameSpan) {
        super(span, sourceSpan);
        this.nameSpan = nameSpan;
    }
}
/**
 * Represents a quoted expression of the form:
 *
 * quote = prefix `:` uninterpretedExpression
 * prefix = identifier
 * uninterpretedExpression = arbitrary string
 *
 * A quoted expression is meant to be pre-processed by an AST transformer that
 * converts it into another AST that no longer contains quoted expressions.
 * It is meant to allow third-party developers to extend Angular template
 * expression language. The `uninterpretedExpression` part of the quote is
 * therefore not interpreted by the Angular's own expression parser.
 */
export class Quote extends AST {
    constructor(span, sourceSpan, prefix, uninterpretedExpression, location) {
        super(span, sourceSpan);
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
    }
    visit(visitor, context = null) {
        return visitor.visitQuote(this, context);
    }
    toString() {
        return 'Quote';
    }
}
export class EmptyExpr extends AST {
    visit(visitor, context = null) {
        // do nothing
    }
}
export class ImplicitReceiver extends AST {
    visit(visitor, context = null) {
        return visitor.visitImplicitReceiver(this, context);
    }
}
/**
 * Receiver when something is accessed through `this` (e.g. `this.foo`). Note that this class
 * inherits from `ImplicitReceiver`, because accessing something through `this` is treated the
 * same as accessing it implicitly inside of an Angular template (e.g. `[attr.title]="this.title"`
 * is the same as `[attr.title]="title"`.). Inheriting allows for the `this` accesses to be treated
 * the same as implicit ones, except for a couple of exceptions like `$event` and `$any`.
 * TODO: we should find a way for this class not to extend from `ImplicitReceiver` in the future.
 */
export class ThisReceiver extends ImplicitReceiver {
    visit(visitor, context = null) {
        var _a;
        return (_a = visitor.visitThisReceiver) === null || _a === void 0 ? void 0 : _a.call(visitor, this, context);
    }
}
/**
 * Multiple expressions separated by a semicolon.
 */
export class Chain extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitChain(this, context);
    }
}
export class Conditional extends AST {
    constructor(span, sourceSpan, condition, trueExp, falseExp) {
        super(span, sourceSpan);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    visit(visitor, context = null) {
        return visitor.visitConditional(this, context);
    }
}
export class PropertyRead extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyRead(this, context);
    }
}
export class PropertyWrite extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name, value) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyWrite(this, context);
    }
}
export class SafePropertyRead extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitSafePropertyRead(this, context);
    }
}
export class KeyedRead extends AST {
    constructor(span, sourceSpan, obj, key) {
        super(span, sourceSpan);
        this.obj = obj;
        this.key = key;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedRead(this, context);
    }
}
export class KeyedWrite extends AST {
    constructor(span, sourceSpan, obj, key, value) {
        super(span, sourceSpan);
        this.obj = obj;
        this.key = key;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedWrite(this, context);
    }
}
export class BindingPipe extends ASTWithName {
    constructor(span, sourceSpan, exp, name, args, nameSpan) {
        super(span, sourceSpan, nameSpan);
        this.exp = exp;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitPipe(this, context);
    }
}
export class LiteralPrimitive extends AST {
    constructor(span, sourceSpan, value) {
        super(span, sourceSpan);
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralPrimitive(this, context);
    }
}
export class LiteralArray extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralArray(this, context);
    }
}
export class LiteralMap extends AST {
    constructor(span, sourceSpan, keys, values) {
        super(span, sourceSpan);
        this.keys = keys;
        this.values = values;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralMap(this, context);
    }
}
export class Interpolation extends AST {
    constructor(span, sourceSpan, strings, expressions) {
        super(span, sourceSpan);
        this.strings = strings;
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitInterpolation(this, context);
    }
}
export class Binary extends AST {
    constructor(span, sourceSpan, operation, left, right) {
        super(span, sourceSpan);
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    visit(visitor, context = null) {
        return visitor.visitBinary(this, context);
    }
}
/**
 * For backwards compatibility reasons, `Unary` inherits from `Binary` and mimics the binary AST
 * node that was originally used. This inheritance relation can be deleted in some future major,
 * after consumers have been given a chance to fully support Unary.
 */
export class Unary extends Binary {
    /**
     * During the deprecation period this constructor is private, to avoid consumers from creating
     * a `Unary` with the fallback properties for `Binary`.
     */
    constructor(span, sourceSpan, operator, expr, binaryOp, binaryLeft, binaryRight) {
        super(span, sourceSpan, binaryOp, binaryLeft, binaryRight);
        this.operator = operator;
        this.expr = expr;
    }
    /**
     * Creates a unary minus expression "-x", represented as `Binary` using "0 - x".
     */
    static createMinus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, '-', expr, '-', new LiteralPrimitive(span, sourceSpan, 0), expr);
    }
    /**
     * Creates a unary plus expression "+x", represented as `Binary` using "x - 0".
     */
    static createPlus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, '+', expr, '-', expr, new LiteralPrimitive(span, sourceSpan, 0));
    }
    visit(visitor, context = null) {
        if (visitor.visitUnary !== undefined) {
            return visitor.visitUnary(this, context);
        }
        return visitor.visitBinary(this, context);
    }
}
export class PrefixNot extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitPrefixNot(this, context);
    }
}
export class NonNullAssert extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitNonNullAssert(this, context);
    }
}
export class MethodCall extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name, args) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitMethodCall(this, context);
    }
}
export class SafeMethodCall extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name, args) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitSafeMethodCall(this, context);
    }
}
export class FunctionCall extends AST {
    constructor(span, sourceSpan, target, args) {
        super(span, sourceSpan);
        this.target = target;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitFunctionCall(this, context);
    }
}
/**
 * Records the absolute position of a text span in a source file, where `start` and `end` are the
 * starting and ending byte offsets, respectively, of the text span in a source file.
 */
export class AbsoluteSourceSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
export class ASTWithSource extends AST {
    constructor(ast, source, location, absoluteOffset, errors) {
        super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
    }
    visit(visitor, context = null) {
        if (visitor.visitASTWithSource) {
            return visitor.visitASTWithSource(this, context);
        }
        return this.ast.visit(visitor, context);
    }
    toString() {
        return `${this.source} in ${this.location}`;
    }
}
export class VariableBinding {
    /**
     * @param sourceSpan entire span of the binding.
     * @param key name of the LHS along with its span.
     * @param value optional value for the RHS along with its span.
     */
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
export class ExpressionBinding {
    /**
     * @param sourceSpan entire span of the binding.
     * @param key binding name, like ngForOf, ngForTrackBy, ngIf, along with its
     * span. Note that the length of the span may not be the same as
     * `key.source.length`. For example,
     * 1. key.source = ngFor, key.span is for "ngFor"
     * 2. key.source = ngForOf, key.span is for "of"
     * 3. key.source = ngForTrackBy, key.span is for "trackBy"
     * @param value optional expression for the RHS.
     */
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
export class RecursiveAstVisitor {
    visit(ast, context) {
        // The default implementation just visits every node.
        // Classes that extend RecursiveAstVisitor should override this function
        // to selectively visit the specified node.
        ast.visit(this, context);
    }
    visitUnary(ast, context) {
        this.visit(ast.expr, context);
    }
    visitBinary(ast, context) {
        this.visit(ast.left, context);
        this.visit(ast.right, context);
    }
    visitChain(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitConditional(ast, context) {
        this.visit(ast.condition, context);
        this.visit(ast.trueExp, context);
        this.visit(ast.falseExp, context);
    }
    visitPipe(ast, context) {
        this.visit(ast.exp, context);
        this.visitAll(ast.args, context);
    }
    visitFunctionCall(ast, context) {
        if (ast.target) {
            this.visit(ast.target, context);
        }
        this.visitAll(ast.args, context);
    }
    visitImplicitReceiver(ast, context) { }
    visitThisReceiver(ast, context) { }
    visitInterpolation(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitKeyedRead(ast, context) {
        this.visit(ast.obj, context);
        this.visit(ast.key, context);
    }
    visitKeyedWrite(ast, context) {
        this.visit(ast.obj, context);
        this.visit(ast.key, context);
        this.visit(ast.value, context);
    }
    visitLiteralArray(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitLiteralMap(ast, context) {
        this.visitAll(ast.values, context);
    }
    visitLiteralPrimitive(ast, context) { }
    visitMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitPrefixNot(ast, context) {
        this.visit(ast.expression, context);
    }
    visitNonNullAssert(ast, context) {
        this.visit(ast.expression, context);
    }
    visitPropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitPropertyWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.value, context);
    }
    visitSafePropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitSafeMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitQuote(ast, context) { }
    // This is not part of the AstVisitor interface, just a helper method
    visitAll(asts, context) {
        for (const ast of asts) {
            this.visit(ast, context);
        }
    }
}
export class AstTransformer {
    visitImplicitReceiver(ast, context) {
        return ast;
    }
    visitThisReceiver(ast, context) {
        return ast;
    }
    visitInterpolation(ast, context) {
        return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
    }
    visitLiteralPrimitive(ast, context) {
        return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
    }
    visitPropertyRead(ast, context) {
        return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
    }
    visitPropertyWrite(ast, context) {
        return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
    }
    visitSafePropertyRead(ast, context) {
        return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
    }
    visitMethodCall(ast, context) {
        return new MethodCall(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitSafeMethodCall(ast, context) {
        return new SafeMethodCall(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitFunctionCall(ast, context) {
        return new FunctionCall(ast.span, ast.sourceSpan, ast.target.visit(this), this.visitAll(ast.args));
    }
    visitLiteralArray(ast, context) {
        return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
    }
    visitLiteralMap(ast, context) {
        return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
    }
    visitUnary(ast, context) {
        switch (ast.operator) {
            case '+':
                return Unary.createPlus(ast.span, ast.sourceSpan, ast.expr.visit(this));
            case '-':
                return Unary.createMinus(ast.span, ast.sourceSpan, ast.expr.visit(this));
            default:
                throw new Error(`Unknown unary operator ${ast.operator}`);
        }
    }
    visitBinary(ast, context) {
        return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
    }
    visitPrefixNot(ast, context) {
        return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
    }
    visitNonNullAssert(ast, context) {
        return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
    }
    visitConditional(ast, context) {
        return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    }
    visitPipe(ast, context) {
        return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
    }
    visitKeyedRead(ast, context) {
        return new KeyedRead(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this));
    }
    visitKeyedWrite(ast, context) {
        return new KeyedWrite(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
    }
    visitAll(asts) {
        const res = [];
        for (let i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    }
    visitChain(ast, context) {
        return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
    }
    visitQuote(ast, context) {
        return new Quote(ast.span, ast.sourceSpan, ast.prefix, ast.uninterpretedExpression, ast.location);
    }
}
// A transformer that only creates new nodes if the transformer makes a change or
// a change is made a child node.
export class AstMemoryEfficientTransformer {
    visitImplicitReceiver(ast, context) {
        return ast;
    }
    visitThisReceiver(ast, context) {
        return ast;
    }
    visitInterpolation(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions)
            return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
        return ast;
    }
    visitLiteralPrimitive(ast, context) {
        return ast;
    }
    visitPropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
            return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
        }
        return ast;
    }
    visitPropertyWrite(ast, context) {
        const receiver = ast.receiver.visit(this);
        const value = ast.value.visit(this);
        if (receiver !== ast.receiver || value !== ast.value) {
            return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, value);
        }
        return ast;
    }
    visitSafePropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
            return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
        }
        return ast;
    }
    visitMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
            return new MethodCall(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, args);
        }
        return ast;
    }
    visitSafeMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
            return new SafeMethodCall(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, args);
        }
        return ast;
    }
    visitFunctionCall(ast, context) {
        const target = ast.target && ast.target.visit(this);
        const args = this.visitAll(ast.args);
        if (target !== ast.target || args !== ast.args) {
            return new FunctionCall(ast.span, ast.sourceSpan, target, args);
        }
        return ast;
    }
    visitLiteralArray(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
            return new LiteralArray(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
    }
    visitLiteralMap(ast, context) {
        const values = this.visitAll(ast.values);
        if (values !== ast.values) {
            return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
        }
        return ast;
    }
    visitUnary(ast, context) {
        const expr = ast.expr.visit(this);
        if (expr !== ast.expr) {
            switch (ast.operator) {
                case '+':
                    return Unary.createPlus(ast.span, ast.sourceSpan, expr);
                case '-':
                    return Unary.createMinus(ast.span, ast.sourceSpan, expr);
                default:
                    throw new Error(`Unknown unary operator ${ast.operator}`);
            }
        }
        return ast;
    }
    visitBinary(ast, context) {
        const left = ast.left.visit(this);
        const right = ast.right.visit(this);
        if (left !== ast.left || right !== ast.right) {
            return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
        }
        return ast;
    }
    visitPrefixNot(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
            return new PrefixNot(ast.span, ast.sourceSpan, expression);
        }
        return ast;
    }
    visitNonNullAssert(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
            return new NonNullAssert(ast.span, ast.sourceSpan, expression);
        }
        return ast;
    }
    visitConditional(ast, context) {
        const condition = ast.condition.visit(this);
        const trueExp = ast.trueExp.visit(this);
        const falseExp = ast.falseExp.visit(this);
        if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
            return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
        }
        return ast;
    }
    visitPipe(ast, context) {
        const exp = ast.exp.visit(this);
        const args = this.visitAll(ast.args);
        if (exp !== ast.exp || args !== ast.args) {
            return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
        }
        return ast;
    }
    visitKeyedRead(ast, context) {
        const obj = ast.obj.visit(this);
        const key = ast.key.visit(this);
        if (obj !== ast.obj || key !== ast.key) {
            return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
        }
        return ast;
    }
    visitKeyedWrite(ast, context) {
        const obj = ast.obj.visit(this);
        const key = ast.key.visit(this);
        const value = ast.value.visit(this);
        if (obj !== ast.obj || key !== ast.key || value !== ast.value) {
            return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
        }
        return ast;
    }
    visitAll(asts) {
        const res = [];
        let modified = false;
        for (let i = 0; i < asts.length; ++i) {
            const original = asts[i];
            const value = original.visit(this);
            res[i] = value;
            modified = modified || value !== original;
        }
        return modified ? res : asts;
    }
    visitChain(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
            return new Chain(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
    }
    visitQuote(ast, context) {
        return ast;
    }
}
// Bindings
export class ParsedProperty {
    constructor(name, expression, type, 
    // TODO(atscott): `keySpan` should really be required but allows `undefined` so VE does
    // not need to be updated. Make `keySpan` required when VE is removed.
    sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.expression = expression;
        this.type = type;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
        this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
        this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
    }
}
export var ParsedPropertyType;
(function (ParsedPropertyType) {
    ParsedPropertyType[ParsedPropertyType["DEFAULT"] = 0] = "DEFAULT";
    ParsedPropertyType[ParsedPropertyType["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
    ParsedPropertyType[ParsedPropertyType["ANIMATION"] = 2] = "ANIMATION";
})(ParsedPropertyType || (ParsedPropertyType = {}));
export class ParsedEvent {
    // Regular events have a target
    // Animation events have a phase
    constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan) {
        this.name = name;
        this.targetOrPhase = targetOrPhase;
        this.type = type;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
        this.handlerSpan = handlerSpan;
    }
}
/**
 * ParsedVariable represents a variable declaration in a microsyntax expression.
 */
export class ParsedVariable {
    constructor(name, value, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
    }
}
export class BoundElementProperty {
    constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2V4cHJlc3Npb25fcGFyc2VyL2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxNQUFNLE9BQU8sV0FBVztJQUV0QixZQUNJLE9BQWUsRUFBUyxLQUFhLEVBQVMsV0FBbUIsRUFBUyxXQUFpQjtRQUFuRSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBTTtRQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixPQUFPLElBQUksV0FBVyxLQUFLLEtBQUssUUFBUSxXQUFXLEVBQUUsQ0FBQztJQUN4RixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFtQixLQUFhLEVBQVMsR0FBVztRQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7SUFDeEQsVUFBVSxDQUFDLGNBQXNCO1FBQy9CLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxHQUFHO0lBQ2QsWUFDVyxJQUFlO0lBQ3RCOztPQUVHO0lBQ0ksVUFBOEI7UUFKOUIsU0FBSSxHQUFKLElBQUksQ0FBVztRQUlmLGVBQVUsR0FBVixVQUFVLENBQW9CO0lBQUcsQ0FBQztJQUM3QyxLQUFLLENBQUMsT0FBbUIsRUFBRSxVQUFlLElBQUk7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFnQixXQUFZLFNB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QUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckY7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxjQUFjLENBQUMsR0FBYyxFQUFFLE9BQVk7UUFDekMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxPQUFPLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBZSxFQUFFLE9BQVk7UUFDM0MsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRTtZQUM3RCxPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsUUFBUSxDQUFD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Q3JFLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUcsQ0FBQztDQUNwRDtBQWVELE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDVyxJQUFZLEVBQVMsSUFBaUIsRUFBUyxlQUFnQyxFQUMvRSxLQUFvQixFQUFTLElBQWlCLEVBQVMsVUFBMkIsRUFDaEYsT0FBa0MsRUFBUyxTQUFvQztRQUZqRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvRSxVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2hGLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBMkI7SUFBRyxDQUFDO0NBQ2pHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2VjdXJpdHlDb250ZXh0fSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuZXhwb3J0IGNsYXNzIFBhcnNlckVycm9yIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgICBtZXNzYWdlOiBzdHJpbmcsIHB1YmxpYyBpbnB1dDogc3RyaW5nLCBwdWJsaWMgZXJyTG9jYXRpb246IHN0cmluZywgcHVibGljIGN0eExvY2F0aW9uPzogYW55KSB7XG4gICAgdGhpcy5tZXNzYWdlID0gYFBhcnNlciBFcnJvcjogJHttZXNzYWdlfSAke2VyckxvY2F0aW9ufSBbJHtpbnB1dH1dIGluICR7Y3R4TG9jYXRpb259YDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXJ0OiBudW1iZXIsIHB1YmxpYyBlbmQ6IG51bWJlcikge31cbiAgdG9BYnNvbHV0ZShhYnNvbHV0ZU9mZnNldDogbnVtYmVyKTogQWJzb2x1dGVTb3VyY2VTcGFuIHtcbiAgICByZXR1cm4gbmV3IEFic29sdXRlU291cmNlU3BhbihhYnNvbHV0ZU9mZnNldCArIHRoaXMuc3RhcnQsIGFic29sdXRlT2Zmc2V0ICsgdGhpcy5lbmQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzcGFuOiBQYXJzZVNwYW4sXG4gICAgICAvKipcbiAgICAgICAqIEFic29sdXRlIGxvY2F0aW9uIG9mIHRoZSBleHByZXNzaW9uIEFTVCBpbiBhIHNvdXJjZSBjb2RlIGZpbGUuXG4gICAgICAgKi9cbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdBU1QnO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBU1RXaXRoTmFtZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBuYW1lU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcXVvdGVkIGV4cHJlc3Npb24gb2YgdGhlIGZvcm06XG4gKlxuICogcXVvdGUgPSBwcmVmaXggYDpgIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uXG4gKiBwcmVmaXggPSBpZGVudGlmaWVyXG4gKiB1bmludGVycHJldGVkRXhwcmVzc2lvbiA9IGFyYml0cmFyeSBzdHJpbmdcbiAqXG4gKiBBIHF1b3RlZCBleHByZXNzaW9uIGlzIG1lYW50IHRvIGJlIHByZS1wcm9jZXNzZWQgYnkgYW4gQVNUIHRyYW5zZm9ybWVyIHRoYXRcbiAqIGNvbnZlcnRzIGl0IGludG8gYW5vdGhlciBBU1QgdGhhdCBubyBsb25nZXIgY29udGFpbnMgcXVvdGVkIGV4cHJlc3Npb25zLlxuICogSXQgaXMgbWVhbnQgdG8gYWxsb3cgdGhpcmQtcGFydHkgZGV2ZWxvcGVycyB0byBleHRlbmQgQW5ndWxhciB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiBsYW5ndWFnZS4gVGhlIGB1bmludGVycHJldGVkRXhwcmVzc2lvbmAgcGFydCBvZiB0aGUgcXVvdGUgaXNcbiAqIHRoZXJlZm9yZSBub3QgaW50ZXJwcmV0ZWQgYnkgdGhlIEFuZ3VsYXIncyBvd24gZXhwcmVzc2lvbiBwYXJzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdW90ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBwcmVmaXg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB1bmludGVycHJldGVkRXhwcmVzc2lvbjogc3RyaW5nLCBwdWJsaWMgbG9jYXRpb246IGFueSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UXVvdGUodGhpcywgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1F1b3RlJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlFeHByIGV4dGVuZHMgQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW1wbGljaXRSZWNlaXZlciBleHRlbmRzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW1wbGljaXRSZWNlaXZlcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlY2VpdmVyIHdoZW4gc29tZXRoaW5nIGlzIGFjY2Vzc2VkIHRocm91Z2ggYHRoaXNgIChlLmcuIGB0aGlzLmZvb2ApLiBOb3RlIHRoYXQgdGhpcyBjbGFzc1xuICogaW5oZXJpdHMgZnJvbSBgSW1wbGljaXRSZWNlaXZlcmAsIGJlY2F1c2UgYWNjZXNzaW5nIHNvbWV0aGluZyB0aHJvdWdoIGB0aGlzYCBpcyB0cmVhdGVkIHRoZVxuICogc2FtZSBhcyBhY2Nlc3NpbmcgaXQgaW1wbGljaXRseSBpbnNpZGUgb2YgYW4gQW5ndWxhciB0ZW1wbGF0ZSAoZS5nLiBgW2F0dHIudGl0bGVdPVwidGhpcy50aXRsZVwiYFxuICogaXMgdGhlIHNhbWUgYXMgYFthdHRyLnRpdGxlXT1cInRpdGxlXCJgLikuIEluaGVyaXRpbmcgYWxsb3dzIGZvciB0aGUgYHRoaXNgIGFjY2Vzc2VzIHRvIGJlIHRyZWF0ZWRcbiAqIHRoZSBzYW1lIGFzIGltcGxpY2l0IG9uZXMsIGV4Y2VwdCBmb3IgYSBjb3VwbGUgb2YgZXhjZXB0aW9ucyBsaWtlIGAkZXZlbnRgIGFuZCBgJGFueWAuXG4gKiBUT0RPOiB3ZSBzaG91bGQgZmluZCBhIHdheSBmb3IgdGhpcyBjbGFzcyBub3QgdG8gZXh0ZW5kIGZyb20gYEltcGxpY2l0UmVjZWl2ZXJgIGluIHRoZSBmdXR1cmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBUaGlzUmVjZWl2ZXIgZXh0ZW5kcyBJbXBsaWNpdFJlY2VpdmVyIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUaGlzUmVjZWl2ZXI/Lih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIE11bHRpcGxlIGV4cHJlc3Npb25zIHNlcGFyYXRlZCBieSBhIHNlbWljb2xvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYWluIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENoYWluKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBjb25kaXRpb246IEFTVCwgcHVibGljIHRydWVFeHA6IEFTVCxcbiAgICAgIHB1YmxpYyBmYWxzZUV4cDogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDb25kaXRpb25hbCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlSZWFkIGV4dGVuZHMgQVNUV2l0aE5hbWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBuYW1lU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuLCBuYW1lU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRQcm9wZXJ0eVJlYWQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5V3JpdGUgZXh0ZW5kcyBBU1RXaXRoTmFtZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIG5hbWVTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgcmVjZWl2ZXI6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHZhbHVlOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuLCBuYW1lU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRQcm9wZXJ0eVdyaXRlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTYWZlUHJvcGVydHlSZWFkIGV4dGVuZHMgQVNUV2l0aE5hbWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBuYW1lU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuLCBuYW1lU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRTYWZlUHJvcGVydHlSZWFkKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXllZFJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIG9iajogQVNULCBwdWJsaWMga2V5OiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEtleWVkUmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgS2V5ZWRXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBvYmo6IEFTVCwgcHVibGljIGtleTogQVNULFxuICAgICAgcHVibGljIHZhbHVlOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEtleWVkV3JpdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJpbmRpbmdQaXBlIGV4dGVuZHMgQVNUV2l0aE5hbWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgYXJnczogYW55W10sIG5hbWVTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuLCBuYW1lU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRQaXBlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsUHJpbWl0aXZlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyB2YWx1ZTogYW55KSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsUHJpbWl0aXZlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsQXJyYXkgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbEFycmF5KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIExpdGVyYWxNYXBLZXkgPSB7XG4gIGtleTogc3RyaW5nOyBxdW90ZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgTGl0ZXJhbE1hcCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBrZXlzOiBMaXRlcmFsTWFwS2V5W10sXG4gICAgICBwdWJsaWMgdmFsdWVzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbE1hcCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJwb2xhdGlvbiBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBzdHJpbmdzOiBhbnlbXSxcbiAgICAgIHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEludGVycG9sYXRpb24odGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJpbmFyeSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBvcGVyYXRpb246IHN0cmluZywgcHVibGljIGxlZnQ6IEFTVCxcbiAgICAgIHB1YmxpYyByaWdodDogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRCaW5hcnkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29ucywgYFVuYXJ5YCBpbmhlcml0cyBmcm9tIGBCaW5hcnlgIGFuZCBtaW1pY3MgdGhlIGJpbmFyeSBBU1RcbiAqIG5vZGUgdGhhdCB3YXMgb3JpZ2luYWxseSB1c2VkLiBUaGlzIGluaGVyaXRhbmNlIHJlbGF0aW9uIGNhbiBiZSBkZWxldGVkIGluIHNvbWUgZnV0dXJlIG1ham9yLFxuICogYWZ0ZXIgY29uc3VtZXJzIGhhdmUgYmVlbiBnaXZlbiBhIGNoYW5jZSB0byBmdWxseSBzdXBwb3J0IFVuYXJ5LlxuICovXG5leHBvcnQgY2xhc3MgVW5hcnkgZXh0ZW5kcyBCaW5hcnkge1xuICAvLyBSZWRlY2xhcmUgdGhlIHByb3BlcnRpZXMgdGhhdCBhcmUgaW5oZXJpdGVkIGZyb20gYEJpbmFyeWAgYXMgYG5ldmVyYCwgYXMgY29uc3VtZXJzIHNob3VsZCBub3RcbiAgLy8gZGVwZW5kIG9uIHRoZXNlIGZpZWxkcyB3aGVuIG9wZXJhdGluZyBvbiBgVW5hcnlgLlxuICBsZWZ0OiBuZXZlcjtcbiAgcmlnaHQ6IG5ldmVyO1xuICBvcGVyYXRpb246IG5ldmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdW5hcnkgbWludXMgZXhwcmVzc2lvbiBcIi14XCIsIHJlcHJlc2VudGVkIGFzIGBCaW5hcnlgIHVzaW5nIFwiMCAtIHhcIi5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVNaW51cyhzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgZXhwcjogQVNUKTogVW5hcnkge1xuICAgIHJldHVybiBuZXcgVW5hcnkoXG4gICAgICAgIHNwYW4sIHNvdXJjZVNwYW4sICctJywgZXhwciwgJy0nLCBuZXcgTGl0ZXJhbFByaW1pdGl2ZShzcGFuLCBzb3VyY2VTcGFuLCAwKSwgZXhwcik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHVuYXJ5IHBsdXMgZXhwcmVzc2lvbiBcIit4XCIsIHJlcHJlc2VudGVkIGFzIGBCaW5hcnlgIHVzaW5nIFwieCAtIDBcIi5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVQbHVzKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBleHByOiBBU1QpOiBVbmFyeSB7XG4gICAgcmV0dXJuIG5ldyBVbmFyeShcbiAgICAgICAgc3Bhbiwgc291cmNlU3BhbiwgJysnLCBleHByLCAnLScsIGV4cHIsIG5ldyBMaXRlcmFsUHJpbWl0aXZlKHNwYW4sIHNvdXJjZVNwYW4sIDApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEdXJpbmcgdGhlIGRlcHJlY2F0aW9uIHBlcmlvZCB0aGlzIGNvbnN0cnVjdG9yIGlzIHByaXZhdGUsIHRvIGF2b2lkIGNvbnN1bWVycyBmcm9tIGNyZWF0aW5nXG4gICAqIGEgYFVuYXJ5YCB3aXRoIHRoZSBmYWxsYmFjayBwcm9wZXJ0aWVzIGZvciBgQmluYXJ5YC5cbiAgICovXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIG9wZXJhdG9yOiBzdHJpbmcsIHB1YmxpYyBleHByOiBBU1QsXG4gICAgICBiaW5hcnlPcDogc3RyaW5nLCBiaW5hcnlMZWZ0OiBBU1QsIGJpbmFyeVJpZ2h0OiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuLCBiaW5hcnlPcCwgYmluYXJ5TGVmdCwgYmluYXJ5UmlnaHQpO1xuICB9XG5cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgaWYgKHZpc2l0b3IudmlzaXRVbmFyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdFVuYXJ5KHRoaXMsIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEJpbmFyeSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZml4Tm90IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByZWZpeE5vdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9uTnVsbEFzc2VydCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXROb25OdWxsQXNzZXJ0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXRob2RDYWxsIGV4dGVuZHMgQVNUV2l0aE5hbWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBuYW1lU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4sIG5hbWVTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdE1ldGhvZENhbGwodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVNZXRob2RDYWxsIGV4dGVuZHMgQVNUV2l0aE5hbWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBuYW1lU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4sIG5hbWVTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFNhZmVNZXRob2RDYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkNhbGwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgdGFyZ2V0OiBBU1R8bnVsbCxcbiAgICAgIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RnVuY3Rpb25DYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogUmVjb3JkcyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgYSB0ZXh0IHNwYW4gaW4gYSBzb3VyY2UgZmlsZSwgd2hlcmUgYHN0YXJ0YCBhbmQgYGVuZGAgYXJlIHRoZVxuICogc3RhcnRpbmcgYW5kIGVuZGluZyBieXRlIG9mZnNldHMsIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRleHQgc3BhbiBpbiBhIHNvdXJjZSBmaWxlLlxuICovXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVTb3VyY2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHN0YXJ0OiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBlbmQ6IG51bWJlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEFTVFdpdGhTb3VyY2UgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhc3Q6IEFTVCwgcHVibGljIHNvdXJjZTogc3RyaW5nfG51bGwsIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nLCBhYnNvbHV0ZU9mZnNldDogbnVtYmVyLFxuICAgICAgcHVibGljIGVycm9yczogUGFyc2VyRXJyb3JbXSkge1xuICAgIHN1cGVyKFxuICAgICAgICBuZXcgUGFyc2VTcGFuKDAsIHNvdXJjZSA9PT0gbnVsbCA/IDAgOiBzb3VyY2UubGVuZ3RoKSxcbiAgICAgICAgbmV3IEFic29sdXRlU291cmNlU3BhbihcbiAgICAgICAgICAgIGFic29sdXRlT2Zmc2V0LCBzb3VyY2UgPT09IG51bGwgPyBhYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0ICsgc291cmNlLmxlbmd0aCkpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmICh2aXNpdG9yLnZpc2l0QVNUV2l0aFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBU1RXaXRoU291cmNlKHRoaXMsIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hc3QudmlzaXQodmlzaXRvciwgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zb3VyY2V9IGluICR7dGhpcy5sb2NhdGlvbn1gO1xuICB9XG59XG5cbi8qKlxuICogVGVtcGxhdGVCaW5kaW5nIHJlZmVycyB0byBhIHBhcnRpY3VsYXIga2V5LXZhbHVlIHBhaXIgaW4gYSBtaWNyb3N5bnRheFxuICogZXhwcmVzc2lvbi4gQSBmZXcgZXhhbXBsZXMgYXJlOlxuICpcbiAqICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS18XG4gKiAgIHwgICAgIGV4cHJlc3Npb24gICAgICB8ICAgICBrZXkgICAgICB8ICB2YWx1ZSAgfCBiaW5kaW5nIHR5cGUgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqICAgfCAxLiBsZXQgaXRlbSAgICAgICAgIHwgICAgaXRlbSAgICAgIHwgIG51bGwgICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgMi4gb2YgaXRlbXMgICAgICAgICB8ICAgbmdGb3JPZiAgICB8ICBpdGVtcyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDMuIGxldCB4ID0geSAgICAgICAgfCAgICAgIHggICAgICAgfCAgICB5ICAgIHwgICB2YXJpYWJsZSAgIHxcbiAqICAgfCA0LiBpbmRleCBhcyBpICAgICAgIHwgICAgICBpICAgICAgIHwgIGluZGV4ICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgNS4gdHJhY2tCeTogZnVuYyAgICB8IG5nRm9yVHJhY2tCeSB8ICAgZnVuYyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDYuICpuZ0lmPVwiY29uZFwiICAgICB8ICAgICBuZ0lmICAgICB8ICAgY29uZCAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqXG4gKiAoNikgaXMgYSBub3RhYmxlIGV4Y2VwdGlvbiBiZWNhdXNlIGl0IGlzIGEgYmluZGluZyBmcm9tIHRoZSB0ZW1wbGF0ZSBrZXkgaW5cbiAqIHRoZSBMSFMgb2YgYSBIVE1MIGF0dHJpYnV0ZSB0byB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgUkhTLiBBbGwgb3RoZXIgYmluZGluZ3NcbiAqIGluIHRoZSBleGFtcGxlIGFib3ZlIGFyZSBkZXJpdmVkIHNvbGVseSBmcm9tIHRoZSBSSFMuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQmluZGluZyA9IFZhcmlhYmxlQmluZGluZ3xFeHByZXNzaW9uQmluZGluZztcblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBuYW1lIG9mIHRoZSBMSFMgYWxvbmcgd2l0aCBpdHMgc3Bhbi5cbiAgICogQHBhcmFtIHZhbHVlIG9wdGlvbmFsIHZhbHVlIGZvciB0aGUgUkhTIGFsb25nIHdpdGggaXRzIHNwYW4uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkga2V5OiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyfG51bGwpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBiaW5kaW5nIG5hbWUsIGxpa2UgbmdGb3JPZiwgbmdGb3JUcmFja0J5LCBuZ0lmLCBhbG9uZyB3aXRoIGl0c1xuICAgKiBzcGFuLiBOb3RlIHRoYXQgdGhlIGxlbmd0aCBvZiB0aGUgc3BhbiBtYXkgbm90IGJlIHRoZSBzYW1lIGFzXG4gICAqIGBrZXkuc291cmNlLmxlbmd0aGAuIEZvciBleGFtcGxlLFxuICAgKiAxLiBrZXkuc291cmNlID0gbmdGb3IsIGtleS5zcGFuIGlzIGZvciBcIm5nRm9yXCJcbiAgICogMi4ga2V5LnNvdXJjZSA9IG5nRm9yT2YsIGtleS5zcGFuIGlzIGZvciBcIm9mXCJcbiAgICogMy4ga2V5LnNvdXJjZSA9IG5nRm9yVHJhY2tCeSwga2V5LnNwYW4gaXMgZm9yIFwidHJhY2tCeVwiXG4gICAqIEBwYXJhbSB2YWx1ZSBvcHRpb25hbCBleHByZXNzaW9uIGZvciB0aGUgUkhTLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGtleTogVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciwgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBBU1RXaXRoU291cmNlfG51bGwpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBzcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIC8qKlxuICAgKiBUaGUgYHZpc2l0VW5hcnlgIG1ldGhvZCBpcyBkZWNsYXJlZCBhcyBvcHRpb25hbCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIEluIGFuIHVwY29taW5nXG4gICAqIG1ham9yIHJlbGVhc2UsIHRoaXMgbWV0aG9kIHdpbGwgYmUgbWFkZSByZXF1aXJlZC5cbiAgICovXG4gIHZpc2l0VW5hcnk/KGFzdDogVW5hcnksIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRDaGFpbihhc3Q6IENoYWluLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCwgY29udGV4dDogYW55KTogYW55O1xuICAvKipcbiAgICogVGhlIGB2aXNpdFRoaXNSZWNlaXZlcmAgbWV0aG9kIGlzIGRlY2xhcmVkIGFzIG9wdGlvbmFsIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICogSW4gYW4gdXBjb21pbmcgbWFqb3IgcmVsZWFzZSwgdGhpcyBtZXRob2Qgd2lsbCBiZSBtYWRlIHJlcXVpcmVkLlxuICAgKi9cbiAgdmlzaXRUaGlzUmVjZWl2ZXI/KGFzdDogVGhpc1JlY2VpdmVyLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogTGl0ZXJhbEFycmF5LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXAsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IE5vbk51bGxBc3NlcnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IFNhZmVQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRBU1RXaXRoU291cmNlPyhhc3Q6IEFTVFdpdGhTb3VyY2UsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgb3B0aW9uYWxseSBkZWZpbmVkIHRvIGFsbG93IGNsYXNzZXMgdGhhdCBpbXBsZW1lbnQgdGhpc1xuICAgKiBpbnRlcmZhY2UgdG8gc2VsZWN0aXZlbHkgZGVjaWRlIGlmIHRoZSBzcGVjaWZpZWQgYGFzdGAgc2hvdWxkIGJlIHZpc2l0ZWQuXG4gICAqIEBwYXJhbSBhc3Qgbm9kZSB0byB2aXNpdFxuICAgKiBAcGFyYW0gY29udGV4dCBjb250ZXh0IHRoYXQgZ2V0cyBwYXNzZWQgdG8gdGhlIG5vZGUgYW5kIGFsbCBpdHMgY2hpbGRyZW5cbiAgICovXG4gIHZpc2l0Pyhhc3Q6IEFTVCwgY29udGV4dD86IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZUFzdFZpc2l0b3IgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXQoYXN0OiBBU1QsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIC8vIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGp1c3QgdmlzaXRzIGV2ZXJ5IG5vZGUuXG4gICAgLy8gQ2xhc3NlcyB0aGF0IGV4dGVuZCBSZWN1cnNpdmVBc3RWaXNpdG9yIHNob3VsZCBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uXG4gICAgLy8gdG8gc2VsZWN0aXZlbHkgdmlzaXQgdGhlIHNwZWNpZmllZCBub2RlLlxuICAgIGFzdC52aXNpdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFVuYXJ5KGFzdDogVW5hcnksIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3QuZXhwciwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3QubGVmdCwgY29udGV4dCk7XG4gICAgdGhpcy52aXNpdChhc3QucmlnaHQsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmNvbmRpdGlvbiwgY29udGV4dCk7XG4gICAgdGhpcy52aXNpdChhc3QudHJ1ZUV4cCwgY29udGV4dCk7XG4gICAgdGhpcy52aXNpdChhc3QuZmFsc2VFeHAsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmV4cCwgY29udGV4dCk7XG4gICAgdGhpcy52aXNpdEFsbChhc3QuYXJncywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBGdW5jdGlvbkNhbGwsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgaWYgKGFzdC50YXJnZXQpIHtcbiAgICAgIHRoaXMudmlzaXQoYXN0LnRhcmdldCwgY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IFRoaXNSZWNlaXZlciwgY29udGV4dDogYW55KTogYW55IHt9XG4gIHZpc2l0VGhpc1JlY2VpdmVyKGFzdDogVGhpc1JlY2VpdmVyLCBjb250ZXh0OiBhbnkpOiBhbnkge31cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRLZXllZFJlYWQoYXN0OiBLZXllZFJlYWQsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnZhbHVlLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5leHByZXNzaW9uLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmV4cHJlc3Npb24sIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC52YWx1ZSwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5yZWNlaXZlciwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICAvLyBUaGlzIGlzIG5vdCBwYXJ0IG9mIHRoZSBBc3RWaXNpdG9yIGludGVyZmFjZSwganVzdCBhIGhlbHBlciBtZXRob2RcbiAgdmlzaXRBbGwoYXN0czogQVNUW10sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBhc3Qgb2YgYXN0cykge1xuICAgICAgdGhpcy52aXNpdChhc3QsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXN0VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRUaGlzUmVjZWl2ZXIoYXN0OiBUaGlzUmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24sIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0aW9uKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnN0cmluZ3MsIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbFByaW1pdGl2ZShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC52YWx1ZSk7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5UmVhZChcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QubmFtZVNwYW4sIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUpO1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5V3JpdGUoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm5hbWVTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLFxuICAgICAgICBhc3QudmFsdWUudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm5hbWVTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBNZXRob2RDYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5uYW1lU3BhbiwgYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpLCBhc3QubmFtZSxcbiAgICAgICAgdGhpcy52aXNpdEFsbChhc3QuYXJncykpO1xuICB9XG5cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgU2FmZU1ldGhvZENhbGwoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm5hbWVTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLFxuICAgICAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKSk7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ2FsbChcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QudGFyZ2V0IS52aXNpdCh0aGlzKSwgdGhpcy52aXNpdEFsbChhc3QuYXJncykpO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsQXJyYXkoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucykpO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IExpdGVyYWxNYXAoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Qua2V5cywgdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKSk7XG4gIH1cblxuICB2aXNpdFVuYXJ5KGFzdDogVW5hcnksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgc3dpdGNoIChhc3Qub3BlcmF0b3IpIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICByZXR1cm4gVW5hcnkuY3JlYXRlUGx1cyhhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5leHByLnZpc2l0KHRoaXMpKTtcbiAgICAgIGNhc2UgJy0nOlxuICAgICAgICByZXR1cm4gVW5hcnkuY3JlYXRlTWludXMoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QuZXhwci52aXNpdCh0aGlzKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdW5hcnkgb3BlcmF0b3IgJHthc3Qub3BlcmF0b3J9YCk7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnkoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm9wZXJhdGlvbiwgYXN0LmxlZnQudmlzaXQodGhpcyksIGFzdC5yaWdodC52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFByZWZpeE5vdChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IE5vbk51bGxBc3NlcnQsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBOb25OdWxsQXNzZXJ0KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LmV4cHJlc3Npb24udmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWwoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LmNvbmRpdGlvbi52aXNpdCh0aGlzKSwgYXN0LnRydWVFeHAudmlzaXQodGhpcyksXG4gICAgICAgIGFzdC5mYWxzZUV4cC52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdQaXBlKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5leHAudmlzaXQodGhpcyksIGFzdC5uYW1lLCB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKSxcbiAgICAgICAgYXN0Lm5hbWVTcGFuKTtcbiAgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgS2V5ZWRSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm9iai52aXNpdCh0aGlzKSwgYXN0LmtleS52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgS2V5ZWRXcml0ZShcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Qub2JqLnZpc2l0KHRoaXMpLCBhc3Qua2V5LnZpc2l0KHRoaXMpLCBhc3QudmFsdWUudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRBbGwoYXN0czogYW55W10pOiBhbnlbXSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZXNbaV0gPSBhc3RzW2ldLnZpc2l0KHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgdmlzaXRDaGFpbihhc3Q6IENoYWluLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQ2hhaW4oYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucykpO1xuICB9XG5cbiAgdmlzaXRRdW90ZShhc3Q6IFF1b3RlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUXVvdGUoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnByZWZpeCwgYXN0LnVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uLCBhc3QubG9jYXRpb24pO1xuICB9XG59XG5cbi8vIEEgdHJhbnNmb3JtZXIgdGhhdCBvbmx5IGNyZWF0ZXMgbmV3IG5vZGVzIGlmIHRoZSB0cmFuc2Zvcm1lciBtYWtlcyBhIGNoYW5nZSBvclxuLy8gYSBjaGFuZ2UgaXMgbWFkZSBhIGNoaWxkIG5vZGUuXG5leHBvcnQgY2xhc3MgQXN0TWVtb3J5RWZmaWNpZW50VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRUaGlzUmVjZWl2ZXIoYXN0OiBUaGlzUmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24sIGNvbnRleHQ6IGFueSk6IEludGVycG9sYXRpb24ge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpO1xuICAgIGlmIChleHByZXNzaW9ucyAhPT0gYXN0LmV4cHJlc3Npb25zKVxuICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0aW9uKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnN0cmluZ3MsIGV4cHJlc3Npb25zKTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm5hbWVTcGFuLCByZWNlaXZlciwgYXN0Lm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBjb25zdCB2YWx1ZSA9IGFzdC52YWx1ZS52aXNpdCh0aGlzKTtcbiAgICBpZiAocmVjZWl2ZXIgIT09IGFzdC5yZWNlaXZlciB8fCB2YWx1ZSAhPT0gYXN0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5V3JpdGUoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QubmFtZVNwYW4sIHJlY2VpdmVyLCBhc3QubmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBpZiAocmVjZWl2ZXIgIT09IGFzdC5yZWNlaXZlcikge1xuICAgICAgcmV0dXJuIG5ldyBTYWZlUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm5hbWVTcGFuLCByZWNlaXZlciwgYXN0Lm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgYXJncyAhPT0gYXN0LmFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgTWV0aG9kQ2FsbChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5uYW1lU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgYXJncyAhPT0gYXN0LmFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgU2FmZU1ldGhvZENhbGwoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QubmFtZVNwYW4sIHJlY2VpdmVyLCBhc3QubmFtZSwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCB0YXJnZXQgPSBhc3QudGFyZ2V0ICYmIGFzdC50YXJnZXQudmlzaXQodGhpcyk7XG4gICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuICAgIGlmICh0YXJnZXQgIT09IGFzdC50YXJnZXQgfHwgYXJncyAhPT0gYXN0LmFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25DYWxsKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgdGFyZ2V0LCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogTGl0ZXJhbEFycmF5LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpO1xuICAgIGlmIChleHByZXNzaW9ucyAhPT0gYXN0LmV4cHJlc3Npb25zKSB7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cHJlc3Npb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXAsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKTtcbiAgICBpZiAodmFsdWVzICE9PSBhc3QudmFsdWVzKSB7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxNYXAoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Qua2V5cywgdmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0VW5hcnkoYXN0OiBVbmFyeSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBleHByID0gYXN0LmV4cHIudmlzaXQodGhpcyk7XG4gICAgaWYgKGV4cHIgIT09IGFzdC5leHByKSB7XG4gICAgICBzd2l0Y2ggKGFzdC5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICByZXR1cm4gVW5hcnkuY3JlYXRlUGx1cyhhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cHIpO1xuICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICByZXR1cm4gVW5hcnkuY3JlYXRlTWludXMoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBleHByKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdW5hcnkgb3BlcmF0b3IgJHthc3Qub3BlcmF0b3J9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBsZWZ0ID0gYXN0LmxlZnQudmlzaXQodGhpcyk7XG4gICAgY29uc3QgcmlnaHQgPSBhc3QucmlnaHQudmlzaXQodGhpcyk7XG4gICAgaWYgKGxlZnQgIT09IGFzdC5sZWZ0IHx8IHJpZ2h0ICE9PSBhc3QucmlnaHQpIHtcbiAgICAgIHJldHVybiBuZXcgQmluYXJ5KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm9wZXJhdGlvbiwgbGVmdCwgcmlnaHQpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpO1xuICAgIGlmIChleHByZXNzaW9uICE9PSBhc3QuZXhwcmVzc2lvbikge1xuICAgICAgcmV0dXJuIG5ldyBQcmVmaXhOb3QoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBleHByZXNzaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IE5vbk51bGxBc3NlcnQsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpO1xuICAgIGlmIChleHByZXNzaW9uICE9PSBhc3QuZXhwcmVzc2lvbikge1xuICAgICAgcmV0dXJuIG5ldyBOb25OdWxsQXNzZXJ0KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgY29uZGl0aW9uID0gYXN0LmNvbmRpdGlvbi52aXNpdCh0aGlzKTtcbiAgICBjb25zdCB0cnVlRXhwID0gYXN0LnRydWVFeHAudmlzaXQodGhpcyk7XG4gICAgY29uc3QgZmFsc2VFeHAgPSBhc3QuZmFsc2VFeHAudmlzaXQodGhpcyk7XG4gICAgaWYgKGNvbmRpdGlvbiAhPT0gYXN0LmNvbmRpdGlvbiB8fCB0cnVlRXhwICE9PSBhc3QudHJ1ZUV4cCB8fCBmYWxzZUV4cCAhPT0gYXN0LmZhbHNlRXhwKSB7XG4gICAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgY29uZGl0aW9uLCB0cnVlRXhwLCBmYWxzZUV4cCk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBleHAgPSBhc3QuZXhwLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKTtcbiAgICBpZiAoZXhwICE9PSBhc3QuZXhwIHx8IGFyZ3MgIT09IGFzdC5hcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmRpbmdQaXBlKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwLCBhc3QubmFtZSwgYXJncywgYXN0Lm5hbWVTcGFuKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IG9iaiA9IGFzdC5vYmoudmlzaXQodGhpcyk7XG4gICAgY29uc3Qga2V5ID0gYXN0LmtleS52aXNpdCh0aGlzKTtcbiAgICBpZiAob2JqICE9PSBhc3Qub2JqIHx8IGtleSAhPT0gYXN0LmtleSkge1xuICAgICAgcmV0dXJuIG5ldyBLZXllZFJlYWQoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBvYmosIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IG9iaiA9IGFzdC5vYmoudmlzaXQodGhpcyk7XG4gICAgY29uc3Qga2V5ID0gYXN0LmtleS52aXNpdCh0aGlzKTtcbiAgICBjb25zdCB2YWx1ZSA9IGFzdC52YWx1ZS52aXNpdCh0aGlzKTtcbiAgICBpZiAob2JqICE9PSBhc3Qub2JqIHx8IGtleSAhPT0gYXN0LmtleSB8fCB2YWx1ZSAhPT0gYXN0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IEtleWVkV3JpdGUoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBvYmosIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRBbGwoYXN0czogYW55W10pOiBhbnlbXSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgbGV0IG1vZGlmaWVkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbCA9IGFzdHNbaV07XG4gICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsLnZpc2l0KHRoaXMpO1xuICAgICAgcmVzW2ldID0gdmFsdWU7XG4gICAgICBtb2RpZmllZCA9IG1vZGlmaWVkIHx8IHZhbHVlICE9PSBvcmlnaW5hbDtcbiAgICB9XG4gICAgcmV0dXJuIG1vZGlmaWVkID8gcmVzIDogYXN0cztcbiAgfVxuXG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKTtcbiAgICBpZiAoZXhwcmVzc2lvbnMgIT09IGFzdC5leHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG5ldyBDaGFpbihhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cHJlc3Npb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG59XG5cbi8vIEJpbmRpbmdzXG5cbmV4cG9ydCBjbGFzcyBQYXJzZWRQcm9wZXJ0eSB7XG4gIHB1YmxpYyByZWFkb25seSBpc0xpdGVyYWw6IGJvb2xlYW47XG4gIHB1YmxpYyByZWFkb25seSBpc0FuaW1hdGlvbjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uOiBBU1RXaXRoU291cmNlLCBwdWJsaWMgdHlwZTogUGFyc2VkUHJvcGVydHlUeXBlLFxuICAgICAgLy8gVE9ETyhhdHNjb3R0KTogYGtleVNwYW5gIHNob3VsZCByZWFsbHkgYmUgcmVxdWlyZWQgYnV0IGFsbG93cyBgdW5kZWZpbmVkYCBzbyBWRSBkb2VzXG4gICAgICAvLyBub3QgbmVlZCB0byBiZSB1cGRhdGVkLiBNYWtlIGBrZXlTcGFuYCByZXF1aXJlZCB3aGVuIFZFIGlzIHJlbW92ZWQuXG4gICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCByZWFkb25seSBrZXlTcGFuOiBQYXJzZVNvdXJjZVNwYW58dW5kZWZpbmVkLFxuICAgICAgcHVibGljIHZhbHVlU3BhbjogUGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCkge1xuICAgIHRoaXMuaXNMaXRlcmFsID0gdGhpcy50eXBlID09PSBQYXJzZWRQcm9wZXJ0eVR5cGUuTElURVJBTF9BVFRSO1xuICAgIHRoaXMuaXNBbmltYXRpb24gPSB0aGlzLnR5cGUgPT09IFBhcnNlZFByb3BlcnR5VHlwZS5BTklNQVRJT047XG4gIH1cbn1cblxuZXhwb3J0IGVudW0gUGFyc2VkUHJvcGVydHlUeXBlIHtcbiAgREVGQVVMVCxcbiAgTElURVJBTF9BVFRSLFxuICBBTklNQVRJT05cbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUGFyc2VkRXZlbnRUeXBlIHtcbiAgLy8gRE9NIG9yIERpcmVjdGl2ZSBldmVudFxuICBSZWd1bGFyLFxuICAvLyBBbmltYXRpb24gc3BlY2lmaWMgZXZlbnRcbiAgQW5pbWF0aW9uLFxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VkRXZlbnQge1xuICAvLyBSZWd1bGFyIGV2ZW50cyBoYXZlIGEgdGFyZ2V0XG4gIC8vIEFuaW1hdGlvbiBldmVudHMgaGF2ZSBhIHBoYXNlXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHRhcmdldE9yUGhhc2U6IHN0cmluZywgcHVibGljIHR5cGU6IFBhcnNlZEV2ZW50VHlwZSxcbiAgICAgIHB1YmxpYyBoYW5kbGVyOiBBU1RXaXRoU291cmNlLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIGhhbmRsZXJTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG5cbi8qKlxuICogUGFyc2VkVmFyaWFibGUgcmVwcmVzZW50cyBhIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGluIGEgbWljcm9zeW50YXggZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhcnNlZFZhcmlhYmxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyByZWFkb25seSBrZXlTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWVTcGFuPzogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBCaW5kaW5nVHlwZSB7XG4gIC8vIEEgcmVndWxhciBiaW5kaW5nIHRvIGEgcHJvcGVydHkgKGUuZy4gYFtwcm9wZXJ0eV09XCJleHByZXNzaW9uXCJgKS5cbiAgUHJvcGVydHksXG4gIC8vIEEgYmluZGluZyB0byBhbiBlbGVtZW50IGF0dHJpYnV0ZSAoZS5nLiBgW2F0dHIubmFtZV09XCJleHByZXNzaW9uXCJgKS5cbiAgQXR0cmlidXRlLFxuICAvLyBBIGJpbmRpbmcgdG8gYSBDU1MgY2xhc3MgKGUuZy4gYFtjbGFzcy5uYW1lXT1cImNvbmRpdGlvblwiYCkuXG4gIENsYXNzLFxuICAvLyBBIGJpbmRpbmcgdG8gYSBzdHlsZSBydWxlIChlLmcuIGBbc3R5bGUucnVsZV09XCJleHByZXNzaW9uXCJgKS5cbiAgU3R5bGUsXG4gIC8vIEEgYmluZGluZyB0byBhbiBhbmltYXRpb24gcmVmZXJlbmNlIChlLmcuIGBbYW5pbWF0ZS5rZXldPVwiZXhwcmVzc2lvblwiYCkuXG4gIEFuaW1hdGlvbixcbn1cblxuZXhwb3J0IGNsYXNzIEJvdW5kRWxlbWVudFByb3BlcnR5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogQmluZGluZ1R5cGUsIHB1YmxpYyBzZWN1cml0eUNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCxcbiAgICAgIHB1YmxpYyB2YWx1ZTogQVNUV2l0aFNvdXJjZSwgcHVibGljIHVuaXQ6IHN0cmluZ3xudWxsLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcmVhZG9ubHkga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCwgcHVibGljIHZhbHVlU3BhbjogUGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCkge31cbn1cbiJdfQ==