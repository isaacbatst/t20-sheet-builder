import {type RoleInterface} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRole, type SerializedWarrior} from '../SerializedRole';
import {Warrior} from '../Warrior';
import {RoleSerializedHandler} from './RoleSerializedHandler';

export class RoleSerializedHandlerWarrior extends RoleSerializedHandler<SerializedRole<SerializedWarrior>> {
	protected override handle(request: SerializedRole<SerializedWarrior>): RoleInterface {
		return new Warrior(request.selectedSkillsByGroup);
	}

	protected override shouldHandle(request: SerializedRole<SerializedWarrior>): boolean {
		return request.name === RoleName.warrior;
	}
}
