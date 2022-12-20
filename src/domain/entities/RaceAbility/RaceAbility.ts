import type {AbilityEffectType, AbilityInterface} from '../Ability';
import {Ability} from '../Ability';
import type {RaceAbilityNameEnum} from './RaceAbilityName';

export type RaceAbilityInterface = AbilityInterface & {
	name: RaceAbilityNameEnum;
};

export abstract class RaceAbility extends Ability implements RaceAbilityInterface {
	constructor(
		readonly name: RaceAbilityNameEnum,
		effectType: AbilityEffectType,
	) {
		super(name, effectType);
	}
}
