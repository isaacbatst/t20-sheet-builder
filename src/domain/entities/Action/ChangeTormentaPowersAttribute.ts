import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class ChangeTormentaPowersAttribute extends Action<'changeTormentaPowersAttribute'> {
	constructor(payload: ActionPayload<'changeTormentaPowersAttribute'>) {
		super('changeTormentaPowersAttribute', payload);
	}
}
