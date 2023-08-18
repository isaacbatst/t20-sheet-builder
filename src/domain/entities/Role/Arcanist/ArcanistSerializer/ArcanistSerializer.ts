import {SheetBuilderError} from '../../../../errors';
import {RoleSerializer} from '../../RoleSerializer';
import {type Arcanist} from '../Arcanist';
import {ArcanistPathMage, ArcanistPathSerializerMage, ArcanistPathSerializerSorcerer, ArcanistPathSerializerWizard, ArcanistPathSorcerer, ArcanistPathWizard, type ArcanistPath, type ArcanistPathSerializer} from '../ArcanistPath';
import {type SerializedArcanist} from '../SerializedArcanist';

export class ArcanistSerializer extends RoleSerializer<SerializedArcanist> {
	private readonly pathSerializer: ArcanistPathSerializer;

	constructor(
		private readonly arcanist: Arcanist,
	) {
		super(arcanist);
		this.pathSerializer = this.getPathSerializer(arcanist.getPath());
	}

	protected serializeRole(): SerializedArcanist {
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

		throw new SheetBuilderError('INVALID_PATH');
	}
}
