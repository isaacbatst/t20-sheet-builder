import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';

export class FlamesExplosion extends Spell {
	effects = {
		default: new FlamesExplosionDefaultEffect(),
	};

	constructor() {
		super(SpellName.flamesExplosion, SpellCircle.first, 'arcane');
	}
}
