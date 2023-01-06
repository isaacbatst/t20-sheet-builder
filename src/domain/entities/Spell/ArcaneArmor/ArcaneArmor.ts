import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import type {SpellStatic} from '../SpellStatic';
import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';

const arcaneArmor: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.arcaneArmor;
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
