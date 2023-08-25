import type {CharacterInterface} from '../Character/CharacterInterface';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {Context} from './Context';

export class InGameContextFake extends Context {
	override character: CharacterInterface | undefined;
	override activateContextualModifiers = true;
	location: Location = {
		isUnderground: true,
	};

	getCurrentLocation(): Location {
		return this.location;
	}
}
