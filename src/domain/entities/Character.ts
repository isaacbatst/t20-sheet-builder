import type {Attributes} from './Attributes';
import type {Race} from './Race';
import {RaceFactory} from './RaceFactory';

type CharacterParams = {
	initialAttributes: Attributes;
	race: string;
};

export class Character {
	readonly attributes: Attributes;
	readonly race: Race;

	constructor(
		params: CharacterParams,
	) {
		// Step 1
		this.attributes = params.initialAttributes;

		// Step 2
		this.race = RaceFactory.create(params.race);
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
	}
}
