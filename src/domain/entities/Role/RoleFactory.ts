import {type RoleInterface, type SerializedRole} from '..';
import {RoleSerializedHandlerArcanist} from './RoleHandler/RoleSerializedHandlerArcanist';
import {RoleSerializedHandlerWarrior} from './RoleHandler/RoleSerializedHandlerWarrior';

export class RoleFactory {
	static makeFromSerialized(serialized: SerializedRole): RoleInterface {
		return RoleFactory.roleHandlers.execute(serialized);
	}

	private static readonly roleHandlers = new RoleSerializedHandlerArcanist()
		.setNext(new RoleSerializedHandlerWarrior());
}
