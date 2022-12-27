import {BuildingPoints} from '../BuildingPoints';
import type {PointsMaxCalculatorInterface} from '../PointsMaxCalculator';
import {ManaPoints} from './ManaPoints';

export class BuildingManaPoints extends BuildingPoints<ManaPoints> {
	build(maxCalculator: PointsMaxCalculatorInterface): ManaPoints {
		return new ManaPoints({
			modifiers: this.modifiers,
			perLevelModifiers: this.perLevelModifiers,
			maxCalculator,
		});
	}
}
