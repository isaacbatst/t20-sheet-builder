import {BuildingPoints} from '../BuildingPoints';
import type {PointsMaxCalculatorInterface} from '../PointsMaxCalculator';
import {LifePoints} from './LifePoints';

export class BuildingLifePoints extends BuildingPoints<LifePoints> {
	build(maxCalculator: PointsMaxCalculatorInterface): LifePoints {
		return new LifePoints({
			maxCalculator,
			modifiers: this.modifiers,
			perLevelModifiers: this.perLevelModifiers,
		});
	}
}
