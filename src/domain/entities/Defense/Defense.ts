import type {Attribute} from '../Attributes';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {DefenseInterface} from './DefenseInterface';
import type {DefenseTotalCalculator} from './DefenseTotalCalculator';

export class Defense implements DefenseInterface {
	attribute: Attribute = 'dexterity';
	readonly fixedModifiers = new FixedModifiersList();

	getTotal(calculator: DefenseTotalCalculator) {
		return calculator.calculate(this.attribute, this.fixedModifiers);
	}
}
