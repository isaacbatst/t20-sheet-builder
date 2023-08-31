import {TriggerEvent, TriggeredEffect, TriggeredEffectName, type TriggeredEffectModifiers} from '../../../Ability';
import {type TriggeredEffectActivation} from '../../../Ability/TriggeredEffectActivation';
import {type EnabledEffectModifiersIndexes} from '../../../Character/CharacterAttackTriggeredEffect';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier} from '../../../Modifier';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class BulwarkEffect extends TriggeredEffect {
	override baseCosts: Cost[] = [new ManaCost(1)];
	override description: string = 'Quando sofre um ataque ou faz'
  + ' um teste de resistência, você pode gastar 1 PM'
  + ' para receber +2 na Defesa e nos testes de resistência'
  + ' até o início do seu próximo turno. A cada'
  + ' quatro níveis, pode gastar +1 PM para aumentar'
  + ' o bônus em +2.';

	constructor() {
		super({
			duration: 'next',
			execution: 'reaction',
			name: TriggeredEffectName.bulwark,
			source: RoleAbilityName.bulwark,
			triggerEvents: [TriggerEvent.defend, TriggerEvent.resistanceTest],
		});
	}

	override enable(
		{modifiersIndexes, modifiers}: {
			modifiers: TriggeredEffectModifiers;
			modifiersIndexes: EnabledEffectModifiersIndexes;
		}, activation: TriggeredEffectActivation): {manaCost?: ManaCost | undefined} {
		modifiersIndexes.defend = modifiers.defense?.fixed.add(new FixedModifier(this.source, 2));

		return {
			manaCost: new ManaCost(1),
		};
	}

	override disable({modifiersIndexes, modifiers}: {modifiers: TriggeredEffectModifiers; modifiersIndexes: EnabledEffectModifiersIndexes}): void {
		if (typeof modifiersIndexes.defend !== 'undefined') {
			modifiers.defense?.fixed.remove(modifiersIndexes.defend);
			modifiersIndexes.defend = undefined;
		}
	}
}
