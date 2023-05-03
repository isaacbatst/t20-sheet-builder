import {Context} from './Context';

export class OutOfGameContext extends Context {
	constructor() {
		super('outgame', false);
	}
}
