import {type Devotion, type SerializedDevotion} from '../Devotion/Devotion';
import {type GrantedPowerName, type GrantedPower} from '../Power';
import {type TransactionInterface} from './TransactionInterface';

export type SerializedSheetDevotion = {
	devotion?: SerializedDevotion;
	grantedPowerCount: number;
};

export class SheetDevotion {
	private devotion: Devotion | undefined = undefined;
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	private grantedPowerCount = 1;

	isDevout() {
		return Boolean(this.devotion);
	}

	becomeDevout(devotion: Devotion, transaction: TransactionInterface) {
		this.devotion = devotion;
		devotion.addToSheet(transaction);
	}

	getGrantedPowerCount() {
		return this.grantedPowerCount;
	}

	getDeity() {
		return this.devotion?.deity;
	}

	addGrantedPower(power: GrantedPower) {
		this.devotion?.addPower(power);
	}

	removeGrantedPower(powerName: GrantedPowerName) {
		this.devotion?.removePower(powerName);
	}

	serialize() {
		return {
			devotion: this.devotion?.serialize(),
			grantedPowerCount: this.grantedPowerCount,
		};
	}
}
