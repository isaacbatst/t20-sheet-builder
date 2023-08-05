import {PassiveEffect} from '../../Ability';
import {AddFixedModifierToDefense} from '../../Action/AddFixedModifierToDefense';
import {FixedModifier} from '../../Modifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class NoseEffect extends PassiveEffect {
	override description = 'Você tem olfato apurado. '
	+ ' Contra inimigos que não possa ver e em alcance curto, '
	+ ' você não fica desprevenido e camuflagem '
	+ ' total lhe causa apenas '
	+ ' 20% de chance de '
	+ ' falha.';

	constructor() {
		super(RaceAbilityName.nose);
	}

	override apply(transaction: TransactionInterface): void {
		console.log('NoseEffect.apply not implemented yet');
	}
}

