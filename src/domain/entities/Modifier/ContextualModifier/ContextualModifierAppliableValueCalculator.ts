import {type ContextualModifierInterface} from '.';
import {PreviewContextAbstract} from '../../Context/PreviewContextAbstract';
import type {ContextInterface} from '../../Context/ContextInterface';
import type {Attribute, Attributes} from '../../Sheet/Attributes';
import type {ModifierAppliableValueCalculatorInterface} from '../ModifierInterface';
import {ModifierAppliableValueCalculator} from '../ModifierValueGetter';

export class ContextualModifierAppliableValueCalculator
	extends ModifierAppliableValueCalculator
	implements ModifierAppliableValueCalculatorInterface {
	constructor(
		attributes: Attributes,
		readonly context: ContextInterface,
		readonly modifier: ContextualModifierInterface,
	) {
		super(attributes);
	}

	calculate(value: number, attributes: Attribute[]): number {
		const bonusesTotal = this.getAttributesBonusesTotal(attributes);

		if (
			this.context instanceof PreviewContextAbstract
			&& this.modifier.condition.verify(this.context)
		) {
			return value + bonusesTotal;
		}

		return 0;
	}
}
