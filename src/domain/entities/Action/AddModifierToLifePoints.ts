import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddModifierToLifePoints extends Action<'addModifierToLifePoints'> {
	constructor(payload: ActionPayload<'addModifierToLifePoints'>) {
		super('addModifierToLifePoints', payload);
	}
}
