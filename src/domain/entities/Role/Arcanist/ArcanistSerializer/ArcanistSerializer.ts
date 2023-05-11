import {type Arcanist} from '../Arcanist';
import {type ArcanistPath} from '../ArcanistPath';
import {type SerializedArcanist, type SerializedArcanistPath} from '../SerializedArcanist';

export abstract class ArcanistSerializer<P extends ArcanistPath, S extends SerializedArcanistPath> {
	constructor(protected arcanist: Arcanist<P>) {}

	serialize(): SerializedArcanist<S> {
		const path = this.serializePath();

		return {
			name: this.arcanist.name,
			spells: this.arcanist.getInitialSpells().map(spell => spell.name),
			path,
		};
	}

	protected abstract serializePath(): S;
}
