import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
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
}
