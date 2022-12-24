import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddSpellEffect extends Action<'addSpellEffect'> {
	constructor(
		payload: ActionPayload<'addSpellEffect'>,
	) {
		super('addSpellEffect', payload);
	}
}
