import {type RoleInterface} from '../../Role';
import {type SheetRoleInterface} from '../SheetRoleInterface';

export class CharacterSheetRole implements SheetRoleInterface {
	constructor(
		private readonly role: RoleInterface,
	) {

	}

	getRole(): RoleInterface {
		return this.role;
	}
}
