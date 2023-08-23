import type {Character} from '../Character/Character';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {InGameContextAbstract} from './InGameContextAbstract';

export class InGameContext extends InGameContextAbstract {
	readonly character: Character;
	private readonly location: Location;

	constructor(
		initialLocation: Location,
		character: Character,
	) {
		super();
		this.location = initialLocation;
		this.character = character;
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
