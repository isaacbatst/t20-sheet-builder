import {SpellFactory, type SpellName} from '../../../../../Spell';
import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';
import {ArcanistLineageFaerie} from './ArcanistLineageFaerie';

export class ArcanistLineageFactoryFaerie extends ArcanistLineageFactory {
	constructor(
		private readonly sorcererLineageFaerieExtraSpell: SpellName,
	) {
		super();
	}

	override make(): ArcanistLineage {
		const spell = SpellFactory.make(this.sorcererLineageFaerieExtraSpell);
		return new ArcanistLineageFaerie(spell);
	}
}
