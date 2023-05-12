import {RoleName, Warrior, type SerializedRole, type SerializedWarrior} from '../..';
import {type RoleInterface} from '../RoleInterface';
import {RoleSerializedHandler} from './RoleSerializedHandler';

export class RoleSerializedHandlerWarrior extends RoleSerializedHandler<SerializedRole<SerializedWarrior>> {
	protected override handle(request: SerializedRole<SerializedWarrior>): RoleInterface {
		return new Warrior(request.chosenSkills);
	}

	protected override shouldHandle(request: SerializedRole<SerializedWarrior>): boolean {
		return request.name === RoleName.warrior;
	}
}
