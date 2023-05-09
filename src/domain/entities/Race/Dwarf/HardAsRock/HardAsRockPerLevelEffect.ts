import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddPerLevelModifierToLifePoints} from '../../../Action/AddPerLevelModifierToLifePoints';
import {PerLevelModifier} from '../../../Modifier/PerLevelModifier/PerLevelModifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class HardAsRockPerLevelEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier(this.source, 1, false),
			},
			transaction,
		}));
	}
}
