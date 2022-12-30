import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';

export class MentalDagger extends Spell {
	effects = new AbilityEffects({
		activateable: {
			default: new MentalDaggerDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.mentalDagger, SpellCircle.first, 'arcane');
	}
}
