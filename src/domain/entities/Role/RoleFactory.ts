import {type RoleInterface, type SerializedRole} from '..';
import {RoleSerializedHandlerArcanist} from './RoleHandler/RoleSerializedHandlerArcanist';
import {RoleSerializedHandlerWarrior} from './RoleHandler/RoleSerializedHandlerWarrior';

export class RoleFactory {
	static makeFromSerialized(serialized: SerializedRole): RoleInterface {
		const warrior = new RoleSerializedHandlerWarrior();
		const arcanist = new RoleSerializedHandlerArcanist();

		warrior
			.setNext(arcanist);

		return warrior.execute(serialized);
	}
}
