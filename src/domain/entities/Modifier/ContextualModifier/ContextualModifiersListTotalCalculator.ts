import type {Attributes} from '../../Sheet/Attributes';
import type {ContextInterface} from '../../Context/ContextInterface';
import type {ModifiersListTotalCalculator} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import {ContextualModifierValueGetter} from './ContextualModifierValueGetter';

export type ContextualModifiersListTotalCalculatorInterface = ModifiersListTotalCalculator<ContextualModifierInterface>;

export class ContextualModifiersListTotalCalculator
implements ContextualModifiersListTotalCalculatorInterface {
	constructor(
		readonly context: ContextInterface,
		readonly attributes: Attributes,
	) {}

	calculate(modifiers: ContextualModifierInterface[]): number {
		return modifiers.reduce((acc, modifier) => {
			const getter = new ContextualModifierValueGetter(this.attributes, this.context, modifier.condition.verify);
			return modifier.getValue(getter) + acc;
		}, 0);
	}
}
