import {PassiveEffect} from '../../../Ability';
import {ChangeGrantPowersCount} from '../../../Action/ChangeGrantPowersCount';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../RoleAbilityName';

export class FaithfulDevoteEffect extends PassiveEffect {
	override description: string = 'Você se torna devoto de um'
  + ' deus maior. Veja as regras de devotos na página 96.'
  + ' Ao contrário de devotos normais, você recebe dois'
  + ' poderes concedidos por se tornar devoto, em vez de'
  + ' apenas um.';

	constructor() {
		super(RoleAbilityName.faithfulDevote);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeGrantPowersCount({
			payload: {
				count: 2,
				source: this.source,
			},
			transaction,
		}));
	}
}
