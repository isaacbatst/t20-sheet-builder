import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';
import type {SpellStatic} from '../Spell';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';

const mentalDagger: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;
	effects = new AbilityEffects({
		activateable: {
			default: new MentalDaggerDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.mentalDagger, SpellCircle.first, 'arcane');
	}
};

export {
	mentalDagger as MentalDagger,
};
