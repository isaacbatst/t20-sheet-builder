import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddFixedModifierToDefense} from '../../../../Action/AddFixedModifierToDefense';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {GeneralPowerName} from '../../GeneralPowerName';

export class ShellEffect extends PassiveEffect {
	constructor() {
		super(GeneralPowerName.shell);
	}

	override applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToDefense({
			payload: {
				modifier: new FixedModifier(GeneralPowerName.shell, 1),
			},
			transaction,
		}));
	}
}
