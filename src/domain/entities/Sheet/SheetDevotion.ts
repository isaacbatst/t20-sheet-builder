import {type Deity} from '../Deity/Deity';
import {type TransactionInterface} from './TransactionInterface';

export class SheetDevotion {
	private deity: Deity | undefined = undefined;

	isDevout() {
		return Boolean(this.deity);
	}

	becomeDevout(deity: Deity, transaction: TransactionInterface) {
		this.deity = deity;
		deity.addToSheet(transaction);
	}
}
