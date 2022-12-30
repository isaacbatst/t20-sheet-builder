import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {RaceAbilityInterface} from './RaceAbility';
import {RaceAbilityName} from './RaceAbilityName';

export class RaceAbilityFake implements RaceAbilityInterface {
	effects = new AbilityEffects({});
	name: RaceAbilityName = RaceAbilityName.versatile;
	addToSheet = jest.fn();
	abilityType: AbilityType = 'role';
}
