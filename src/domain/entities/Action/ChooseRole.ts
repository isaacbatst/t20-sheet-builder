import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ChooseRole extends Action<'chooseRole'> {
	constructor(payload: ActionPayload<'chooseRole'>) {
		super('chooseRole', payload);
	}
}
