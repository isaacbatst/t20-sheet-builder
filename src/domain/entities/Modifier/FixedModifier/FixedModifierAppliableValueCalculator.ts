import type {Attribute} from '../../Sheet/Attributes';
import type {ModifierAppliableValueCalculatorInterface} from '../ModifierInterface';
import {ModifierAppliableValueCalculator} from '../ModifierValueGetter';

export class FixedModifierAppliableValueCalculator extends ModifierAppliableValueCalculator
	implements ModifierAppliableValueCalculatorInterface {
	calculate(baseValue: number, attributeBonuses: Attribute[]): number {
		return baseValue + this.getAttributesBonusesTotal(attributeBonuses);
	}
}
