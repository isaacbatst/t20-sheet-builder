import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class TrainIntelligenceSkills extends Action<'trainIntelligenceSkills'> {
	constructor(payload: ActionPayload<'trainIntelligenceSkills'>) {
		super('trainIntelligenceSkills', payload);
	}
}
