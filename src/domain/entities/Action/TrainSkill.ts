import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class TrainSkill extends Action<'trainSkill'> {
	constructor(payload: ActionPayload<'trainSkill'>) {
		super('trainSkill', payload);
	}
}
