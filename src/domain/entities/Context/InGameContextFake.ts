import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {Context} from './Context';

export class InGameContextFake extends Context {
	override sheet: SheetInterface | undefined;
	override activateContextualModifiers = true;
	location: Location = {
		isUnderground: true,
	};

	getCurrentLocation(): Location {
		return this.location;
	}
}
