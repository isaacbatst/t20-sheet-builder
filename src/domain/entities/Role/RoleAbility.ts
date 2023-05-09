import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {type Action} from '../Action/Action';
import {ApplyRoleAbility} from '../Action/ApplyRoleAbility';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
import type {RoleAbilityName} from './RoleAbilityName';

export type RoleAbilityInterface = AbilityInterface & {
	name: RoleAbilityName;
};

export abstract class RoleAbility extends Ability implements RoleAbilityInterface {
	constructor(
		override readonly name: RoleAbilityName,
	) {
		super(name, 'role');
	}

	protected makeAction(transaction: TransactionInterface, source: TranslatableName): Action {
		return new ApplyRoleAbility({
			payload: {
				ability: this,
				source,
			},
			transaction,
		});
	}
}
