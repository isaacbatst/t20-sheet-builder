import {SheetBuilderError} from '../../../../../../../errors';
import {type SerializedArcanistLineage, type SerializedArcanistLineageDraconic} from '../../../../SerializedArcanist';
import {type ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageDraconic} from '../ArcanistLineageDraconic';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageSerializedHandler} from './ArcanistLineageSerializedHandler';

export class ArcanistLineageSerializedHandlerDraconic extends ArcanistLineageSerializedHandler<SerializedArcanistLineageDraconic> {
	public override handle(request: SerializedArcanistLineageDraconic): ArcanistLineage {
		if (!request.damageType) {
			throw new SheetBuilderError('MISSING_SORCERER_LINEAGE_DRACONIC_DAMAGE_TYPE');
		}

		return new ArcanistLineageDraconic(request.damageType);
	}

	protected override shouldHandle(request: SerializedArcanistLineage): boolean {
		return request.type === ArcanistLineageType.draconic;
	}
}
