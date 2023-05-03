import {Character} from '../Character/Character';
import {Sheet} from '../Sheet/Sheet';
import type {Location} from '../Sheet/SheetInterface';
import type {ContextType} from './ContextInterface';
import type {InGameContextInterface} from './InGameContextInterface';

export class InGameContextFake implements InGameContextInterface {
	character: Character = new Character(new Sheet());
	type: ContextType = 'ingame';
	shouldActivateModifierValue = true;
	location: Location = {isUnderground: true};

	getCurrentLocation(): Location {
		return this.location;
	}
}
