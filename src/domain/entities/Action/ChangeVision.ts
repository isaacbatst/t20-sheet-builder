import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class ChangeVision extends Action<'changeVision'> {
	constructor(
		payload: ActionPayload<'changeVision'>,
	) {
		super('changeVision', payload);
	}
}
