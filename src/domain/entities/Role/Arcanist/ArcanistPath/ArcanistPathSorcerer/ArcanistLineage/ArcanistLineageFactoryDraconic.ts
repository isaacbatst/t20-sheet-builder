import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageDraconic} from './ArcanistLineageDraconic';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';

export class ArcanistLineageFactoryDraconic extends ArcanistLineageFactory {
	override make(): ArcanistLineage {
		if (!this.sorcererLineageDraconicDamageType) {
			throw new Error('MISSING_DRACONIC_DAMAGE_TYPE');
		}

		return new ArcanistLineageDraconic(this.sorcererLineageDraconicDamageType);
	}
}
