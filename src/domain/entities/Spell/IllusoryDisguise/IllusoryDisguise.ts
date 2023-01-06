import {AbilityEffects} from '../../Ability/AbilityEffects';
import type {SpellStatic} from '../Spell';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

const illusoryDisguise: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;	effects = new AbilityEffects({
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
