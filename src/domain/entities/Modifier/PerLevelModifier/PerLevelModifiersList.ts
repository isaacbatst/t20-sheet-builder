import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export type PerLevelModifiersListInterface = ModifiersListInterface<PerLevelModifierInterface> & {
	getTotalPerLevel(firstLevel: boolean): number;
};

export class PerLevelModifiersList extends ModifiersList<PerLevelModifierInterface>
	implements PerLevelModifiersListInterface {
	getTotalPerLevel(firstLevel: boolean): number {
		return this.modifiers
			.reduce((acc, modifier) =>
				acc + (firstLevel && !modifier.includeFirstLevel ? 0 : modifier.value),
			0);
	}
}
