import {type Character} from '../Character';
import {type Location} from '../Sheet';
import {Context} from './Context';

export class OutOfGameContext extends Context {
	override character: Character | undefined = undefined;
	override activateContextualModifiers = false;
	override getCurrentLocation(): Location | undefined {
		return undefined;
	}
}
