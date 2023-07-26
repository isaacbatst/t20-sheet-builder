import {PassiveEffect} from '../../Ability';
import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class GloriennGraceEffect extends PassiveEffect {
	override description = 'Seu deslocamento é 12m (em vez de 9m).';

	constructor() {
		super(RaceAbilityName.gloriennGrace);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeDisplacement({
			payload: {
				displacement: 12,
				source: this.source,
			},
			transaction,
		}));
	}
}
