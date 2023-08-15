import {PassiveEffect} from '../../Ability';
import {AddEquipment} from '../../Action/AddEquipment';
import {Horns} from '../../Inventory';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class HornesEffect extends PassiveEffect {
	override description = 'Você possui uma '
	+ 'arma natural de chifres (dano 1d6, crítico x2, '
	+ 'perfuração). Uma vez por rodada, quando usa a ação '
	+ 'agredir para atacar com outra arma, pode gastar 1PM '
	+ 'para fazer um ataque corpo-a-corpo extra com os chifres.';

	constructor() {
		super(RaceAbilityName.hornes);
	}

	override apply(transaction: TransactionInterface): void {
		const source = 'default';
		transaction.run(new AddEquipment({payload: {equipment: new Horns(), source}, transaction}));
	}
}
