import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ChooseOrigin extends Action<'chooseOrigin'> {
	constructor(payload: ActionPayload<'chooseOrigin'>) {
		super('chooseOrigin', payload);
	}
}
