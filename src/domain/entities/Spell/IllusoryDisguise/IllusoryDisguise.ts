import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

export class IllusoryDisguise extends Spell {
	effects = new AbilityEffects({
		activateable: {
			default: new IllusoryDisguiseDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.illusoryDisguise, SpellCircle.first, 'arcane');
	}
}
