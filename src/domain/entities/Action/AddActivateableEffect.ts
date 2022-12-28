import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddActivateableEffect extends Action<'addActivateableEffect'> {
	constructor(payload: ActionPayload<'addActivateableEffect'>) {
		super('addActivateableEffect', payload);
	}
}
