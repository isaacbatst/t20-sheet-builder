import type {ContextInterface} from './Context';
import type {PerLevelModifier} from './Modifier/PerLevelModifier';
import type {ModifierInterface} from './ModifierList';
import type {ModifiersList} from './ModifierList';
import type {PerLevelModifiersList} from './PerLevelModifiersList';
import type {RoleInterface} from './Role/RoleInterface';

type GetMaxLifePointsParams = {
	context: ContextInterface; role: RoleInterface; constitution: number; level: number;
};

type LifePointsParams = GetMaxLifePointsParams & {
	modifiers: ModifiersList;
	perLevelModifiers: PerLevelModifiersList;
};

export type LifePointsInterface = {
	addModifier(modifier: ModifierInterface): void;
	addPerLevelModifier(modifier: PerLevelModifier): void;
};

export class LifePoints implements LifePointsInterface {
	readonly modifiers: ModifiersList;
	readonly perLevelModifiers: PerLevelModifiersList;
	private current: number;

	constructor(
		params: LifePointsParams,
	) {
		this.modifiers = params.modifiers;
		this.perLevelModifiers = params.perLevelModifiers;
		this.current = this.getMax({constitution: params.constitution, context: params.context, level: params.level, role: params.role});
	}

	receiveDamage(value: number) {
		this.current -= value;
	}

	heal(value: number) {
		this.current += value;
	}

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifier) {
		this.perLevelModifiers.add(modifier);
	}

	getMax(params: GetMaxLifePointsParams) {
		return this.modifiers.getTotal(params.context)
			+ params.role.initialLifePoints
			+ params.constitution
			+ (params.role.lifePointsPerLevel * (params.level - 1))
			+ this.perLevelModifiers.getTotal(params.level);
	}

	getCurrent() {
		return this.current;
	}
}
