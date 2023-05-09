import type {EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {EffectAffectableArea} from '../../Ability/EffectAffectable';
import type {Affectable} from '../../Affectable/Affectable';
import {ManaCost} from '../../ManaCost';
import type {Cost} from '../../Sheet/CharacterSheet/CharacterSheetInterface';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class FlamesExplosionDefaultEffect extends SpellEffect {
	override description: string = 'Um leque de chamas irrompe de suas'
	+ ' mãos, causando 2d6 pontos de dano de'
	+ ' fogo às criaturas na área.';

	affectable: Affectable = new EffectAffectableArea('cone');
	baseCosts: Cost[] = [new ManaCost(1)];
	range: EffectRange = 'personal';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'default',
			source: SpellName.flamesExplosion,
		});
	}
}
