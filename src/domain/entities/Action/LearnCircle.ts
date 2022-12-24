import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class LearnCircle extends Action<'learnCircle'> {
	constructor(payload: ActionPayload<'learnCircle'>) {
		super('learnCircle', payload);
	}
}
