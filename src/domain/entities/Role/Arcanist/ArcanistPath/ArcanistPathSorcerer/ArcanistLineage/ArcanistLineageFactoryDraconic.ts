import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageDraconic, type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconic';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';

export class ArcanistLineageFactoryDraconic extends ArcanistLineageFactory {
	constructor(
		private readonly sorcererLineageDraconicDamageType: ArcanistLineageDraconicDamageType,
	) {
		super();
	}

	override make(): ArcanistLineage {
		return new ArcanistLineageDraconic(this.sorcererLineageDraconicDamageType);
	}
}
