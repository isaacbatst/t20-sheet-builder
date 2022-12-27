import type {Attributes} from '../../Attributes';
import type {FixedModifierInterface} from './FixedModifier';
import {FixedModifierValueGetter} from './FixedModifierValueGetter';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';

export type FixedModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<FixedModifierInterface>;

export class FixedModifiersListTotalCalculator
implements FixedModifiersListTotalCalculatorInterface {
	constructor(
		readonly attributes: Attributes,
	) {}

	calculate(modifiers: FixedModifierInterface[]): number {
		const getter = new FixedModifierValueGetter(this.attributes);
		return modifiers.reduce((acc, modifier) => acc + modifier.getValue(getter), 0);
	}
}
