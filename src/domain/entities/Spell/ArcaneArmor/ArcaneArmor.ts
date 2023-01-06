import {AbilityEffects} from '../../Ability/AbilityEffects';
import type {SpellStatic} from '../Spell';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';

const arcaneArmor: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;
	effects = new AbilityEffects({
		activateable: {
			default: new ArcaneArmorDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.arcaneArmor, SpellCircle.first, 'arcane');
	}
};

export {
	arcaneArmor as ArcaneArmor,
};
