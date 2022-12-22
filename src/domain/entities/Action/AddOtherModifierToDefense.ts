import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class AddOtherModifierToDefense extends Action<'addOtherModifierToDefense'> {
	constructor(payload: ActionPayload<'addOtherModifierToDefense'>) {
		super('addOtherModifierToDefense', payload);
	}
}
