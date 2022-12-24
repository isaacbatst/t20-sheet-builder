import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';

export class ArcaneArmor extends Spell {
	effects = {
		default: new ArcaneArmorDefaultEffect(),
	};

	constructor() {
		super(SpellName.arcaneArmor, SpellCircle.first, 'arcane');
	}
}
