import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class PickPower extends Action<'pickPower'> {
	constructor(payload: ActionPayload<'pickPower'>) {
		super('pickPower', payload);
	}
}
