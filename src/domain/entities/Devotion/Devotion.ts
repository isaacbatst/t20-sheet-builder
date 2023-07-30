import {PickGrantedPower} from '../Action/PickGrantedPower';
import {type GrantedPower} from '../Power/GrantedPower/GrantedPower';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type Deity} from './Deities';

export class Devotion {
	constructor(
		readonly deity: Deity,
		readonly choosedPowers: GrantedPower[],
	) {}

	addToSheet(transaction: TransactionInterface) {
		const sheetDevotion = transaction.sheet.getSheetDevotion();

		if (sheetDevotion.getGrantedPowerCount() !== this.choosedPowers.length) {
			throw new Error('INVALID_POWER_COUNT');
		}

		this.choosedPowers.forEach(power => {
			const isAllowed = this.deity.grantedPowers.includes(power.name);

			if (!isAllowed) {
				throw new Error('NOT_ALLOWED_POWER');
			}

			transaction.run(new PickGrantedPower({
				payload: {
					power,
					source: this.deity.name,
				},
				transaction,
			}));
		});
	}
}
