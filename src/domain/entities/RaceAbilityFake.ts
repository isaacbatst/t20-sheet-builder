import type {AbilityEffectType, AbilityType} from './Ability/Ability';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';

export class RaceAbilityFake implements RaceAbilityInterface {
	name: RaceAbilityName = RaceAbilityName.versatile;
	effectType: AbilityEffectType = 'passive';
	addToSheet = jest.fn();
	type: AbilityType = 'role';
}
