import {PickGeneralPower} from '../../../Action/PickGeneralPower';
import type {GeneralPowerInterface} from '../../../Power/GeneralPower/GeneralPower';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import type {TranslatableName} from '../../../Translator';
import {VersatileChoice} from './VersatileChoice';

export class VersatileChoicePower extends VersatileChoice {
	constructor(readonly power: GeneralPowerInterface) {
		super(power.name, 'power');
	}

	addToSheet(transaction: TransactionInterface, source: TranslatableName): void {
		transaction.run(new PickGeneralPower({
			payload: {
				power: this.power,
				source,
			},
			transaction,
		}));
	}
}
