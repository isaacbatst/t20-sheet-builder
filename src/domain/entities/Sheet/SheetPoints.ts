import {type ModifierInterface} from '../Modifier/ModifierInterface';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {type Points} from '../Points/Points';
import {PointsMaxCalculatorFactory} from '../Points/PointsMaxCalculatorFactory';
import {type Attributes} from './Attributes';
import {type Level} from './Level';
import {type SheetPointsInterface} from './SheetPointsInterface';

export class SheetPoints implements SheetPointsInterface {
	constructor(private readonly points: Points) {}

	addModifier(modifier: ModifierInterface): void {
		this.points.addModifier(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifierInterface): void {
		this.points.addPerLevelModifier(modifier);
	}

	getMax(attributes: Attributes, level: Level): number {
		const calculator = PointsMaxCalculatorFactory.make(attributes, level);
		return this.points.getMax(calculator);
	}
}
