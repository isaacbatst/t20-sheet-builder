import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddEquipment extends Action<'addEquipment'> {
	constructor(payload: ActionPayload<'addEquipment'>) {
		super('addEquipment', payload);
	}
}
