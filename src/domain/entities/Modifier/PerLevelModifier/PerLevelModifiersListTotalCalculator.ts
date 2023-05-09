import type {Attributes} from '../../Sheet/Attributes';
import type {Level} from '../../Sheet/Level';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';
import {PerLevelModifierValueGetter} from './PerLevelModifierValueGetter';

export type PerLevelModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<PerLevelModifierInterface>;

export class PerLevelModifiersListTotalCalculator implements PerLevelModifiersListTotalCalculatorInterface {
	constructor(
		readonly attributes: Attributes,
		readonly level: Level,
	) {}

	calculate(modifiers: PerLevelModifierInterface[]): number {
		return modifiers.reduce((acc, modifier) => {
			const getter = new PerLevelModifierValueGetter(
				this.attributes,
				modifier.includeFirstLevel,
				this.level,
				modifier.frequency,
			);
			return modifier.getValue(getter) + acc;
		}, 0);
	}
}
