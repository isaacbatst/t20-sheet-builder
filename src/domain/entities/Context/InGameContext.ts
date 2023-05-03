import type {Character} from '../Character/Character';
import type {Location} from '../Sheet/SheetInterface';
import {Context} from './Context';
import type {InGameContextInterface} from './InGameContextInterface';

export class InGameContext extends Context implements InGameContextInterface {
	readonly character: Character;
	private readonly location: Location;

	constructor(
		initialLocation: Location,
		character: Character,
	) {
		super('ingame', true);
		this.location = initialLocation;
		this.character = character;
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
