import {type RoleInterface} from '../Role';
import {type SheetRoleInterface} from './SheetRoleInterface';

export class SheetRoleFake implements SheetRoleInterface {
	chooseRole = vi.fn();
	constructor(
		public role: RoleInterface | undefined = undefined,
	) {}

	getRole(): RoleInterface | undefined {
		return this.role;
	}
}
