import {SheetBuilderError} from '../../../../../../../errors';
import {SpellFactory} from '../../../../../../Spell';
import {type SerializedArcanistLineageFaerie} from '../../../../SerializedArcanist';
import {type ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageFaerie} from '../ArcanistLineageFaerie';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageSerializedHandler} from './ArcanistLineageSerializedHandler';

export class ArcanistLineageSerializedHandlerFaerie extends ArcanistLineageSerializedHandler<SerializedArcanistLineageFaerie> {
	public override handle(request: SerializedArcanistLineageFaerie): ArcanistLineage {
		if (!request.extraSpell) {
			throw new SheetBuilderError('MISSING_SORCERER_LINEAGE_FAERIE_DAMAGE_TYPE');
		}

		const spell = SpellFactory.make(request.extraSpell);
		return new ArcanistLineageFaerie(spell);
	}

	protected override shouldHandle(request: SerializedArcanistLineageFaerie): boolean {
		return request.type === ArcanistLineageType.faerie;
	}
}
