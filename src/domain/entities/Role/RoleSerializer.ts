import {type RoleInterface} from './RoleInterface';
import {type SerializedRoles, type SerializedRole} from './SerializedRole';

export abstract class RoleSerializer<S extends SerializedRoles> {
	constructor(readonly role: RoleInterface) {}

	serialize(): SerializedRole<S> {
		const role = this.serializeRole();

		return {
			...role,
			chosenSkills: this.role.chosenSkills,
			name: this.role.name,
		};
	}

	protected abstract serializeRole(): S;
}
