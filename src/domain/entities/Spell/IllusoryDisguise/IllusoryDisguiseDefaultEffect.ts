import type {EffectDuration, EffectRange} from '../../Ability/ActivateableAbilityEffect';
import type {Affectable} from '../../Affectable/Affectable';
import {AffectableTarget} from '../../Affectable/AffectableTarget';
import {ManaCost} from '../../ManaCost';
import type {Cost} from '../../Sheet/SheetInterface';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class IllusoryDisguiseDefaultEffect extends SpellEffect {
	costs: Cost[] = [new ManaCost(1)];
	static get duration(): EffectDuration {
		return 'scene';
	}

	static get modifierValue(): number {
		return 10;
	}

	affectable: Affectable = new AffectableTarget('self');
	range: EffectRange = 'personal';
	constructor() {
		super({
			duration: IllusoryDisguiseDefaultEffect.duration,
			execution: 'default',
			source: SpellName.illusoryDisguise,
		});
	}
}
