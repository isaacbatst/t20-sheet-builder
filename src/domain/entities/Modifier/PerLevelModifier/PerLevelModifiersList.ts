import {type Level} from '../../Sheet';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export type PerLevelModifiersListInterface = ModifiersListInterface<PerLevelModifierInterface> & {
	getTotalPerLevel(level: Level): number;
};

export class PerLevelModifiersList extends ModifiersList<PerLevelModifierInterface>
	implements PerLevelModifiersListInterface {
	getTotalPerLevel(level: Level): number {
		const isFirstLevel = level === 1;
		return this.modifiers
			.reduce((acc, modifier) =>
				acc + (isFirstLevel && !modifier.includeFirstLevel ? 0 : modifier.getPerLevelValue()),
			0);
	}
}
