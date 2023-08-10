import {PassiveEffect} from '../../Ability';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class SonOfTormentaEffect extends PassiveEffect {
	override description: string = 'Você é uma criatura do tipo monstro '
	+ 'e recebe +5 em testes de resistência contra efeitos causados por lefeu e '
	+ 'pela Tormenta.';

	constructor() {
		super(RaceAbilityName.sonOfTormenta);
	}

	override apply(transaction: TransactionInterface): void {
		console.log('SonOfTormentaEffect.apply not implemented');
	}
}