import {SpellFactory} from '../../../../../../Spell';
import {type ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageFaerie} from '../ArcanistLineageFaerie';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageHandler, type ArcanistLineageHandlerRequest} from './ArcanistLineageHandler';

export class ArcanistLineageFactoryHandlerFaerie extends ArcanistLineageHandler {
	protected override handle(request: ArcanistLineageHandlerRequest): ArcanistLineage {
		if (!request.sorcererLineageFaerieExtraSpell) {
			throw new Error('MISSING_SORCERER_LINEAGE_FAERIE_DAMAGE_TYPE');
		}

		const spell = SpellFactory.make(request.sorcererLineageFaerieExtraSpell);
		return new ArcanistLineageFaerie(spell);
	}

	protected override shouldHandle(request: ArcanistLineageHandlerRequest): boolean {
		return request.sorcererLineage === ArcanistLineageType.faerie;
	}
}
