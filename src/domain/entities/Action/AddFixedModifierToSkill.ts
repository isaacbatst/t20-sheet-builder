import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddFixedModifierToSkill extends Action<'addFixedModifierToSkill'> {
	constructor(
		payload: ActionPayload<'addFixedModifierToSkill'>,
	) {
		super('addFixedModifierToSkill', payload);
	}
}
