import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddRolePlayEffect extends Action<'addRolePlayEffect'> {
	constructor(payload: ActionPayload<'addRolePlayEffect'>) {
		super('addRolePlayEffect', payload);
	}
}
