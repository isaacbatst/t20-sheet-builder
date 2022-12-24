import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {ApplyRoleAbility} from '../Action/ApplyRoleAbility';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {Translatable} from '../Translator';
import type {RoleAbilityName} from './RoleAbilityName';

export type RoleAbilityInterface = AbilityInterface & {
	name: RoleAbilityName;
};

export abstract class RoleAbility extends Ability {
	constructor(
		override readonly name: RoleAbilityName,
	) {
		super(name, 'role');
	}

	protected getAddAction(source: Translatable): ActionInterface {
		return new ApplyRoleAbility({
			ability: this,
			source,
		});
	}
}
