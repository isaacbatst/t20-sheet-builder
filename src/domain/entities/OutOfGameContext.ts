import {Context} from './Context';
import type {ModifierConditionVerify} from './Modifier/ContextualModifier/ContextualModifiersListInterface';

export class OutOfGameContext extends Context {
	constructor() {
		super('outgame', false);
	}

	shouldActivateModifier(verify: ModifierConditionVerify): boolean {
		return false;
	}
}
