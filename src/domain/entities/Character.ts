import type {Attributes} from './Attributes';
import type {Race} from './Race';

type CharacterParams = {
	initialAttributes: Attributes;
	race: Race;
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
		this.race = params.race;
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
	}
}
