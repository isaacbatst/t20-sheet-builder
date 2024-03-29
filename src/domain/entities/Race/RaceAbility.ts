import {type SerializedSheetRaceAbility} from '..';
import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {RaceAbilityName} from './RaceAbilityName';

export type RaceAbilityInterface = AbilityInterface & {
	name: RaceAbilityName;
};

export abstract class RaceAbility extends Ability implements RaceAbilityInterface {
	constructor(
		override readonly name: RaceAbilityName,
	) {
		super(name, 'race');
	}

	serialize(): SerializedSheetRaceAbility {
		return {
			abilityType: this.abilityType,
			effects: this.effects.serialize(),
			name: this.name,
		};
	}
}
