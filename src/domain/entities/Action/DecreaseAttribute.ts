import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class DecreaseAttribute extends Action<'decreaseAttribute'> {
	constructor(payload: ActionPayload<'decreaseAttribute'>) {
		super('decreaseAttribute', payload);
	}
}
