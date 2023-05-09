import type {Attribute} from '../Sheet/Attributes';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {DefenseInterface} from './DefenseInterface';
import type {DefenseTotalCalculator} from './DefenseTotalCalculator';
import {type ModifierInterface} from '../Modifier/ModifierInterface';

export class Defense implements DefenseInterface {
	attribute: Attribute = 'dexterity';
	readonly fixedModifiers = new FixedModifiersList();

	addFixedModifier(modifier: ModifierInterface): void {
		this.fixedModifiers.add(modifier);
	}

	getTotal(calculator: DefenseTotalCalculator) {
		return calculator.calculate(this.attribute, this.fixedModifiers);
	}
}
