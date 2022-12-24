import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddTriggeredEffect extends Action<'addTriggeredEffect'> {
	constructor(
		payload: ActionPayload<'addTriggeredEffect'>,
	) {
		super('addTriggeredEffect', payload);
	}
}
