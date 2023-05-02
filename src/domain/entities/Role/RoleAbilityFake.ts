import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {RoleAbilityInterface} from './RoleAbility';
import {RoleAbilityName} from './RoleAbilityName';
import {vi} from 'vitest';

export class RoleAbilityFake implements RoleAbilityInterface {
	effects = new AbilityEffects({});
	name: RoleAbilityName = RoleAbilityName.specialAttack;
	addToSheet = vi.fn();
	abilityType: AbilityType = 'role';
}
