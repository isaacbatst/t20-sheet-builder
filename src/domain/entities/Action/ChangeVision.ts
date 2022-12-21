import type {ActionPayload} from '../CharacterAction';
import {Action} from './Action';

export class ChangeVision extends Action<'changeVision'> {
	constructor(
		payload: ActionPayload<'changeVision'>,
	) {
		super('changeVision', payload);
	}
}
