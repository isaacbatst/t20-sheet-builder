import {type ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageDraconic} from '../ArcanistLineageDraconic';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageHandler, type ArcanistLineageHandlerRequest} from './ArcanistLineageHandler';

export class ArcanistLineageFactoryHandlerDraconic extends ArcanistLineageHandler {
	protected override handle(request: ArcanistLineageHandlerRequest): ArcanistLineage {
		if (!request.sorcererLineageDraconicDamageType) {
			throw new Error('MISSING_SORCERER_LINEAGE_DRACONIC_DAMAGE_TYPE');
		}

		return new ArcanistLineageDraconic(request.sorcererLineageDraconicDamageType);
	}

	protected override shouldHandle(request: ArcanistLineageHandlerRequest): boolean {
		return request.sorcererLineage === ArcanistLineageType.draconic;
	}
}
