import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';

export class FlamesExplosion extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.flamesExplosion;
	effects = new AbilityEffects({
		activateable: {
			default: new FlamesExplosionDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.flamesExplosion, SpellCircle.first, 'arcane');
	}
}
