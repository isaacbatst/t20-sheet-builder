import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddInitialEquipment extends Action<'addInitialEquipment'> {
	constructor(payload: ActionPayload<'addInitialEquipment'>) {
		super('addInitialEquipment', payload);
	}
}
