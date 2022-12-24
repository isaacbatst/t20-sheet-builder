import type {ActivateableEffectParams, AffectableEffect, EffectRange, RangedEffect} from '../Ability/ActivateableAbilityEffect';
import {ActivateableAbilityEffect} from '../Ability/ActivateableAbilityEffect';
import type {Affectable} from '../Affectable/Affectable';
import type {ManaCost} from '../ManaCost';

export type SpellEffectParams = ActivateableEffectParams;

export abstract class SpellEffect extends ActivateableAbilityEffect implements RangedEffect, AffectableEffect {
	abstract override cost: ManaCost;
	abstract range: EffectRange;
	abstract affectable: Affectable;
}
