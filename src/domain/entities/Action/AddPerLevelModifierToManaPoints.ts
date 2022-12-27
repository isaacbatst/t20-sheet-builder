import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddPerLevelModifierToManaPoints extends Action<'addPerLevelModifierToManaPoints'> {
	constructor(
		payload: ActionPayload<'addPerLevelModifierToManaPoints'>,
	) {
		super('addPerLevelModifierToManaPoints', payload);
	}
}
