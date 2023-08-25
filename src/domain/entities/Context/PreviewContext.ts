import {type Character} from '../Character';
import {type Location} from '../Sheet';
import {Context} from './Context';

export class PreviewContext extends Context {
	override activateContextualModifiers = true;
	constructor(override character: Character) {
		super();
	}

	override getCurrentLocation(): Location | undefined {
		return undefined;
	}
}
