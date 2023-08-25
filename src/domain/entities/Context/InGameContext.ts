import type {Character} from '../Character/Character';
import {type CharacterInterface} from '../Character/CharacterInterface';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {Context} from './Context';

export class InGameContext extends Context {
	override activateContextualModifiers = true;
	readonly character: CharacterInterface;
	private readonly location: Location;

	constructor(
		initialLocation: Location,
		character: Character,
	) {
		super();
		this.location = initialLocation;
		this.character = character;
	}

	override getCurrentLocation(): Location {
		return this.location;
	}
}
