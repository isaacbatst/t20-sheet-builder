import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';

export class CharacterModifiers {
	readonly attack = {
		fixed: new FixedModifiersList(),
		contextual: new ContextualModifiersList(),
	};

	readonly defense = {
		fixed: new FixedModifiersList(),
		contextual: new ContextualModifiersList(),
	};

	readonly armorPenalty = {
		fixed: new FixedModifiersList(),
		contextual: new ContextualModifiersList(),
	};
}
