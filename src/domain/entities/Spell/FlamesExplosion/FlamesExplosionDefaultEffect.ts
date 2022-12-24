import type {EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {EffectAffectableArea} from '../../Ability/EffectAffectable';
import type {Affectable} from '../../Affectable/Affectable';
import {ManaCost} from '../../ManaCost';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class FlamesExplosionDefaultEffect extends SpellEffect {
	affectable: Affectable = new EffectAffectableArea('cone');
	cost: ManaCost = new ManaCost(1);
	range: EffectRange = 'personal';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'default',
			source: SpellName.flamesExplosion,
		});
	}
}
