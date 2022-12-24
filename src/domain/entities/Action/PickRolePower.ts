import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class PickRolePower extends Action<'pickRolePower'> {
	constructor(payload: ActionPayload<'pickRolePower'>) {
		super('pickRolePower', payload);
	}
}
