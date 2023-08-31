import {type Context} from '../../Context';
import type {Attributes} from '../../Sheet/Attributes';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';
import {ContextualModifierAppliableValueCalculator} from './ContextualModifierAppliableValueCalculator';
import type {ContextualModifierInterface} from './ContextualModifierInterface';

export type ContextualModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<ContextualModifierInterface>;

export class ContextualModifiersListTotalCalculator
implements ContextualModifiersListTotalCalculatorInterface {
	constructor(
		readonly context: Context,
		readonly attributes: Attributes,
	) {}

	calculate(modifiers: ContextualModifierInterface[]): number {
		return modifiers.reduce((acc, modifier) => {
			const getter = new ContextualModifierAppliableValueCalculator(this.attributes, this.context, modifier);
			return modifier.getAppliableValue(getter) + acc;
		}, 0);
	}
}
