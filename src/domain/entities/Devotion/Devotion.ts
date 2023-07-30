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

		if (this.deity.allowedToDevote !== 'all') {
			const isRaceAllowedToDevote = this.deity.allowedToDevote.races.includes(
				transaction.sheet.getSheetRace().getRace()!.name,
			);
			const isRoleAllowedToDevote = this.deity.allowedToDevote.roles.includes(
				transaction.sheet.getSheetRole().getRole()!.name,
			);

			if (!isRaceAllowedToDevote && !isRoleAllowedToDevote) {
				throw new Error('NOT_ALLOWED_TO_DEVOTE');
			}
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
