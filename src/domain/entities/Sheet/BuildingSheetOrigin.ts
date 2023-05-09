import {type OriginInterface} from '../Origin/Origin';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {type TransactionInterface} from './TransactionInterface';

export class BuildingSheetOrigin implements SheetOriginInterface {
	constructor(
		private origin: OriginInterface | undefined = undefined,
	) {}

	chooseOrigin(origin: OriginInterface, transaction: TransactionInterface): void {
		this.origin = origin;
		this.origin.addToSheet(transaction);
	}

	getOrigin(): OriginInterface | undefined {
		return this.origin;
	}
}
