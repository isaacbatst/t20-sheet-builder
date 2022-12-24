import type {ActionPayload} from '../SheetActions';
import {Action} from './Action';

export class AddPerLevelModifierToLifePoints extends Action<'addPerLevelModifierToLifePoints'> {
	constructor(payload: ActionPayload<'addPerLevelModifierToLifePoints'>) {
		super('addPerLevelModifierToLifePoints', payload);
	}
}
