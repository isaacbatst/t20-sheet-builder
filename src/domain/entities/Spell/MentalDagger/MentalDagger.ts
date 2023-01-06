import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import type {SpellStatic} from '../SpellStatic';
import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';

const mentalDagger: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.arcaneArmor;
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
