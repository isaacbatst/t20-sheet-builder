import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';

export class ArcaneArmor extends Spell {
	effects = new AbilityEffects({
		activateable: {
			default: new ArcaneArmorDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.arcaneArmor, SpellCircle.first, 'arcane');
	}
}
