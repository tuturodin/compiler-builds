/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import * as i18n from '../../../i18n/i18n_ast';
import { toPublicName } from '../../../i18n/serializers/xmb';
import { mapLiteral } from '../../../output/map_util';
import * as o from '../../../output/output_ast';
/* Closure variables holding messages must be named `MSG_[A-Z0-9]+` */
var TRANSLATION_PREFIX = 'MSG_';
/** Closure uses `goog.getMsg(message)` to lookup translations */
var GOOG_GET_MSG = 'goog.getMsg';
/** I18n separators for metadata **/
var I18N_MEANING_SEPARATOR = '|';
var I18N_ID_SEPARATOR = '@@';
/** Name of the i18n attributes **/
export var I18N_ATTR = 'i18n';
export var I18N_ATTR_PREFIX = 'i18n-';
/** Prefix of var expressions used in ICUs */
export var I18N_ICU_VAR_PREFIX = 'VAR_';
/** Prefix of ICU expressions for post processing */
export var I18N_ICU_MAPPING_PREFIX = 'I18N_EXP_';
/** Placeholder wrapper for i18n expressions **/
export var I18N_PLACEHOLDER_SYMBOL = '�';
function i18nTranslationToDeclStmt(variable, message, params) {
    var args = [o.literal(message)];
    if (params && Object.keys(params).length) {
        args.push(mapLiteral(params, true));
    }
    var fnCall = o.variable(GOOG_GET_MSG).callFn(args);
    return variable.set(fnCall).toDeclStmt(o.INFERRED_TYPE, [o.StmtModifier.Final]);
}
// Converts i18n meta informations for a message (id, description, meaning)
// to a JsDoc statement formatted as expected by the Closure compiler.
function i18nMetaToDocStmt(meta) {
    var tags = [];
    if (meta.description) {
        tags.push({ tagName: "desc" /* Desc */, text: meta.description });
    }
    if (meta.meaning) {
        tags.push({ tagName: "meaning" /* Meaning */, text: meta.meaning });
    }
    return tags.length == 0 ? null : new o.JSDocCommentStmt(tags);
}
export function isI18nAttribute(name) {
    return name === I18N_ATTR || name.startsWith(I18N_ATTR_PREFIX);
}
export function isI18nRootNode(meta) {
    return meta instanceof i18n.Message;
}
export function isSingleI18nIcu(meta) {
    return isI18nRootNode(meta) && meta.nodes.length === 1 && meta.nodes[0] instanceof i18n.Icu;
}
export function hasI18nAttrs(element) {
    return element.attrs.some(function (attr) { return isI18nAttribute(attr.name); });
}
export function metaFromI18nMessage(message, id) {
    if (id === void 0) { id = null; }
    return {
        id: typeof id === 'string' ? id : message.id || '',
        meaning: message.meaning || '',
        description: message.description || ''
    };
}
export function icuFromI18nMessage(message) {
    return message.nodes[0];
}
export function wrapI18nPlaceholder(content, contextId) {
    if (contextId === void 0) { contextId = 0; }
    var blockId = contextId > 0 ? ":" + contextId : '';
    return "" + I18N_PLACEHOLDER_SYMBOL + content + blockId + I18N_PLACEHOLDER_SYMBOL;
}
export function assembleI18nBoundString(strings, bindingStartIndex, contextId) {
    if (bindingStartIndex === void 0) { bindingStartIndex = 0; }
    if (contextId === void 0) { contextId = 0; }
    if (!strings.length)
        return '';
    var acc = '';
    var lastIdx = strings.length - 1;
    for (var i = 0; i < lastIdx; i++) {
        acc += "" + strings[i] + wrapI18nPlaceholder(bindingStartIndex + i, contextId);
    }
    acc += strings[lastIdx];
    return acc;
}
export function getSeqNumberGenerator(startsAt) {
    if (startsAt === void 0) { startsAt = 0; }
    var current = startsAt;
    return function () { return current++; };
}
export function placeholdersToParams(placeholders) {
    var params = {};
    placeholders.forEach(function (values, key) {
        params[key] = o.literal(values.length > 1 ? "[" + values.join('|') + "]" : values[0]);
    });
    return params;
}
export function updatePlaceholderMap(map, name) {
    var values = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        values[_i - 2] = arguments[_i];
    }
    var current = map.get(name) || [];
    current.push.apply(current, tslib_1.__spread(values));
    map.set(name, current);
}
export function assembleBoundTextPlaceholders(meta, bindingStartIndex, contextId) {
    if (bindingStartIndex === void 0) { bindingStartIndex = 0; }
    if (contextId === void 0) { contextId = 0; }
    var startIdx = bindingStartIndex;
    var placeholders = new Map();
    var node = meta instanceof i18n.Message ? meta.nodes.find(function (node) { return node instanceof i18n.Container; }) : meta;
    if (node) {
        node
            .children.filter(function (child) { return child instanceof i18n.Placeholder; })
            .forEach(function (child, idx) {
            var content = wrapI18nPlaceholder(startIdx + idx, contextId);
            updatePlaceholderMap(placeholders, child.name, content);
        });
    }
    return placeholders;
}
export function findIndex(items, callback) {
    for (var i = 0; i < items.length; i++) {
        if (callback(items[i])) {
            return i;
        }
    }
    return -1;
}
/**
 * Parses i18n metas like:
 *  - "@@id",
 *  - "description[@@id]",
 *  - "meaning|description[@@id]"
 * and returns an object with parsed output.
 *
 * @param meta String that represents i18n meta
 * @returns Object with id, meaning and description fields
 */
