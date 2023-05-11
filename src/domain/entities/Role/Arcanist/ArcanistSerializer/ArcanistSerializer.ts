import {type Arcanist} from '../Arcanist';
import {type ArcanistPathSerializer} from '../ArcanistPath';
import {type SerializedArcanist, type SerializedArcanistPath} from '../SerializedArcanist';

export class ArcanistSerializer {
	constructor(
		private readonly arcanist: Arcanist,
	) {}

	serialize<S extends SerializedArcanistPath>(pathSerializer: ArcanistPathSerializer<S>): SerializedArcanist<S> {
		const path = pathSerializer.serialize();

		return {
			name: this.arcanist.name,
			spells: this.arcanist.getInitialSpells().map(spell => spell.name),
			path,
		};
	}
}
