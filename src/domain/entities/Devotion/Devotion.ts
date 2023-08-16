import {SheetBuilderError} from '../../errors';
import {PickGrantedPower} from '../Action/PickGrantedPower';
import {type GrantedPower} from '../Power/GrantedPower/GrantedPower';
import {type GrantedPowerName} from '../Power/GrantedPower/GrantedPowerName';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type Deity} from './Deities';

export type SerializedDevotion = {
	deity: Deity;
	choosedPowers: GrantedPowerName[];
};

export class Devotion {
	constructor(
		readonly deity: Deity,
		private _choosedPowers: GrantedPower[],
	) {}

	serialize() {
		return {
			deity: this.deity,
			choosedPowers: this._choosedPowers.map(power => power.name),
		};
	}

	addPower(power: GrantedPower) {
		this._choosedPowers.push(power);
	}

	removePower(powerName: GrantedPowerName) {
		this._choosedPowers = this._choosedPowers.filter(power => power.name !== powerName);
	}

	addToSheet(transaction: TransactionInterface) {
		const sheetDevotion = transaction.sheet.getSheetDevotion();

		if (sheetDevotion.getGrantedPowerCount() !== this._choosedPowers.length) {
			throw new SheetBuilderError('INVALID_POWER_COUNT');
		}

		if (this.deity.allowedToDevote !== 'all') {
			const isRaceAllowedToDevote = this.deity.allowedToDevote.races.includes(
				transaction.sheet.getSheetRace().getRace()!.name,
			);
			const isRoleAllowedToDevote = this.deity.allowedToDevote.roles.includes(
				transaction.sheet.getSheetRole().getRole()!.name,
			);

			if (!isRaceAllowedToDevote && !isRoleAllowedToDevote) {
				throw new SheetBuilderError('NOT_ALLOWED_TO_DEVOTE');
			}
		}

		this._choosedPowers.forEach(power => {
			const isAllowed = this.deity.grantedPowers.includes(power.name);

			if (!isAllowed) {
				throw new SheetBuilderError('NOT_ALLOWED_POWER');
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

	get choosedPowers() {
		return this._choosedPowers;
	}
}
