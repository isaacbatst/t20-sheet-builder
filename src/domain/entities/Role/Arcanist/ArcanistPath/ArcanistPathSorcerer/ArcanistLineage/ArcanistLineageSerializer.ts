import {type SerializedArcanistLineage} from '../../../SerializedArcanist';
import {type ArcanistLineage} from './ArcanistLineage';

export abstract class ArcanistLineageSerializer<
	L extends ArcanistLineage = ArcanistLineage,
	S extends SerializedArcanistLineage = SerializedArcanistLineage,
> {
	constructor(protected readonly lineage: L) {}

	abstract serialize(): S;
}
