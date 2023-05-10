import type {Attributes} from '../../Sheet/Attributes';
import type {Level} from '../../Sheet/Level';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';
import {PerLevelModifierAppliableValueCalculator} from './PerLevelModifierAppliableValueCalculator';

export type PerLevelModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<PerLevelModifierInterface>;

export class PerLevelModifiersListTotalCalculator implements PerLevelModifiersListTotalCalculatorInterface {
	constructor(
		readonly attributes: Attributes,
		readonly level: Level,
	) {}

	calculate(modifiers: PerLevelModifierInterface[]): number {
		return modifiers.reduce((acc, modifier) => {
			const getter = new PerLevelModifierAppliableValueCalculator(
				this.attributes,
				this.level,
				modifier,
			);
			return modifier.getAppliableValue(getter) + acc;
		}, 0);
	}
}
