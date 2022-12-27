import {BuildingPoints} from './Points/BuildingPoints';
import {ManaPoints} from './Points/ManaPoints/ManaPoints';
import type {PointsMaxCalculatorInterface} from './Points/PointsMaxCalculator';

export class BuildingManaPoints extends BuildingPoints<ManaPoints> {
	build(maxCalculator: PointsMaxCalculatorInterface): ManaPoints {
		return new ManaPoints({
			maxCalculator,
			modifiers: this.modifiers,
			perLevelModifiers: this.perLevelModifiers,
		});
	}
}
