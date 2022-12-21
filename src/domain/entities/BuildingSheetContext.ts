import {Context} from './Context';

export class OutGameContext extends Context {
	constructor() {
		super('outgame');
	}

	getConditionalModifierValue() {
		return 0;
	}
}
