import {CharacterFake} from '../Character/CharacterFake';
import type {CharacterInterface} from '../Character/CharacterInterface';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {InGameContextAbstract} from './InGameContextInterface';

export class InGameContextFake extends InGameContextAbstract {
	location: Location = {isUnderground: true};
	constructor(public character: CharacterInterface = new CharacterFake()) {
		super();
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
