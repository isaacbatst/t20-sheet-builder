import {DecreaseAttribute} from '../../../Action/DecreaseAttribute';
import {type SheetInterface} from '../../../Sheet/SheetInterface';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {type TranslatableName} from '../../../Translator';
import {GeneralPower} from '../GeneralPower';
import {GeneralPowerGroup} from '../GeneralPowerGroup';

export abstract class TormentaPower extends GeneralPower {
	override group: GeneralPowerGroup = GeneralPowerGroup.tormenta;

	override addToSheet(transaction: TransactionInterface, source: TranslatableName): void {
		super.addToSheet(transaction, source);
		transaction.run(new DecreaseAttribute({
			payload: {
				attribute: transaction.sheet.getSheetAttributes().getTormentaPowersAttribute(),
				quantity: 1,
				source: this.name,
			},
			transaction,
		}));
	}
}
