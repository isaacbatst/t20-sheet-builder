import {PassiveEffect} from '../../../Ability';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HeredrimmTraditionEffect extends PassiveEffect {
	override description = 'Você é perito nas armas tradicionais'
	+ ' anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você,'
	+ ' todos os machados, martelos, marretas e picaretas são armas simples.'
	+ ' Você recebe +2 em ataques com essas armas.';

	constructor() {
		super(RaceAbilityName.heredrimmTradition);
	}

	override apply(transaction: TransactionInterface): void {
		console.log('HeredrimmTraditionProficiencyEffect.apply not implemented');
	}
}
