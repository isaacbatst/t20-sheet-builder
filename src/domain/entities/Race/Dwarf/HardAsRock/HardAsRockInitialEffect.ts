import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HardAsRockInitialEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	applyToSheet(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 3);
		transaction.run(new AddFixedModifierToLifePoints({
			payload: {
				modifier,
			},
			transaction,
		}));
	}
}
