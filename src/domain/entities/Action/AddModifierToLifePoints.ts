import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class AddModifierToLifePoints extends Action<'addModifierToLifePoints'> {
	constructor(payload: ActionPayload<'addModifierToLifePoints'>) {
		super('addModifierToLifePoints', payload);
	}
}
