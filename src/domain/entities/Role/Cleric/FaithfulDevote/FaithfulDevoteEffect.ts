import {PassiveEffect} from '../../../Ability';
import {ChangeGrantPowersCount} from '../../../Action/ChangeGrantPowersCount';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {type RoleAbilityName} from '../../RoleAbilityName';

export class FaithfulDevoteEffect extends PassiveEffect {
	static clericDescription = 'Você se torna devoto de um'
  + ' deus maior. Veja as regras de devotos na página 96.'
  + ' Ao contrário de devotos normais, você recebe dois'
  + ' poderes concedidos por se tornar devoto, em vez de'
  + ' apenas um.';

	static druidDescription = 'druidas (Allihanna, Megalokk'
		+ ' ou Oceano). Veja as regras de devotos na página 96.'
		+ ' Ao contrário de devotos normais, você recebe dois'
		+ ' poderes concedidos por se tornar devoto, em vez de'
		+ ' apenas um.';

	override description: string;

	constructor(role: 'cleric' | 'druid', name: RoleAbilityName.clericFaithfulDevote | RoleAbilityName.druidFaithfulDevote) {
		super(name);

		if (role === 'cleric') {
			this.description = FaithfulDevoteEffect.clericDescription;
		}

		this.description = FaithfulDevoteEffect.druidDescription;
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
