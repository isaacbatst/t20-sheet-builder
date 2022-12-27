import type {Attribute} from '../Attributes';
import type {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {FixedModifiersListTotalCalculatorInterface} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import type {DefenseBaseCalculator} from './DefenseBaseCalculator';

export class DefenseTotalCalculator {
	constructor(
		readonly baseCalculator: DefenseBaseCalculator,
		readonly fixedCalculator: FixedModifiersListTotalCalculatorInterface,
	) {}

	calculate(attribute: Attribute, fixedModifiers: FixedModifiersList) {
		return this.baseCalculator.calculate(attribute)
      + fixedModifiers.getTotal(this.fixedCalculator);
	}
}
