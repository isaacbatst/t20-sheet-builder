import type {EffectDuration, EffectRange} from '../../Ability/ActivateableAbilityEffect';
import type {Affectable} from '../../Affectable/Affectable';
import {AffectableTarget} from '../../Affectable/AffectableTarget';
import {ManaCost} from '../../ManaCost';
import type {Cost} from '../../Sheet/CharacterSheet/CharacterSheetInterface';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class IllusoryDisguiseDefaultEffect extends SpellEffect {
	baseCosts: Cost[] = [new ManaCost(1)];

	override description: string = 'Você muda a aparência do alvo, incluindo'
	+ ' seu equipamento. Isso inclui altura, peso, tom de pele, cor de cabelo,'
	+ ' timbre de voz etc. O alvo recebe +10 em testes de Enganação para'
	+ ' disfarce. O alvo não recebe novas habilidades (você pode ficar parecido com'
	+ ' outra raça, mas não ganhará as habilidades dela), nem modifica o equipamento'
	+ ' (uma espada longa disfarçada de bordão continua funcionando e causando dano como uma espada).';

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
