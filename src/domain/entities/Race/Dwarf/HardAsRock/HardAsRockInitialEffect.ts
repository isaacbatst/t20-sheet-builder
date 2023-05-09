import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HardAsRockInitialEffect extends PassiveEffect {
	get description() {
		return 'Você recebe +3 pontos de vida no 1º nível';
	}

	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 3);
		transaction.run(new AddFixedModifierToLifePoints({
			payload: {
				modifier,
			},
			transaction,
		}));
	}
}
