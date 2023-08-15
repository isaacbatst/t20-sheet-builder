import {PassiveEffect} from '../../Ability';
import {AddEquipment} from '../../Action/AddEquipment';
import {Horns} from '../../Inventory';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class FearOfHeightsEffect extends PassiveEffect {
	override description = 'Se estiver adjacente a '
	+ 'uma queda de 3m ou mais '
	+ 'de altura (como um buraco ou '
	+ 'penhasco), você fica abalado.';

	constructor() {
		super(RaceAbilityName.fearOfHeights);
	}

	override apply(transaction: TransactionInterface): void {
		console.log('FearOfHeightsEffect.apply not implemented yet');
	}
}
