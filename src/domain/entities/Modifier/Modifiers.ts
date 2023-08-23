import {ContextualModifiersList} from './ContextualModifier';
import {FixedModifiersList} from './FixedModifier';
import {PerLevelModifiersList} from './PerLevelModifier';

export type ModifiersParams = {
	fixed: FixedModifiersList;
	contextual: ContextualModifiersList;
	perLevel: PerLevelModifiersList;
};

export class Modifiers {
	readonly fixed: FixedModifiersList;
	readonly contextual: ContextualModifiersList;
	readonly perLevel: PerLevelModifiersList;

	constructor(params: Partial<ModifiersParams> = {}) {
		this.fixed = params.fixed ?? new FixedModifiersList();
		this.contextual = params.contextual ?? new ContextualModifiersList();
		this.perLevel = params.perLevel ?? new PerLevelModifiersList();
	}
}
