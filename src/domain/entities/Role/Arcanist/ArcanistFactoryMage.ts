import {SpellFactory} from '../../Spell';
import {ArcanistFactory} from './ArcanistFactory';
import {ArcanistPathMage, type ArcanistPath} from './ArcanistPath';

export class ArcanistFactoryMage extends ArcanistFactory {
	override makePath(): ArcanistPath {
		if (!this.mageSpell) {
			throw new Error('MISSING_MAGE_SPELL');
		}

		const spell = SpellFactory.make(this.mageSpell);
		return new ArcanistPathMage(spell);
	}
}
