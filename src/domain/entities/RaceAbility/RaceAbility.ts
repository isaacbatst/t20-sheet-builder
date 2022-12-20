import type {AbilityEffectType} from '../Ability';
import {Ability} from '../Ability';
import type {RaceAbilityNameEnum} from './RaceAbilityName';

export abstract class RaceAbility extends Ability {
	constructor(
		readonly name: RaceAbilityNameEnum,
		effectType: AbilityEffectType,
	) {
		super(name, effectType);
	}
}
