import {type SerializedArcanistSorcerer} from '../../SerializedArcanist';
import {ArcanistLineageDraconic, ArcanistLineageFaerie, ArcanistLineageRed, ArcanistLineageSerializerDraconic, ArcanistLineageSerializerFaerie, ArcanistLineageSerializerRed, type ArcanistLineage, type ArcanistLineageSerializer, type ArcanistPathSorcerer} from '../ArcanistPathSorcerer';
import {ArcanistPathSerializer} from './ArcanistPathSerializer';

export class ArcanistPathSerializerSorcerer extends ArcanistPathSerializer<
SerializedArcanistSorcerer
> {
	private readonly lineageSerializer: ArcanistLineageSerializer;

	constructor(private readonly path: ArcanistPathSorcerer) {
		super();
		this.lineageSerializer = this.getLineageSerializer(path.lineage);
	}

	serialize(): SerializedArcanistSorcerer {
		return {
			lineage: this.lineageSerializer.serialize(),
			name: this.path.pathName,
		};
	}

	private getLineageSerializer(lineage: ArcanistLineage): ArcanistLineageSerializer {
		if (lineage instanceof ArcanistLineageDraconic) {
			return new ArcanistLineageSerializerDraconic(lineage);
		}

		if (lineage instanceof ArcanistLineageFaerie) {
			return new ArcanistLineageSerializerFaerie(lineage);
		}

		if (lineage instanceof ArcanistLineageRed) {
			return new ArcanistLineageSerializerRed(lineage);
		}

		throw new Error('INVALID_LINEAGE');
	}
}
