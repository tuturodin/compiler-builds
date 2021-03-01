/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from '../../output/output_ast';
import { Identifiers as R3 } from '../r3_identifiers';
import { createPipeType } from '../r3_pipe_compiler';
import { DefinitionMap } from '../view/util';
/**
 * Compile a Pipe declaration defined by the `R3PipeMetadata`.
 */
export function compileDeclarePipeFromMetadata(meta) {
    const definitionMap = createPipeDefinitionMap(meta);
    const expression = o.importExpr(R3.declarePipe).callFn([definitionMap.toLiteralMap()]);
    const type = createPipeType(meta);
    return { expression, type };
}
/**
 * Gathers the declaration fields for a Pipe into a `DefinitionMap`. This allows for reusing
 * this logic for components, as they extend the Pipe metadata.
 */
export function createPipeDefinitionMap(meta) {
    const definitionMap = new DefinitionMap();
    definitionMap.set('version', o.literal('12.0.0-next.2+38.sha-a31da48'));
    definitionMap.set('ngImport', o.importExpr(R3.core));
    // e.g. `type: MyPipe`
    definitionMap.set('type', meta.internalType);
    // e.g. `name: "myPipe"`
    definitionMap.set('name', o.literal(meta.pipeName));
    if (meta.pure === false) {
        // e.g. `pure: false`
        definitionMap.set('pure', o.literal(meta.pure));
    }
    return definitionMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3BhcnRpYWwvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEtBQUssQ0FBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLElBQUksRUFBRSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBSTNDOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDhCQUE4QixDQUFDLElBQW9CO0lBQ2pFLE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxDLE9BQU8sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxJQUFvQjtJQUUxRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBeUIsQ0FBQztJQUVqRSxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUM3RCxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXJELHNCQUFzQjtJQUN0QixhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0Msd0JBQXdCO0lBQ3hCLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtRQUN2QixxQkFBcUI7UUFDckIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNqRDtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi4vcjNfaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtjcmVhdGVQaXBlVHlwZSwgUjNQaXBlTWV0YWRhdGF9IGZyb20gJy4uL3IzX3BpcGVfY29tcGlsZXInO1xuaW1wb3J0IHtSM1BpcGVEZWZ9IGZyb20gJy4uL3ZpZXcvYXBpJztcbmltcG9ydCB7RGVmaW5pdGlvbk1hcH0gZnJvbSAnLi4vdmlldy91dGlsJztcbmltcG9ydCB7UjNEZWNsYXJlUGlwZU1ldGFkYXRhfSBmcm9tICcuL2FwaSc7XG5cblxuLyoqXG4gKiBDb21waWxlIGEgUGlwZSBkZWNsYXJhdGlvbiBkZWZpbmVkIGJ5IHRoZSBgUjNQaXBlTWV0YWRhdGFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZURlY2xhcmVQaXBlRnJvbU1ldGFkYXRhKG1ldGE6IFIzUGlwZU1ldGFkYXRhKTogUjNQaXBlRGVmIHtcbiAgY29uc3QgZGVmaW5pdGlvbk1hcCA9IGNyZWF0ZVBpcGVEZWZpbml0aW9uTWFwKG1ldGEpO1xuXG4gIGNvbnN0IGV4cHJlc3Npb24gPSBvLmltcG9ydEV4cHIoUjMuZGVjbGFyZVBpcGUpLmNhbGxGbihbZGVmaW5pdGlvbk1hcC50b0xpdGVyYWxNYXAoKV0pO1xuICBjb25zdCB0eXBlID0gY3JlYXRlUGlwZVR5cGUobWV0YSk7XG5cbiAgcmV0dXJuIHtleHByZXNzaW9uLCB0eXBlfTtcbn1cblxuLyoqXG4gKiBHYXRoZXJzIHRoZSBkZWNsYXJhdGlvbiBmaWVsZHMgZm9yIGEgUGlwZSBpbnRvIGEgYERlZmluaXRpb25NYXBgLiBUaGlzIGFsbG93cyBmb3IgcmV1c2luZ1xuICogdGhpcyBsb2dpYyBmb3IgY29tcG9uZW50cywgYXMgdGhleSBleHRlbmQgdGhlIFBpcGUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaXBlRGVmaW5pdGlvbk1hcChtZXRhOiBSM1BpcGVNZXRhZGF0YSk6XG4gICAgRGVmaW5pdGlvbk1hcDxSM0RlY2xhcmVQaXBlTWV0YWRhdGE+IHtcbiAgY29uc3QgZGVmaW5pdGlvbk1hcCA9IG5ldyBEZWZpbml0aW9uTWFwPFIzRGVjbGFyZVBpcGVNZXRhZGF0YT4oKTtcblxuICBkZWZpbml0aW9uTWFwLnNldCgndmVyc2lvbicsIG8ubGl0ZXJhbCgnMC4wLjAtUExBQ0VIT0xERVInKSk7XG4gIGRlZmluaXRpb25NYXAuc2V0KCduZ0ltcG9ydCcsIG8uaW1wb3J0RXhwcihSMy5jb3JlKSk7XG5cbiAgLy8gZS5nLiBgdHlwZTogTXlQaXBlYFxuICBkZWZpbml0aW9uTWFwLnNldCgndHlwZScsIG1ldGEuaW50ZXJuYWxUeXBlKTtcbiAgLy8gZS5nLiBgbmFtZTogXCJteVBpcGVcImBcbiAgZGVmaW5pdGlvbk1hcC5zZXQoJ25hbWUnLCBvLmxpdGVyYWwobWV0YS5waXBlTmFtZSkpO1xuXG4gIGlmIChtZXRhLnB1cmUgPT09IGZhbHNlKSB7XG4gICAgLy8gZS5nLiBgcHVyZTogZmFsc2VgXG4gICAgZGVmaW5pdGlvbk1hcC5zZXQoJ3B1cmUnLCBvLmxpdGVyYWwobWV0YS5wdXJlKSk7XG4gIH1cblxuICByZXR1cm4gZGVmaW5pdGlvbk1hcDtcbn1cbiJdfQ==