import {type Location} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {Context} from './Context';

export class PreviewContext extends Context {
	override activateContextualModifiers = true;
	constructor(override sheet: SheetInterface) {
		super();
	}

	override getCurrentLocation(): Location | undefined {
		return undefined;
	}
}
