import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddMoney extends Action<'addMoney'> {
	constructor(payload: ActionPayload<'addMoney'>) {
		super('addMoney', payload);
	}
}