export function parseI18nMeta(meta) {
    var _a, _b;
    var id;
    var meaning;
    var description;
    if (meta) {
        var idIndex = meta.indexOf(I18N_ID_SEPARATOR);
        var descIndex = meta.indexOf(I18N_MEANING_SEPARATOR);
        var meaningAndDesc = void 0;
        _a = tslib_1.__read((idIndex > -1) ? [meta.slice(0, idIndex), meta.slice(idIndex + 2)] : [meta, ''], 2), meaningAndDesc = _a[0], id = _a[1];
        _b = tslib_1.__read((descIndex > -1) ?
            [meaningAndDesc.slice(0, descIndex), meaningAndDesc.slice(descIndex + 1)] :
            ['', meaningAndDesc], 2), meaning = _b[0], description = _b[1];
    }
    return { id: id, meaning: meaning, description: description };
}
/**
 * Converts internal placeholder names to public-facing format
 * (for example to use in goog.getMsg call).
 * Example: `START_TAG_DIV_1` is converted to `startTagDiv_1`.
 *
 * @param name The placeholder name that should be formatted
 * @returns Formatted placeholder name
 */
export function formatI18nPlaceholderName(name) {
    var chunks = toPublicName(name).split('_');
    if (chunks.length === 1) {
        // if no "_" found - just lowercase the value
        return name.toLowerCase();
    }
    var postfix;
    // eject last element if it's a number
    if (/^\d+$/.test(chunks[chunks.length - 1])) {
        postfix = chunks.pop();
    }
    var raw = chunks.shift().toLowerCase();
    if (chunks.length) {
        raw += chunks.map(function (c) { return c.charAt(0).toUpperCase() + c.slice(1).toLowerCase(); }).join('');
    }
    return postfix ? raw + "_" + postfix : raw;
}
/**
 * Generates a prefix for translation const name.
 *
 * @param extra Additional local prefix that should be injected into translation var name
 * @returns Complete translation const prefix
 */
export function getTranslationConstPrefix(extra) {
    return ("" + TRANSLATION_PREFIX + extra).toUpperCase();
}
/**
 * Generates translation declaration statements.
 *
 * @param variable Translation value reference
 * @param message Text message to be translated
 * @param meta Object that contains meta information (id, meaning and description)
 * @param params Object with placeholders key-value pairs
 * @param transformFn Optional transformation (post processing) function reference
 * @returns Array of Statements that represent a given translation
 */
