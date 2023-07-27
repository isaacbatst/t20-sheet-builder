import {ArcanistFactory, type SerializedArcanist} from '../Arcanist';
import {type RoleInterface} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRole} from '../SerializedRole';
import {RoleSerializedHandler} from './RoleSerializedHandler';

export class RoleSerializedHandlerArcanist extends RoleSerializedHandler<SerializedRole<SerializedArcanist>> {
	protected override handle(request: SerializedRole<SerializedArcanist>): RoleInterface {
		return ArcanistFactory.makeFromSerialized(request);
	}

	protected override shouldHandle(request: SerializedRole<SerializedArcanist>): boolean {
		return request.name === RoleName.arcanist;
	}
}
