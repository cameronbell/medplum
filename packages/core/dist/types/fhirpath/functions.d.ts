import type { Atom, AtomContext } from '../fhirlexer/parse';
import type { TypedValue } from '../types';
export type FhirPathFunction = (context: AtomContext, input: TypedValue[], ...args: Atom[]) => TypedValue[];
export declare const functions: Record<string, FhirPathFunction>;
//# sourceMappingURL=functions.d.ts.map