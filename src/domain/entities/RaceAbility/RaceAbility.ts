import type {AbilityEffectType, AbilityInterface} from '../Ability';
import {Ability} from '../Ability';
import type {RaceAbilityName} from './RaceAbilityName';

export type RaceAbilityInterface = AbilityInterface & {
	name: RaceAbilityName;
};

export abstract class RaceAbility extends Ability implements RaceAbilityInterface {
	constructor(
		readonly name: RaceAbilityName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType);
	}
}
