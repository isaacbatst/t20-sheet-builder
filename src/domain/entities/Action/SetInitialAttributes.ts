import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class SetInitialAttributes extends Action<'setInitialAttributes'> {
	constructor(payload: ActionPayload<'setInitialAttributes'>) {
		super('setInitialAttributes', payload,
		);
	}
}
