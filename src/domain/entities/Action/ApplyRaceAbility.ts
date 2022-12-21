import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class ApplyRaceAbility extends Action<'applyRaceAbility'> {
	constructor(payload: ActionPayload<'applyRaceAbility'>) {
		super('applyRaceAbility', payload);
	}
}
