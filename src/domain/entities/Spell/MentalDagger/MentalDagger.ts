import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';

export class MentalDagger extends Spell {
	effects = {
		default: new MentalDaggerDefaultEffect(),
	};

	constructor() {
		super(SpellName.mentalDagger, SpellCircle.first, 'arcane');
	}
}
