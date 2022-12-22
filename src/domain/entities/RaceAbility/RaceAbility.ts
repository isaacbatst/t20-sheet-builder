import type {AbilityEffectType, AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {RaceAbilityName} from './RaceAbilityName';

export type RaceAbilityInterface = AbilityInterface & {
	name: RaceAbilityName;
};

export abstract class RaceAbility extends Ability implements RaceAbilityInterface {
	constructor(
		override readonly name: RaceAbilityName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType);
	}
}
