import {PassiveEffect} from '../../../Ability';
import {AddResistance} from '../../../Action/AddResistance';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';
import {type QareenElementalResistanceType} from '../QareenElementalResistanceType';

export class ElementalResistanceEffect extends PassiveEffect {
	override description: string = 'Conforme sua'
  + ' ascendência, você recebe redução 10 a um tipo de'
  + ' dano. Escolha uma: frio (qareen da água), eletricidade'
  + ' (do ar), fogo (do fogo), ácido (da terra), luz (da'
  + ' luz) ou trevas (qareen das trevas).';

	constructor(readonly resistanceType: QareenElementalResistanceType) {
		super(RaceAbilityName.elementalResistance);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new AddResistance({
			payload: {
				resistance: this.resistanceType,
				source: this.source,
				value: 10,
			},
			transaction,
		}));
	}
}
