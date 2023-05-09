import type {EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {EffectAffectableTarget} from '../../Ability/EffectAffectable';
import {ManaCost} from '../../ManaCost';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class MentalDaggerDefaultEffect extends SpellEffect {
	override description: string = 'Você manifesta e dispara uma adaga'
	+ ' imaterial contra a mente do alvo, que sofre 2d6 pontos de dano psíquico e'
	+ ' fica atordoado por uma rodada. Se passar no teste de resistência, sofre apenas'
	+ ' metade do dano e evita a condição.	Uma criatura só pode ficar atordoada'
	+ ' por esta magia uma vez por cena.';

	baseCosts = [new ManaCost(1)];
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

