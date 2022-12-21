import type {ActionPayload} from '../CharacterAction';
import {Action} from './Action';

export class ApplyRaceModifiers extends Action<'applyRaceModifiers'> {
	constructor(payload: ActionPayload<'applyRaceModifiers'>) {
		super('applyRaceModifiers', payload);
	}
}
