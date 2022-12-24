import type {AbilityType} from './Ability/Ability';
import type {AbilityEffect} from './Ability/AbilityEffect';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';

export class RaceAbilityFake implements RaceAbilityInterface {
	effects: Record<string, AbilityEffect> = {};
	name: RaceAbilityName = RaceAbilityName.versatile;
	addToSheet = jest.fn();
	abilityType: AbilityType = 'role';
}
