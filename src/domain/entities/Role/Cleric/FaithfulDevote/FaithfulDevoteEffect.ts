import {PassiveEffect} from '../../../Ability';
import {ChangeGrantPowersCount} from '../../../Action/ChangeGrantPowersCount';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {type RoleAbilityName} from '../../RoleAbilityName';

export class FaithfulDevoteEffect extends PassiveEffect {
	static description = {
		cleric: 'Você se torna devoto de um'
			+ ' deus maior. Veja as regras de devotos na página 96.'
			+ ' Ao contrário de devotos normais, você recebe dois'
			+ ' poderes concedidos por se tornar devoto, em vez de'
			+ ' apenas um.',
		druid: 'druidas (Allihanna, Megalokk'
			+ ' ou Oceano). Veja as regras de devotos na página 96.'
			+ ' Ao contrário de devotos normais, você recebe dois'
			+ ' poderes concedidos por se tornar devoto, em vez de'
			+ ' apenas um.',
	};

	override description: string;

	constructor(role: 'cleric' | 'druid', name: RoleAbilityName.clericFaithfulDevote | RoleAbilityName.druidFaithfulDevote) {
		super(name);

		this.description = FaithfulDevoteEffect.description[role];
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
