import type {AbilityEffectType} from './Ability';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';

export class RaceAbilityFake implements RaceAbilityInterface {
	name: RaceAbilityNameEnum = RaceAbilityNameEnum.versatile;
	effectType: AbilityEffectType = 'passive';
	apply = jest.fn();
}
