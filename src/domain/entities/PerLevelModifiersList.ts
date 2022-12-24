import type {Level} from './Levels';
import type {PerLevelModifier} from './Modifier/PerLevelModifier';

export type PerLevelModifiersListInterface = {
	getTotal(level: Level): number;
};

export class PerLevelModifiersList implements PerLevelModifiersListInterface {
	readonly modifiers: PerLevelModifier[] = [];

	getTotal(level: Level) {
		const total = this.modifiers
			.reduce<number>((acc, modifier) => acc + modifier.getValue(level), 0);

		return total;
	}

	add(newModifier: PerLevelModifier) {
		const isRepeated = this.modifiers.some(otherModifier => otherModifier.source === newModifier.source);

		if (isRepeated) {
			throw new Error('REPEATED_MODIFIER_SOURCE');
		}

		this.modifiers.push(newModifier);
	}
}
