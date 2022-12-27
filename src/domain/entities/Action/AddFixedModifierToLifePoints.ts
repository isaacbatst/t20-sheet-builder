import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddFixedModifierToLifePoints extends Action<'addFixedModifierToLifePoints'> {
	constructor(payload: ActionPayload<'addFixedModifierToLifePoints'>) {
		super('addFixedModifierToLifePoints', payload);
	}
}
