import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {Translatable} from '../Translator';
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

	protected getAddAction(source: Translatable): ActionInterface {
		return new ApplyRaceAbility({
			ability: this,
			source,
		});
	}
}
