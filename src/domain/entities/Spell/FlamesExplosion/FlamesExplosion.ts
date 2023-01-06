import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {AbilityEffects} from '../../Ability/AbilityEffects';
import type {SpellStatic} from '../SpellStatic';

const flamesExplosion: SpellStatic = class extends Spell {
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
};

export {
	flamesExplosion as FlamesExplosion,
};
