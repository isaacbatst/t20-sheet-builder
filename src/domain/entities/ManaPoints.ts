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

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	getMax(params: GetMaxManaPointsParams) {
		return this.modifiers.getTotal(params.context)
			+ (params.role.manaPerLevel * params.level);
	}
}
