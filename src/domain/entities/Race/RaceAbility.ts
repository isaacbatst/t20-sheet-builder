import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {type Action} from '../Action/Action';
import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
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

	protected makeAction(transaction: TransactionInterface, source: TranslatableName): Action {
		return new ApplyRaceAbility({
			payload: {
				ability: this,
				source,
			},
			transaction,
		});
	}
}
