import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class PickGeneralPower extends Action<'pickGeneralPower'> {
	constructor(payload: ActionPayload<'pickGeneralPower'>) {
		super('pickGeneralPower', payload);
	}
}
