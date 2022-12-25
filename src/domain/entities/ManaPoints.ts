import type {ContextInterface} from './Context';
import type {ModifierInterface, ModifiersList} from './ModifierList';
import type {PerLevelModifiersList} from './PerLevelModifiersList';
import type {RoleInterface} from './Role/RoleInterface';

type GetMaxManaPointsParams = {
	context: ContextInterface; role: RoleInterface; level: number;
};

type ManaPointsParams = GetMaxManaPointsParams & {
	modifiers: ModifiersList;
	perLevelModifiers: PerLevelModifiersList;
};

export type ManaPointsInterface = {
	addModifier(modifier: ModifierInterface): void;
};

export class ManaPoints implements ManaPointsInterface {
	static get repeatedModifierError() {
		return 'REPEATED_MANA_POINTS_MODIFIER';
	}

	readonly modifiers: ModifiersList;
	readonly perLevelModifiers: PerLevelModifiersList;
	private current: number;

	constructor(params: ManaPointsParams) {
		this.perLevelModifiers = params.perLevelModifiers;
		this.modifiers = params.modifiers;
		this.current = this.getMax(params);
	}

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	getMax(params: GetMaxManaPointsParams) {
		return this.modifiers.getTotal(params.context)
			+ this.perLevelModifiers.getTotal(params.level)
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
