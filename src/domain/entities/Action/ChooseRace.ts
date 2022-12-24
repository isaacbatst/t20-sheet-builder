import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ChooseRace extends Action<'chooseRace'> {
	constructor(payload: ActionPayload<'chooseRace'>) {
		super('chooseRace', payload);
	}
}
