import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class LearnCircle extends Action<'learnCircle'> {
	constructor(payload: ActionPayload<'learnCircle'>) {
		super('learnCircle', payload);
	}
}
