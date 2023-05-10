import type {Attributes} from '../../Sheet/Attributes';
import type {ContextInterface} from '../../Context/ContextInterface';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import {ContextualModifierAppliableValueCalculator} from './ContextualModifierAppliableValueCalculator';

export type ContextualModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<ContextualModifierInterface>;

export class ContextualModifiersListTotalCalculator
implements ContextualModifiersListTotalCalculatorInterface {
	constructor(
		readonly context: ContextInterface,
		readonly attributes: Attributes,
	) {}

	calculate(modifiers: ContextualModifierInterface[]): number {
		return modifiers.reduce((acc, modifier) => {
			const getter = new ContextualModifierAppliableValueCalculator(this.attributes, this.context, modifier);
			return modifier.getAppliableValue(getter) + acc;
		}, 0);
	}
}
