import {type Character} from '../Character';
import {type Location} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {Context} from './Context';

export class OutOfGameContext extends Context {
	override sheet: SheetInterface | undefined = undefined;
	override activateContextualModifiers = false;
	override getCurrentLocation(): Location | undefined {
		return undefined;
	}
}
