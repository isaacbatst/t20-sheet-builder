import {PassiveEffect} from '../../Ability';
import {LearnSpell} from '../../Action/LearnSpell';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {ControlPlants} from '../../Spell/ControlPlants/ControlPlants';
import {RaceAbilityName} from '../RaceAbilityName';

export class PlantsFriendEffect extends PassiveEffect {
	override description: string = 'Você pode lançar a magia'
  + ' Controlar Plantas (atributo-chave Sabedoria). Caso'
  + ' aprenda novamente essa magia, seu custo diminui'
  + ' em –1 PM.';

	constructor() {
		super(RaceAbilityName.plantsFriend);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new LearnSpell({
			payload: {
				source: RaceAbilityName.plantsFriend,
				spell: new ControlPlants(),
				needsCircle: false,
			},
			transaction,
		}));
	}
}
