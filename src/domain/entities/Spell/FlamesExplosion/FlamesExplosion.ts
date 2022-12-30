import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';

export class FlamesExplosion extends Spell {
	effects = new AbilityEffects({
		activateable: {
			default: new FlamesExplosionDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.flamesExplosion, SpellCircle.first, 'arcane');
	}
}
