import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';

export class IllusoryDisguise extends Spell {
	effects = {
		default: new IllusoryDisguiseDefaultEffect(),
	};

	constructor() {
		super(SpellName.illusoryDisguise, SpellCircle.first, 'arcane');
	}
}
