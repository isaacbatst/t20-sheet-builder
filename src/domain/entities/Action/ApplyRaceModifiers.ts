import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class ApplyRaceModifiers extends Action<'applyRaceModifiers'> {
	constructor(payload: ActionPayload<'applyRaceModifiers'>) {
		super('applyRaceModifiers', payload);
	}
}
