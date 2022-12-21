import type {ActionPayload} from '../CharacterAction';
import {Action} from './Action';

export class ChooseRace extends Action<'chooseRace'> {
	constructor(payload: ActionPayload<'chooseRace'>) {
		super('chooseRace', payload);
	}
}
