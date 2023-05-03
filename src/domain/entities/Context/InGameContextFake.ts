import type {Character} from '../Character/Character';
import {Sheet} from '../Sheet/Sheet';
import type {Location} from '../Sheet/SheetInterface';
import type {ContextType} from './ContextInterface';
import type {InGameContextInterface} from './InGameContextInterface';

export class InGameContextFake implements InGameContextInterface {
	type: ContextType = 'ingame';
	location: Location = {isUnderground: true};

	constructor(public character: Character) {}

	getCurrentLocation(): Location {
		return this.location;
	}
}
