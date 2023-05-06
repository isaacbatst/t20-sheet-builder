import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';

export class MentalDagger extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.mentalDagger;
	effects = new AbilityEffects({
		activateable: {
			default: new MentalDaggerDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.mentalDagger, SpellCircle.first, 'arcane');
	}
}
