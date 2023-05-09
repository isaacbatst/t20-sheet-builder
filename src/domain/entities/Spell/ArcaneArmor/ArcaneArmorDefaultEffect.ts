import type {EffectDuration, EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {AffectableTarget} from '../../Affectable/AffectableTarget';
import {ManaCost} from '../../ManaCost';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class ArcaneArmorDefaultEffect extends SpellEffect {
	override description: string = 'Esta magia cria uma película protetora'
	+ ' invisível, mas tangível, fornecendo'
	+ ' +5 na Defesa. Esse bônus é cumulativo'
	+ ' com outras magias, mas não com'
	+ ' bônus fornecido por armaduras.';

	static get defenseBonus() {
		return 5;
	}

	static get duration(): EffectDuration {
		return 'scene';
	}

	affectable = new AffectableTarget('self');
	baseCosts = [new ManaCost(1)];
	range: EffectRange = 'personal';

	constructor() {
		super({
			source: SpellName.arcaneArmor,
			duration: 'scene',
			execution: 'default',
		});
	}
}
