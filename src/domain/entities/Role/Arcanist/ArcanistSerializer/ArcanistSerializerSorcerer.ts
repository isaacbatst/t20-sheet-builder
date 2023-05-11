import {type Arcanist} from '../Arcanist';
import {ArcanistLineageType, type ArcanistLineage, type ArcanistPathSorcerer, ArcanistLineageDraconic, ArcanistLineageFaerie, ArcanistLineageRed} from '../ArcanistPath';
import {type ArcanistLineageSerializer} from '../ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageSerializer';
import {ArcanistLineageSerializerDraconic} from '../ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageSerializerDraconic';
import {ArcanistLineageSerializerFaerie} from '../ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageSerializerFaerie';
import {ArcanistLineageSerializerRed} from '../ArcanistPath/ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageSerializerRed';
import {ArcanistSerializer} from './ArcanistSerializer';
import {type SerializedArcanistLineage, type SerializedArcanistSorcerer} from '../SerializedArcanist';

export class ArcanistSerializerSorcerer extends ArcanistSerializer<ArcanistPathSorcerer, SerializedArcanistSorcerer> {
	private readonly lineageSerializer: ArcanistLineageSerializer;

	constructor(arcanist: Arcanist<ArcanistPathSorcerer>) {
		super(arcanist);
		const path = this.arcanist.getPath();
		this.lineageSerializer = this.getLineageSerializer(path.lineage);
	}

	protected serializePath(): SerializedArcanistSorcerer {
		return {
			lineage: this.lineageSerializer.serialize(),
			name: this.arcanist.getPath().pathName,
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
