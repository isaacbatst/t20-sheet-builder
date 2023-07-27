import {PassiveEffect} from '../../Ability';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class IngeniousEffect extends PassiveEffect {
	override description: string = 'Você não sofre penalidades em'
  + ' testes de perícia por não usar ferramentas. Se usar a'
  + ' ferramenta necessária, recebe +2 no teste de perícia.';

	constructor() {
		super(RaceAbilityName.ingenious);
	}

	override apply(transaction: TransactionInterface): void {
		console.log('IngeniousEffect.apply not implemented yet');
	}
}
