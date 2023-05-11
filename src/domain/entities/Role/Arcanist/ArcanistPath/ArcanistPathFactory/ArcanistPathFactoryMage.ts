import {ArcanistPathMage, type ArcanistPath} from '..';
import {SpellFactory, type SpellName} from '../../../../Spell';
import {ArcanistPathFactory} from './ArcanistPathFactory';

export class ArcanistPathFactoryMage extends ArcanistPathFactory {
	constructor(private readonly mageSpell: SpellName) {
		super();
	}

	make(): ArcanistPath {
		const spell = SpellFactory.make(this.mageSpell);
		return new ArcanistPathMage(spell);
	}
}
