import type {EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {EffectAffectableArea} from '../../Ability/EffectAffectable';
import type {Affectable} from '../../Affectable/Affectable';
import {ManaCost} from '../../ManaCost';
import type {Cost} from '../../Sheet/CharacterSheetInterface';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class FlamesExplosionDefaultEffect extends SpellEffect {
	affectable: Affectable = new EffectAffectableArea('cone');
	costs: Cost[] = [new ManaCost(1)];
	range: EffectRange = 'personal';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'default',
			source: SpellName.flamesExplosion,
		});
	}
}
