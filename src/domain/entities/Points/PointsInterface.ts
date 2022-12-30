import type {FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import type {PointsMaxCalculatorInterface} from './PointsMaxCalculator';

export type PointsInterface = {
	addModifier(modifier: FixedModifierInterface): void;
	addPerLevelModifier(modifier: PerLevelModifierInterface): void;
	getMax(calculator: PointsMaxCalculatorInterface): number;
};
