import type {Attributes} from '../../Sheet/Attributes';
import type {FixedModifierInterface} from './FixedModifier';
import {FixedModifierAppliableValueCalculator} from './FixedModifierAppliableValueCalculator';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';

export type FixedModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<FixedModifierInterface>;

export class FixedModifiersListTotalCalculator
implements FixedModifiersListTotalCalculatorInterface {
	constructor(
		readonly attributes: Attributes,
	) {}

	calculate(modifiers: FixedModifierInterface[]): number {
		const getter = new FixedModifierAppliableValueCalculator(this.attributes);
		return modifiers.reduce((acc, modifier) => acc + modifier.getAppliableValue(getter), 0);
	}
}
