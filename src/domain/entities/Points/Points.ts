import type {FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {PerLevelModifiersList} from '../Modifier/PerLevelModifier/PerLevelModifiersList';
import type {PointsInterface} from './PointsInterface';
import type {PointsMaxCalculatorInterface} from './PointsMaxCalculator';

export abstract class Points implements PointsInterface {
	readonly modifiers: FixedModifiersListInterface = new FixedModifiersList();
	readonly perLevelModifiers: PerLevelModifiersList = new PerLevelModifiersList();

	constructor(
		readonly type: 'mana' | 'life',
	) {}

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
