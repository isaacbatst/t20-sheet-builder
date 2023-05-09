import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddEquipment} from '../../../../Action/AddEquipment';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';
import {type ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusEffect extends PassiveEffect {
	get description() {
		return 'Você lança magias através de um foco — uma varinha, cajado, chapéu...';
	}

	constructor(
		readonly focus: ArcanistPathWizardFocus,
	) {
		super(RoleAbilityName.arcanistPath);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new AddEquipment({
			payload: {
				equipment: this.focus.equipment,
				source: ArcanistPathName.wizard,
			},
			transaction,
		}));
	}
}
