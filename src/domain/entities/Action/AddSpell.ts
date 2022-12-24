import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class LearnSpell extends Action<'learnSpell'> {
	constructor(payload: ActionPayload<'learnSpell'>) {
		super('learnSpell', payload);
	}
}
