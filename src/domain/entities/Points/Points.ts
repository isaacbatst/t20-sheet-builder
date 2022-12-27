import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import type {PerLevelModifiersList} from '../Modifier/PerLevelModifier/PerLevelModifiersList';
import {PointsBase} from './PointsBase';
import type {PointsBaseInterface} from './PointsInterface';
import type {PointsMaxCalculatorInterface} from './PointsMaxCalculator';

export type PointsParams = {
	modifiers: FixedModifiersListInterface;
	perLevelModifiers: PerLevelModifiersList;
	maxCalculator: PointsMaxCalculatorInterface;
};

export type PointsInterface = PointsBaseInterface & {
	getCurrent(): number;
};

export abstract class Points extends PointsBase implements PointsBaseInterface {
	protected modifiers: FixedModifiersListInterface;
	protected perLevelModifiers: PerLevelModifiersList;
	protected current: number;
	constructor(
		params: PointsParams,
	) {
		super();
		this.modifiers = params.modifiers;
		this.perLevelModifiers = params.perLevelModifiers;
		this.current = params.maxCalculator.calculate(params.modifiers, params.perLevelModifiers);
	}

	getCurrent() {
		return this.current;
	}
}
