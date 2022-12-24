import type {AbilityType} from '../Ability/Ability';
import type {AbilityEffect} from '../Ability/AbilityEffect';
import type {RoleAbilityInterface} from './RoleAbility';
import {RoleAbilityName} from './RoleAbilityName';

export class RoleAbilityFake implements RoleAbilityInterface {
	effects: Record<string, AbilityEffect> = {};
	name: RoleAbilityName = RoleAbilityName.specialAttack;
	addToSheet = jest.fn();
	abilityType: AbilityType = 'role';
}
