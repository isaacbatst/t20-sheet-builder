import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import type {FixedModifiersListTotalCalculatorInterface} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import type {PerLevelModifiersListInterface} from '../Modifier/PerLevelModifier/PerLevelModifiersList';
import type {PerLevelModifiersListTotalCalculatorInterface} from '../Modifier/PerLevelModifier/PerLevelModifiersListTotalCalculator';

export type PointsMaxCalculatorInterface = {
	calculate(
		fixedModifiers: FixedModifiersListInterface,
		perLevelModifiers: PerLevelModifiersListInterface
	): number;
};

export class PointsMaxCalculator implements PointsMaxCalculatorInterface {
	constructor(
		readonly fixedModifiersCalculator: FixedModifiersListTotalCalculatorInterface,
		readonly perLevelModifiersCalculator: PerLevelModifiersListTotalCalculatorInterface,
	) {}

	calculate(fixedModifiers: FixedModifiersListInterface, perLevelModifiers: PerLevelModifiersListInterface): number {
		return fixedModifiers.getTotal(this.fixedModifiersCalculator)
      + perLevelModifiers.getTotal(this.perLevelModifiersCalculator);
	}
}
