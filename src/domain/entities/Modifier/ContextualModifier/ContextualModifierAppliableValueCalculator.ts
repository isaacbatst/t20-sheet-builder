import {type ContextualModifierInterface} from '.';
import type {ContextInterface} from '../../Context/ContextInterface';
import {InGameContextAbstract} from '../../Context/InGameContextInterface';
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

		if (!(this.context instanceof InGameContextAbstract) || !this.modifier.condition.verify(this.context)) {
			return 0;
		}

		return value + bonusesTotal;
	}
}
