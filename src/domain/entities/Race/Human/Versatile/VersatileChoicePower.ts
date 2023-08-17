import {PickGeneralPower} from '../../../Action/PickGeneralPower';
import {type GeneralPowerName} from '../../../Power';
import type {GeneralPowerInterface} from '../../../Power/GeneralPower/GeneralPower';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import type {TranslatableName} from '../../../Translator';
import {type SerializedVersatileChoicePower} from '../../SerializedRace';
import {VersatileChoice} from './VersatileChoice';

export class VersatileChoicePower extends VersatileChoice {
	override readonly name: GeneralPowerName;

	constructor(readonly power: GeneralPowerInterface) {
		super(power.name, 'power');
		this.name = power.name;
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

	override serialize(): SerializedVersatileChoicePower {
		return {
			name: this.name,
			type: 'power',
		};
	}
}
