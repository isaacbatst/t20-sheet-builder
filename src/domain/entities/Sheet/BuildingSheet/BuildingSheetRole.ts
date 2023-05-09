import {type RoleInterface} from '../../Role';
import {type SheetRoleInterface} from '../SheetRoleInterface';
import {type TransactionInterface} from '../TransactionInterface';

export class BuildingSheetRole implements SheetRoleInterface {
	constructor(
		private role: RoleInterface | undefined = undefined,
	) {}

	chooseRole(role: RoleInterface, transaction: TransactionInterface): void {
		this.role = role;
		this.role.addToSheet(transaction);
	}

	getRole(): RoleInterface | undefined {
		return this.role;
	}
}
