import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddContextualModifierToSkill extends Action<'addContextualModifierToSkill'> {
	constructor(
		payload: ActionPayload<'addContextualModifierToSkill'>,
	) {
		super('addContextualModifierToSkill', payload);
	}
}
