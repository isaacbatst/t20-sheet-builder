import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {RaceAbilityInterface} from './RaceAbility';
import {RaceAbilityName} from './RaceAbilityName';
import {vi} from 'vitest';

export class RaceAbilityFake implements RaceAbilityInterface {
	effects = new AbilityEffects({});
	name: RaceAbilityName = RaceAbilityName.versatile;
	addToSheet = vi.fn();
	abilityType: AbilityType = 'role';
}
