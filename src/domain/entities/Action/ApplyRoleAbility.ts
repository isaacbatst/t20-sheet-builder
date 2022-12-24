import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ApplyRoleAbility extends Action<'applyRoleAbility'> {
	constructor(payload: ActionPayload<'applyRoleAbility'>) {
		super('applyRoleAbility', payload);
	}
}
