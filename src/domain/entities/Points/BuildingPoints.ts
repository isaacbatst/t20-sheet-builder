import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import {PerLevelModifiersList} from '../Modifier/PerLevelModifier/PerLevelModifiersList';
import type {Points} from './Points';
import {PointsBase} from './PointsBase';
import type {PointsMaxCalculatorInterface} from './PointsMaxCalculator';

export abstract class BuildingPoints<T extends Points> extends PointsBase {
	readonly modifiers: FixedModifiersListInterface = new FixedModifiersList();
	readonly perLevelModifiers: PerLevelModifiersList = new PerLevelModifiersList();

	abstract build(maxCalculator: PointsMaxCalculatorInterface): T;
}