export function getTranslationDeclStmts(variable, message, meta, params, transformFn) {
    if (params === void 0) { params = {}; }
    var statements = [];
    var docStatements = i18nMetaToDocStmt(meta);
    if (docStatements) {
        statements.push(docStatements);
    }
    if (transformFn) {
        var raw = o.variable(variable.name + "$$RAW");
        statements.push(i18nTranslationToDeclStmt(raw, message, params));
        statements.push(variable.set(transformFn(raw)).toDeclStmt(o.INFERRED_TYPE, [o.StmtModifier.Final]));
    }
    else {
        statements.push(i18nTranslationToDeclStmt(variable, message, params));
    }
    return statements;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3ZpZXcvaTE4bi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEtBQUssSUFBSSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxLQUFLLENBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUdoRCxzRUFBc0U7QUFDdEUsSUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUM7QUFFbEMsaUVBQWlFO0FBQ2pFLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUVuQyxvQ0FBb0M7QUFDcEMsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUM7QUFDbkMsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFFL0IsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDaEMsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO0FBRXhDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFFMUMsb0RBQW9EO0FBQ3BELE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLFdBQVcsQ0FBQztBQUVuRCxnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0FBUTNDLFNBQVMseUJBQXlCLENBQzlCLFFBQXVCLEVBQUUsT0FBZSxFQUN4QyxNQUF1QztJQUN6QyxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFpQixDQUFDLENBQUM7SUFD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dkQsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FDbkMsUUFBdUIsRUFBRSxPQUFlLEVBQUUsSUFBYyxFQUN4RCxNQUEyQyxFQUMzQyxXQUFrRDtJQURsRCx1QkFBQSxFQUFBLFdBQTJDO0lBRTdDLElBQU0sVUFBVSxHQUFrQixFQUFFLENBQUM7SUFDckMsSUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsSUFBSSxhQUFhLEVBQUU7UUFDakIsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNoQztJQUNELElBQUksV0FBVyxFQUFFO1FBQ2YsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBSSxRQUFRLENBQUMsSUFBSSxVQUFPLENBQUMsQ0FBQztRQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRSxVQUFVLENBQUMsSUFBSSxDQUNYLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6RjtTQUFNO1FBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDdkU7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBpMThuIGZyb20gJy4uLy4uLy4uL2kxOG4vaTE4bl9hc3QnO1xuaW1wb3J0IHt0b1B1YmxpY05hbWV9IGZyb20gJy4uLy4uLy4uL2kxOG4vc2VyaWFsaXplcnMveG1iJztcbmltcG9ydCAqIGFzIGh0bWwgZnJvbSAnLi4vLi4vLi4vbWxfcGFyc2VyL2FzdCc7XG5pbXBvcnQge21hcExpdGVyYWx9IGZyb20gJy4uLy4uLy4uL291dHB1dC9tYXBfdXRpbCc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uLy4uLy4uL291dHB1dC9vdXRwdXRfYXN0JztcblxuXG4vKiBDbG9zdXJlIHZhcmlhYmxlcyBob2xkaW5nIG1lc3NhZ2VzIG11c3QgYmUgbmFtZWQgYE1TR19bQS1aMC05XStgICovXG5jb25zdCBUUkFOU0xBVElPTl9QUkVGSVggPSAnTVNHXyc7XG5cbi8qKiBDbG9zdXJlIHVzZXMgYGdvb2cuZ2V0TXNnKG1lc3NhZ2UpYCB0byBsb29rdXAgdHJhbnNsYXRpb25zICovXG5jb25zdCBHT09HX0dFVF9NU0cgPSAnZ29vZy5nZXRNc2cnO1xuXG4vKiogSTE4biBzZXBhcmF0b3JzIGZvciBtZXRhZGF0YSAqKi9cbmNvbnN0IEkxOE5fTUVBTklOR19TRVBBUkFUT1IgPSAnfCc7XG5jb25zdCBJMThOX0lEX1NFUEFSQVRPUiA9ICdAQCc7XG5cbi8qKiBOYW1lIG9mIHRoZSBpMThuIGF0dHJpYnV0ZXMgKiovXG5leHBvcnQgY29uc3QgSTE4Tl9BVFRSID0gJ2kxOG4nO1xuZXhwb3J0IGNvbnN0IEkxOE5fQVRUUl9QUkVGSVggPSAnaTE4bi0nO1xuXG4vKiogUHJlZml4IG9mIHZhciBleHByZXNzaW9ucyB1c2VkIGluIElDVXMgKi9cbmV4cG9ydCBjb25zdCBJMThOX0lDVV9WQVJfUFJFRklYID0gJ1ZBUl8nO1xuXG4vKiogUHJlZml4IG9mIElDVSBleHByZXNzaW9ucyBmb3IgcG9zdCBwcm9jZXNzaW5nICovXG5leHBvcnQgY29uc3QgSTE4Tl9JQ1VfTUFQUElOR19QUkVGSVggPSAnSTE4Tl9FWFBfJztcblxuLyoqIFBsYWNlaG9sZGVyIHdyYXBwZXIgZm9yIGkxOG4gZXhwcmVzc2lvbnMgKiovXG5leHBvcnQgY29uc3QgSTE4Tl9QTEFDRUhPTERFUl9TWU1CT0wgPSAn77+9JztcblxuZXhwb3J0IHR5cGUgSTE4bk1ldGEgPSB7XG4gIGlkPzogc3RyaW5nLFxuICBkZXNjcmlwdGlvbj86IHN0cmluZyxcbiAgbWVhbmluZz86IHN0cmluZ1xufTtcblxuZnVuY3Rpb24gaTE4blRyYW5zbGF0aW9uVG9EZWNsU3RtdChcbiAgICB2YXJpYWJsZTogby5SZWFkVmFyRXhwciwgbWVzc2FnZTogc3RyaW5nLFxuICAgIHBhcmFtcz86IHtbbmFtZTogc3RyaW5nXTogby5FeHByZXNzaW9ufSk6IG8uRGVjbGFyZVZhclN0bXQge1xuICBjb25zdCBhcmdzID0gW28ubGl0ZXJhbChtZXNzYWdlKSBhcyBvLkV4cHJlc3Npb25dO1xuICBpZiAocGFyYW1zICYmIE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoKSB7XG4gICAgYXJncy5wdXNoKG1hcExpdGVyYWwocGFyYW1zLCB0cnVlKSk7XG4gIH1cbiAgY29uc3QgZm5DYWxsID0gby52YXJpYWJsZShHT09HX0dFVF9NU0cpLmNhbGxGbihhcmdzKTtcbiAgcmV0dXJuIHZhcmlhYmxlLnNldChmbkNhbGwpLnRvRGVjbFN0bXQoby5JTkZFUlJFRF9UWVBFLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKTtcbn1cblxuLy8gQ29udmVydHMgaTE4biBtZXRhIGluZm9ybWF0aW9ucyBmb3IgYSBtZXNzYWdlIChpZCwgZGVzY3JpcHRpb24sIG1lYW5pbmcpXG4vLyB0byBhIEpzRG9jIHN0YXRlbWVudCBmb3JtYXR0ZWQgYXMgZXhwZWN0ZWQgYnkgdGhlIENsb3N1cmUgY29tcGlsZXIuXG5mdW5jdGlvbiBpMThuTWV0YVRvRG9jU3RtdChtZXRhOiBJMThuTWV0YSk6IG8uSlNEb2NDb21tZW50U3RtdHxudWxsIHtcbiAgY29uc3QgdGFnczogby5KU0RvY1RhZ1tdID0gW107XG4gIGlmIChtZXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgdGFncy5wdXNoKHt0YWdOYW1lOiBvLkpTRG9jVGFnTmFtZS5EZXNjLCB0ZXh0OiBtZXRhLmRlc2NyaXB0aW9ufSk7XG4gIH1cbiAgaWYgKG1ldGEubWVhbmluZykge1xuICAgIHRhZ3MucHVzaCh7dGFnTmFtZTogby5KU0RvY1RhZ05hbWUuTWVhbmluZywgdGV4dDogbWV0YS5tZWFuaW5nfSk7XG4gIH1cbiAgcmV0dXJuIHRhZ3MubGVuZ3RoID09IDAgPyBudWxsIDogbmV3IG8uSlNEb2NDb21tZW50U3RtdCh0YWdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSTE4bkF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5hbWUgPT09IEkxOE5fQVRUUiB8fCBuYW1lLnN0YXJ0c1dpdGgoSTE4Tl9BVFRSX1BSRUZJWCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0kxOG5Sb290Tm9kZShtZXRhPzogaTE4bi5BU1QpOiBtZXRhIGlzIGkxOG4uTWVzc2FnZSB7XG4gIHJldHVybiBtZXRhIGluc3RhbmNlb2YgaTE4bi5NZXNzYWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTaW5nbGVJMThuSWN1KG1ldGE/OiBpMThuLkFTVCk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNJMThuUm9vdE5vZGUobWV0YSkgJiYgbWV0YS5ub2Rlcy5sZW5ndGggPT09IDEgJiYgbWV0YS5ub2Rlc1swXSBpbnN0YW5jZW9mIGkxOG4uSWN1O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzSTE4bkF0dHJzKGVsZW1lbnQ6IGh0bWwuRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5hdHRycy5zb21lKChhdHRyOiBodG1sLkF0dHJpYnV0ZSkgPT4gaXNJMThuQXR0cmlidXRlKGF0dHIubmFtZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWV0YUZyb21JMThuTWVzc2FnZShtZXNzYWdlOiBpMThuLk1lc3NhZ2UsIGlkOiBzdHJpbmcgfCBudWxsID0gbnVsbCk6IEkxOG5NZXRhIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IGlkIDogbWVzc2FnZS5pZCB8fCAnJyxcbiAgICBtZWFuaW5nOiBtZXNzYWdlLm1lYW5pbmcgfHwgJycsXG4gICAgZGVzY3JpcHRpb246IG1lc3NhZ2UuZGVzY3JpcHRpb24gfHwgJydcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGljdUZyb21JMThuTWVzc2FnZShtZXNzYWdlOiBpMThuLk1lc3NhZ2UpIHtcbiAgcmV0dXJuIG1lc3NhZ2Uubm9kZXNbMF0gYXMgaTE4bi5JY3VQbGFjZWhvbGRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBJMThuUGxhY2Vob2xkZXIoY29udGVudDogc3RyaW5nIHwgbnVtYmVyLCBjb250ZXh0SWQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuICBjb25zdCBibG9ja0lkID0gY29udGV4dElkID4gMCA/IGA6JHtjb250ZXh0SWR9YCA6ICcnO1xuICByZXR1cm4gYCR7STE4Tl9QTEFDRUhPTERFUl9TWU1CT0x9JHtjb250ZW50fSR7YmxvY2tJZH0ke0kxOE5fUExBQ0VIT0xERVJfU1lNQk9MfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZUkxOG5Cb3VuZFN0cmluZyhcbiAgICBzdHJpbmdzOiBzdHJpbmdbXSwgYmluZGluZ1N0YXJ0SW5kZXg6IG51bWJlciA9IDAsIGNvbnRleHRJZDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gIGlmICghc3RyaW5ncy5sZW5ndGgpIHJldHVybiAnJztcbiAgbGV0IGFjYyA9ICcnO1xuICBjb25zdCBsYXN0SWR4ID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJZHg7IGkrKykge1xuICAgIGFjYyArPSBgJHtzdHJpbmdzW2ldfSR7d3JhcEkxOG5QbGFjZWhvbGRlcihiaW5kaW5nU3RhcnRJbmRleCArIGksIGNvbnRleHRJZCl9YDtcbiAgfVxuICBhY2MgKz0gc3RyaW5nc1tsYXN0SWR4XTtcbiAgcmV0dXJuIGFjYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcU51bWJlckdlbmVyYXRvcihzdGFydHNBdDogbnVtYmVyID0gMCk6ICgpID0+IG51bWJlciB7XG4gIGxldCBjdXJyZW50ID0gc3RhcnRzQXQ7XG4gIHJldHVybiAoKSA9PiBjdXJyZW50Kys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFjZWhvbGRlcnNUb1BhcmFtcyhwbGFjZWhvbGRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPik6XG4gICAge1tuYW1lOiBzdHJpbmddOiBvLkV4cHJlc3Npb259IHtcbiAgY29uc3QgcGFyYW1zOiB7W25hbWU6IHN0cmluZ106IG8uRXhwcmVzc2lvbn0gPSB7fTtcbiAgcGxhY2Vob2xkZXJzLmZvckVhY2goKHZhbHVlczogc3RyaW5nW10sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgcGFyYW1zW2tleV0gPSBvLmxpdGVyYWwodmFsdWVzLmxlbmd0aCA+IDEgPyBgWyR7dmFsdWVzLmpvaW4oJ3wnKX1dYCA6IHZhbHVlc1swXSk7XG4gIH0pO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGxhY2Vob2xkZXJNYXAobWFwOiBNYXA8c3RyaW5nLCBhbnlbXT4sIG5hbWU6IHN0cmluZywgLi4udmFsdWVzOiBhbnlbXSkge1xuICBjb25zdCBjdXJyZW50ID0gbWFwLmdldChuYW1lKSB8fCBbXTtcbiAgY3VycmVudC5wdXNoKC4uLnZhbHVlcyk7XG4gIG1hcC5zZXQobmFtZSwgY3VycmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZUJvdW5kVGV4dFBsYWNlaG9sZGVycyhcbiAgICBtZXRhOiBpMThuLkFTVCwgYmluZGluZ1N0YXJ0SW5kZXg6IG51bWJlciA9IDAsIGNvbnRleHRJZDogbnVtYmVyID0gMCk6IE1hcDxzdHJpbmcsIGFueVtdPiB7XG4gIGNvbnN0IHN0YXJ0SWR4ID0gYmluZGluZ1N0YXJ0SW5kZXg7XG4gIGNvbnN0IHBsYWNlaG9sZGVycyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIGNvbnN0IG5vZGUgPVxuICAgICAgbWV0YSBpbnN0YW5jZW9mIGkxOG4uTWVzc2FnZSA/IG1ldGEubm9kZXMuZmluZChub2RlID0+IG5vZGUgaW5zdGFuY2VvZiBpMThuLkNvbnRhaW5lcikgOiBtZXRhO1xuICBpZiAobm9kZSkge1xuICAgIChub2RlIGFzIGkxOG4uQ29udGFpbmVyKVxuICAgICAgICAuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogaTE4bi5Ob2RlKSA9PiBjaGlsZCBpbnN0YW5jZW9mIGkxOG4uUGxhY2Vob2xkZXIpXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZDogaTE4bi5QbGFjZWhvbGRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gd3JhcEkxOG5QbGFjZWhvbGRlcihzdGFydElkeCArIGlkeCwgY29udGV4dElkKTtcbiAgICAgICAgICB1cGRhdGVQbGFjZWhvbGRlck1hcChwbGFjZWhvbGRlcnMsIGNoaWxkLm5hbWUsIGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGxhY2Vob2xkZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IChpdGVtOiBhbnkpID0+IGJvb2xlYW4pOiBudW1iZXIge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhbGxiYWNrKGl0ZW1zW2ldKSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgaTE4biBtZXRhcyBsaWtlOlxuICogIC0gXCJAQGlkXCIsXG4gKiAgLSBcImRlc2NyaXB0aW9uW0BAaWRdXCIsXG4gKiAgLSBcIm1lYW5pbmd8ZGVzY3JpcHRpb25bQEBpZF1cIlxuICogYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggcGFyc2VkIG91dHB1dC5cbiAqXG4gKiBAcGFyYW0gbWV0YSBTdHJpbmcgdGhhdCByZXByZXNlbnRzIGkxOG4gbWV0YVxuICogQHJldHVybnMgT2JqZWN0IHdpdGggaWQsIG1lYW5pbmcgYW5kIGRlc2NyaXB0aW9uIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJMThuTWV0YShtZXRhPzogc3RyaW5nKTogSTE4bk1ldGEge1xuICBsZXQgaWQ6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIGxldCBtZWFuaW5nOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBsZXQgZGVzY3JpcHRpb246IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgaWYgKG1ldGEpIHtcbiAgICBjb25zdCBpZEluZGV4ID0gbWV0YS5pbmRleE9mKEkxOE5fSURfU0VQQVJBVE9SKTtcbiAgICBjb25zdCBkZXNjSW5kZXggPSBtZXRhLmluZGV4T2YoSTE4Tl9NRUFOSU5HX1NFUEFSQVRPUik7XG4gICAgbGV0IG1lYW5pbmdBbmREZXNjOiBzdHJpbmc7XG4gICAgW21lYW5pbmdBbmREZXNjLCBpZF0gPVxuICAgICAgICAoaWRJbmRleCA+IC0xKSA/IFttZXRhLnNsaWNlKDAsIGlkSW5kZXgpLCBtZXRhLnNsaWNlKGlkSW5kZXggKyAyKV0gOiBbbWV0YSwgJyddO1xuICAgIFttZWFuaW5nLCBkZXNjcmlwdGlvbl0gPSAoZGVzY0luZGV4ID4gLTEpID9cbiAgICAgICAgW21lYW5pbmdBbmREZXNjLnNsaWNlKDAsIGRlc2NJbmRleCksIG1lYW5pbmdBbmREZXNjLnNsaWNlKGRlc2NJbmRleCArIDEpXSA6XG4gICAgICAgIFsnJywgbWVhbmluZ0FuZERlc2NdO1xuICB9XG5cbiAgcmV0dXJuIHtpZCwgbWVhbmluZywgZGVzY3JpcHRpb259O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGludGVybmFsIHBsYWNlaG9sZGVyIG5hbWVzIHRvIHB1YmxpYy1mYWNpbmcgZm9ybWF0XG4gKiAoZm9yIGV4YW1wbGUgdG8gdXNlIGluIGdvb2cuZ2V0TXNnIGNhbGwpLlxuICogRXhhbXBsZTogYFNUQVJUX1RBR19ESVZfMWAgaXMgY29udmVydGVkIHRvIGBzdGFydFRhZ0Rpdl8xYC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgcGxhY2Vob2xkZXIgbmFtZSB0aGF0IHNob3VsZCBiZSBmb3JtYXR0ZWRcbiAqIEByZXR1cm5zIEZvcm1hdHRlZCBwbGFjZWhvbGRlciBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRJMThuUGxhY2Vob2xkZXJOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGNodW5rcyA9IHRvUHVibGljTmFtZShuYW1lKS5zcGxpdCgnXycpO1xuICBpZiAoY2h1bmtzLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIGlmIG5vIFwiX1wiIGZvdW5kIC0ganVzdCBsb3dlcmNhc2UgdGhlIHZhbHVlXG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuICBsZXQgcG9zdGZpeDtcbiAgLy8gZWplY3QgbGFzdCBlbGVtZW50IGlmIGl0J3MgYSBudW1iZXJcbiAgaWYgKC9eXFxkKyQvLnRlc3QoY2h1bmtzW2NodW5rcy5sZW5ndGggLSAxXSkpIHtcbiAgICBwb3N0Zml4ID0gY2h1bmtzLnBvcCgpO1xuICB9XG4gIGxldCByYXcgPSBjaHVua3Muc2hpZnQoKSAhLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChjaHVua3MubGVuZ3RoKSB7XG4gICAgcmF3ICs9IGNodW5rcy5tYXAoYyA9PiBjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKS5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gcG9zdGZpeCA/IGAke3Jhd31fJHtwb3N0Zml4fWAgOiByYXc7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcHJlZml4IGZvciB0cmFuc2xhdGlvbiBjb25zdCBuYW1lLlxuICpcbiAqIEBwYXJhbSBleHRyYSBBZGRpdGlvbmFsIGxvY2FsIHByZWZpeCB0aGF0IHNob3VsZCBiZSBpbmplY3RlZCBpbnRvIHRyYW5zbGF0aW9uIHZhciBuYW1lXG4gKiBAcmV0dXJucyBDb21wbGV0ZSB0cmFuc2xhdGlvbiBjb25zdCBwcmVmaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uQ29uc3RQcmVmaXgoZXh0cmE6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtUUkFOU0xBVElPTl9QUkVGSVh9JHtleHRyYX1gLnRvVXBwZXJDYXNlKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHRyYW5zbGF0aW9uIGRlY2xhcmF0aW9uIHN0YXRlbWVudHMuXG4gKlxuICogQHBhcmFtIHZhcmlhYmxlIFRyYW5zbGF0aW9uIHZhbHVlIHJlZmVyZW5jZVxuICogQHBhcmFtIG1lc3NhZ2UgVGV4dCBtZXNzYWdlIHRvIGJlIHRyYW5zbGF0ZWRcbiAqIEBwYXJhbSBtZXRhIE9iamVjdCB0aGF0IGNvbnRhaW5zIG1ldGEgaW5mb3JtYXRpb24gKGlkLCBtZWFuaW5nIGFuZCBkZXNjcmlwdGlvbilcbiAqIEBwYXJhbSBwYXJhbXMgT2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGtleS12YWx1ZSBwYWlyc1xuICogQHBhcmFtIHRyYW5zZm9ybUZuIE9wdGlvbmFsIHRyYW5zZm9ybWF0aW9uIChwb3N0IHByb2Nlc3NpbmcpIGZ1bmN0aW9uIHJlZmVyZW5jZVxuICogQHJldHVybnMgQXJyYXkgb2YgU3RhdGVtZW50cyB0aGF0IHJlcHJlc2VudCBhIGdpdmVuIHRyYW5zbGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbkRlY2xTdG10cyhcbiAgICB2YXJpYWJsZTogby5SZWFkVmFyRXhwciwgbWVzc2FnZTogc3RyaW5nLCBtZXRhOiBJMThuTWV0YSxcbiAgICBwYXJhbXM6IHtbbmFtZTogc3RyaW5nXTogby5FeHByZXNzaW9ufSA9IHt9LFxuICAgIHRyYW5zZm9ybUZuPzogKHJhdzogby5SZWFkVmFyRXhwcikgPT4gby5FeHByZXNzaW9uKTogby5TdGF0ZW1lbnRbXSB7XG4gIGNvbnN0IHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgY29uc3QgZG9jU3RhdGVtZW50cyA9IGkxOG5NZXRhVG9Eb2NTdG10KG1ldGEpO1xuICBpZiAoZG9jU3RhdGVtZW50cykge1xuICAgIHN0YXRlbWVudHMucHVzaChkb2NTdGF0ZW1lbnRzKTtcbiAgfVxuICBpZiAodHJhbnNmb3JtRm4pIHtcbiAgICBjb25zdCByYXcgPSBvLnZhcmlhYmxlKGAke3ZhcmlhYmxlLm5hbWV9JCRSQVdgKTtcbiAgICBzdGF0ZW1lbnRzLnB1c2goaTE4blRyYW5zbGF0aW9uVG9EZWNsU3RtdChyYXcsIG1lc3NhZ2UsIHBhcmFtcykpO1xuICAgIHN0YXRlbWVudHMucHVzaChcbiAgICAgICAgdmFyaWFibGUuc2V0KHRyYW5zZm9ybUZuKHJhdykpLnRvRGVjbFN0bXQoby5JTkZFUlJFRF9UWVBFLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGVtZW50cy5wdXNoKGkxOG5UcmFuc2xhdGlvblRvRGVjbFN0bXQodmFyaWFibGUsIG1lc3NhZ2UsIHBhcmFtcykpO1xuICB9XG4gIHJldHVybiBzdGF0ZW1lbnRzO1xufSJdfQ==