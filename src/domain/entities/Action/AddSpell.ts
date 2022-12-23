import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class LearnSpell extends Action<'learnSpell'> {
	constructor(payload: ActionPayload<'learnSpell'>) {
		super('learnSpell', payload);
	}
}
