import {ArcanistPathMage, type ArcanistPath} from '..';
import {SpellFactory, type SpellName} from '../../../../Spell';
import {ArcanistPathFactory} from './ArcanistPathFactory';

export class ArcanistPathFactoryMage extends ArcanistPathFactory {
	constructor(private readonly mageSpell?: SpellName) {
		super();
	}

	make(): ArcanistPath {
		if (!this.mageSpell) {
			throw new Error('MISSING_MAGE_SPELL');
		}

		const spell = SpellFactory.make(this.mageSpell);
		return new ArcanistPathMage(spell);
	}
}
