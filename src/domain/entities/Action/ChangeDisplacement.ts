import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ChangeDisplacement extends Action<'changeDisplacement'> {
	constructor(payload: ActionPayload<'changeDisplacement'>) {
		super('changeDisplacement', payload);
	}
}
