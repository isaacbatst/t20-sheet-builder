import type {Attributes} from './Attributes';
import {CharacterSnapshot} from './CharacterSnapshot';
import type {Race} from './Race';

type CharacterParams = {
	initialAttributes: Attributes;
	race: Race;
};

export class Character {
	readonly attributes: Attributes;
	readonly race: Race;
	readonly snapshots: CharacterSnapshot[] = [];

	constructor(
		params: CharacterParams,
	) {
		this.attributes = params.initialAttributes;
		this.snapshots.push(new CharacterSnapshot('Definição inicial de atributos', this.attributes));

		this.race = params.race;
		this.attributes = this.race.applyAttributesModifiers(this.attributes);
		this.snapshots.push(new CharacterSnapshot('Aplicação de modificadores de atributo da raça', this.attributes));
	}
}
