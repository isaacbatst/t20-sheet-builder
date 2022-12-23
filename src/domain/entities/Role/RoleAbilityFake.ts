import type {AbilityEffectType, AbilityType} from '../Ability/Ability';
import type {RoleAbilityInterface} from './RoleAbility';
import {RoleAbilityName} from './RoleAbilityName';

export class RoleAbilityFake implements RoleAbilityInterface {
	name: RoleAbilityName = RoleAbilityName.specialAttack;
	effectType: AbilityEffectType = 'active';
	addToSheet = jest.fn();
	abilityType: AbilityType = 'role';
}
