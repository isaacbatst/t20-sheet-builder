import type {FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import type {PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import type {PerLevelModifiersListInterface} from '../Modifier/PerLevelModifier/PerLevelModifiersList';
import type {PointsBaseInterface} from './PointsInterface';
import type {PointsMaxCalculatorInterface} from './PointsMaxCalculator';

export abstract class PointsBase implements PointsBaseInterface {
	protected abstract readonly modifiers: FixedModifiersListInterface;
	protected abstract readonly perLevelModifiers: PerLevelModifiersListInterface;

	addModifier(modifier: FixedModifierInterface) {
		this.modifiers.add(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifierInterface) {
		this.perLevelModifiers.add(modifier);
	}

	getMax(calculator: PointsMaxCalculatorInterface): number {
		return calculator.calculate(this.modifiers, this.perLevelModifiers);
	}
}
