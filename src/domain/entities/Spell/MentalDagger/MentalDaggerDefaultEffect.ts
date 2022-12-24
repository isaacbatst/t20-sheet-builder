import type {EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {EffectAffectableTarget} from '../../Ability/EffectAffectable';
import {ManaCost} from '../../ManaCost';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class MentalDaggerDefaultEffect extends SpellEffect {
	cost = new ManaCost(1);
	range: EffectRange = 'short';
	affectable = new EffectAffectableTarget('creature', 1);

	constructor() {
		super({
			execution: 'default',
			duration: 'immediate',
			source: SpellName.mentalDagger,
		});
	}
}

