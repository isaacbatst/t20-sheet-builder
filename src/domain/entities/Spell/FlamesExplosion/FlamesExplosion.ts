import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';
import type {SpellStatic} from '../Spell';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';

const flamesExplosion: SpellStatic = class extends Spell {
	static circle = SpellCircle.first;
	effects = new AbilityEffects({
		activateable: {
			default: new FlamesExplosionDefaultEffect(),
		},
	});

	constructor() {
		super(SpellName.flamesExplosion, SpellCircle.first, 'arcane');
	}
};

export {
	flamesExplosion as FlamesExplosion,
};
