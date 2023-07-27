import {PassiveEffect} from '../../Ability';
import {ChangeSize} from '../../Action/ChangeSize';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {sizes} from '../../Size';
import {RaceAbilityName} from '../RaceAbilityName';

export class SlenderPlageEffect extends PassiveEffect {
	override description: string = 'Seu tamanho é Pequeno,'
    + ' mas seu deslocamento se mantém 9m.'
    + ' Apesar de pequenos, goblins são rápidos.';

	constructor() {
		super(RaceAbilityName.slenderPlage);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeSize({
			payload: {
				size: sizes.small,
				source: this.source,
			},
			transaction,
		}));
	}
}
