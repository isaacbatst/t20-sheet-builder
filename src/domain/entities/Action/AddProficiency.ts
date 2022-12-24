import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddProficiency extends Action<'addProficiency'> {
	constructor(payload: ActionPayload<'addProficiency'>) {
		super('addProficiency', payload);
	}
}
