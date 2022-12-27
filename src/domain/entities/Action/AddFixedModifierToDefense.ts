import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddFixedModifierToDefense extends Action<'addFixedModifierToDefense'> {
	constructor(payload: ActionPayload<'addFixedModifierToDefense'>) {
		super('addFixedModifierToDefense', payload);
	}
}
