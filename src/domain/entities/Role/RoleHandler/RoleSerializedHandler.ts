import {type RoleInterface, type SerializedRole} from '../..';
import {Handler} from '../../../../common/handler/Handler';

export abstract class RoleSerializedHandler<T extends SerializedRole>
	extends Handler<SerializedRole, RoleInterface> {
	protected abstract override handle(request: T): RoleInterface;
}
