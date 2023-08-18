import {type RoleInterface} from './RoleInterface';
import {type SerializedRole, type SerializedRoles} from './SerializedRole';

/**
* @deprecated Use `role.serialize()` instead
*/
export abstract class RoleSerializer<S extends SerializedRoles> {
	constructor(readonly role: RoleInterface<S>) {}

	serialize(): SerializedRole<S> {
		const serialized = this.role.serialize();

		return serialized;
	}

	protected abstract serializeRole(): S;
}
