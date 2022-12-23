import type {ContextInterface} from './Context';
import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';
import type {RoleInterface} from './Role/RoleInterface';

type GetMaxManaPointsParams = {
	context: ContextInterface; role: RoleInterface; level: number;
};

export class ManaPoints {
	private static get repeatedModifierError() {
		return 'REPEATED_MANA_POINTS_MODIFIER';
	}

	readonly modifiers: ModifiersList = new ModifiersList(ManaPoints.repeatedModifierError);
	private current: number;

	constructor() {
		this.current = 0;
	}

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	getMax(params: GetMaxManaPointsParams) {
		return this.modifiers.getTotal(params.context)
			+ (params.role.manaPerLevel * params.level);
	}

	getCurrent() {
		return this.current;
	}

	setCurrent(value: number) {
		const finalValue = this.current - value;

		if (finalValue < 0) {
			throw new Error('INVALID_NEGATIVE_MANA_BALANCE');
		}

		this.current -= value;
	}
}
