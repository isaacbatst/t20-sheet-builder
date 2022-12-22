import type {ContextInterface} from './Context';
import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';
import type {RoleInterface} from './Role/RoleInterface';

type GetMaxLifePointsParams = {
	context: ContextInterface; role: RoleInterface; constitution: number; level: number;
};
export class LifePoints {
	private static get repeatedModifierError() {
		return 'REPEATED_LIFE_POINTS_MODIFIER';
	}

	readonly modifiers: ModifiersList = new ModifiersList(LifePoints.repeatedModifierError);

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	getMax(params: GetMaxLifePointsParams) {
		return this.modifiers.getTotal(params.context)
			+ params.role.initialLifePoints
			+ params.constitution
			+ (params.role.lifePointsPerLevel * (params.level - 1));
	}
}
