import {PassiveEffect} from '../../../Ability';
import {AddResistance} from '../../../Action/AddResistance';
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
		const addLefeuResistance = new AddResistance({
			payload: {
				resistance: ResistanceName.lefeu,
				value: 5,
				source: this.source,
			},
			transaction,
		});

		const addTormentaResistance = new AddResistance({
			payload: {
				resistance: ResistanceName.tormenta,
				value: 5,
				source: this.source,
			},
			transaction,
		});
		transaction.run(addLefeuResistance);
		transaction.run(addTormentaResistance);
	}
}
