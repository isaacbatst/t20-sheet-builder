import type {Attributes} from '../Attributes';
import type {Level} from '../Levels';
import {FixedModifiersListTotalCalculator} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {PerLevelModifiersListTotalCalculator} from '../Modifier/PerLevelModifier/PerLevelModifiersListTotalCalculator';
import {PointsMaxCalculator} from './PointsMaxCalculator';

export class PointsMaxCalculatorFactory {
	static make(attributes: Attributes, level: Level) {
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		const perLevelCalculator = new PerLevelModifiersListTotalCalculator(attributes, level);
		return new PointsMaxCalculator(fixedCalculator, perLevelCalculator);
	}
}
