import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddPerLevelModifierToLifePoints} from '../../../Action/AddPerLevelModifierToLifePoints';
import {PerLevelModifier} from '../../../Modifier/PerLevelModifier/PerLevelModifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HardAsRockPerLevelEffect extends PassiveEffect {
	get description() {
		return 'Você recebe +1 de vida por nível após o primeiro';
	}

	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	apply(transaction: TransactionInterface): void {
		transaction.run(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier(this.source, 1, false),
			},
			transaction,
		}));
	}
}
