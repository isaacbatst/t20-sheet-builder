import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {RoleAbilityInterface} from './RoleAbility';
import {RoleAbilityName} from './RoleAbilityName';

export class RoleAbilityFake implements RoleAbilityInterface {
	effects = new AbilityEffects({});
	name: RoleAbilityName = RoleAbilityName.specialAttack;
	addToSheet = jest.fn();
	abilityType: AbilityType = 'role';
}
