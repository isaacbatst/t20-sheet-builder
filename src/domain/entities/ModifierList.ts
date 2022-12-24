import type {EffectDuration} from './Ability/ActivateableAbilityEffect';
import type {ModifiersListInterface} from './BuildingSheetInterface';
import type {ContextInterface} from './Context';
import type {InGameContext} from './InGameContext';
import type {Translatable} from './Translator';

export type ConditionVerify = (context: InGameContext) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ConditionVerify;
};

export type ModifierInterface = {
	condition?: ModifierCondition;
	source: Translatable;
	getValue(context: ContextInterface): number;
	getMaxPossibleValue(): number;
};

export type TemporaryModifierInterface = ModifierInterface & {
	duration: EffectDuration;
};

export class ModifiersList implements ModifiersListInterface {
	readonly modifiers: ModifierInterface[] = [];

	getTotal(context: ContextInterface) {
		const total = this.modifiers
			.reduce<number>((acc, modifier) => acc + modifier.getValue(context), 0);

		return total;
	}

	getMaxPossibleTotal() {
		const total = this.modifiers
			.reduce<number>((acc, modifier) => acc + modifier.getMaxPossibleValue(), 0);

		return total;
	}

	add(newModifier: ModifierInterface) {
		const isRepeated = this.modifiers.some(otherModifier => otherModifier.source === newModifier.source);

		if (isRepeated) {
			throw new Error('REPEATED_MODIFIER_SOURCE');
		}

		this.modifiers.push(newModifier);
	}
}
