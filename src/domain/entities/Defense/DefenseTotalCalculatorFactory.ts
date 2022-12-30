import type {Attributes} from '../Sheet/Attributes';
import {FixedModifiersListTotalCalculator} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {DefenseBaseCalculator} from './DefenseBaseCalculator';
import {DefenseTotalCalculator} from './DefenseTotalCalculator';

export class DefenseTotalCalculatorFactory {
	static make(attributes: Attributes, armorBonus: number, shieldBonus: number) {
		const baseCalculator = new DefenseBaseCalculator(attributes, armorBonus, shieldBonus);
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		return new DefenseTotalCalculator(baseCalculator, fixedCalculator);
	}
}
