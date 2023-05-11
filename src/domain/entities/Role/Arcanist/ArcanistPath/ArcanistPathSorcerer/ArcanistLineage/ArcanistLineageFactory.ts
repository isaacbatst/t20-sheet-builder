import {type ArcanistLineage} from './ArcanistLineage';

export abstract class ArcanistLineageFactory {
	abstract make(): ArcanistLineage;
}
