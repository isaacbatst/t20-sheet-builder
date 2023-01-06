import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import type {SpellStatic} from '../SpellStatic';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

const illusoryDisguise: SpellStatic = class extends Spell {
	static spellName = SpellName.illusoryDisguise;
	static circle = SpellCircle.first;
	effects = new AbilityEffects({
		activateable: {
			default: new IllusoryDisguiseDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.illusoryDisguise, SpellCircle.first, 'arcane');
	}
};

export {
	illusoryDisguise as IllusoryDisguise,
};
