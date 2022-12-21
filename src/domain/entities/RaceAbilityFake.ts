import type {AbilityEffectType} from './Ability';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';

export class RaceAbilityFake implements RaceAbilityInterface {
	name: RaceAbilityName = RaceAbilityName.versatile;
	effectType: AbilityEffectType = 'passive';
	apply = jest.fn();
}
