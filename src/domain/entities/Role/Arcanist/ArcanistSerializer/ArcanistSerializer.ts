import {type Arcanist} from '../Arcanist';
import {ArcanistPathMage, ArcanistPathSerializerMage, ArcanistPathSerializerSorcerer, ArcanistPathSerializerWizard, ArcanistPathSorcerer, ArcanistPathWizard, type ArcanistPath, type ArcanistPathSerializer} from '../ArcanistPath';
import {type SerializedArcanist} from '../SerializedArcanist';

export class ArcanistSerializer {
	private readonly pathSerializer: ArcanistPathSerializer;

	constructor(
		private readonly arcanist: Arcanist,
	) {
		this.pathSerializer = this.getPathSerializer(arcanist.getPath());
	}

	serialize(): SerializedArcanist {
		const path = this.pathSerializer.serialize();

		return {
			name: this.arcanist.name,
			spells: this.arcanist.getInitialSpells().map(spell => spell.name),
			path,
		};
	}

	private getPathSerializer(path: ArcanistPath): ArcanistPathSerializer {
		if (path instanceof ArcanistPathMage) {
			return new ArcanistPathSerializerMage(path);
		}

		if (path instanceof ArcanistPathSorcerer) {
			return new ArcanistPathSerializerSorcerer(path);
		}

		if (path instanceof ArcanistPathWizard) {
			return new ArcanistPathSerializerWizard(path);
		}

		throw new Error('INVALID_PATH');
	}
}
