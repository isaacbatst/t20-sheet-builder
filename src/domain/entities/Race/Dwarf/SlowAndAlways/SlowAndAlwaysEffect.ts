import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {ChangeDisplacement} from '../../../Action/ChangeDisplacement';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class SlowAndAlwaysEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}

	applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new ChangeDisplacement({
			payload: {
				displacement: 6,
				source: this.source,
			}, transaction,
		}));
	}
}
