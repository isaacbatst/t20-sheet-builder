import {PassiveEffect} from '../../../Ability';
import {ResistanceName} from '../../../Resistance/ResistanceName';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class SonOfTormentaEffect extends PassiveEffect {
	override description: string = 'Você é uma criatura do tipo monstro '
	+ 'e recebe +5 em testes de resistência contra efeitos causados por Lefeu e '
	+ 'pela Tormenta.';

	constructor() {
		super(RaceAbilityName.sonOfTormenta);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.sheet.getSheetResistences().addResistance(ResistanceName.tormenta, 5, RaceAbilityName.sonOfTormenta);
		transaction.sheet.getSheetResistences().addResistance(ResistanceName.lefeu, 5, RaceAbilityName.sonOfTormenta);
	}
}
