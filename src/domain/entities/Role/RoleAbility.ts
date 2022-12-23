import type {AbilityEffectType} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {ApplyRoleAbility} from '../Action/ApplyRoleAbility';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import type {RoleAbilityName} from './RoleAbilityName';

export type RoleAbilityInterface = Ability & {
	name: RoleAbilityName;
};

export abstract class RoleAbility extends Ability {
	constructor(
		override readonly name: RoleAbilityName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType, 'role');
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new ApplyRoleAbility({
			ability: this,
			source,
		}));
	}
}
