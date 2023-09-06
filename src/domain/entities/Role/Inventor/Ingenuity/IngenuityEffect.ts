import {TriggerEvent, TriggeredEffect, TriggeredEffectName} from '../../../Ability';
import {type TriggeredEffectActivation} from '../../../Ability/TriggeredEffectActivation';
import {type CharacterModifierName} from '../../../Character';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier, type Modifiers} from '../../../Modifier';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class IngenuityEffect extends TriggeredEffect {
	override baseCosts: Cost[] = [new ManaCost(2)];
	override description: string = 'Quando faz um teste de'
  + ' perícia, você pode gastar 2 PM para somar a sua Inteligência'
  + ' no teste. Você não pode usar esta habilidade'
  + ' em testes de ataque.';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'reaction',
			name: TriggeredEffectName.ingenuity,
			source: RoleAbilityName.ingenuity,
			triggerEvents: [TriggerEvent.skillTestExceptAttack],
		});
	}

	override enable({modifiersIndexes, modifiers}: {
		modifiers: Partial<Record<CharacterModifierName, Modifiers>>;
		modifiersIndexes: Partial<Record<CharacterModifierName, number>>;
	}, activation: TriggeredEffectActivation): {manaCost?: ManaCost | undefined} {
		modifiersIndexes.skillExceptAttack = modifiers.skillExceptAttack?.fixed.add(new FixedModifier(this.source, 0, new Set(['intelligence'])));

		return {
			manaCost: new ManaCost(2),
		};
	}

	override disable({modifiersIndexes, modifiers}: {modifiers: Partial<Record<CharacterModifierName, Modifiers>>; modifiersIndexes: Partial<Record<CharacterModifierName, number>>}): void {
		if (modifiersIndexes.skillExceptAttack) {
			modifiers.skillExceptAttack?.fixed.remove(modifiersIndexes.skillExceptAttack);
		}

		modifiersIndexes.skillExceptAttack = undefined;
	}
}
