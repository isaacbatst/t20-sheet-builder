import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class PickOriginPower extends Action<'pickOriginPower'> {
	constructor(payload: ActionPayload<'pickOriginPower'>) {
		super('pickOriginPower', payload);
	}
}
