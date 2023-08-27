import {TriggerEvent, TriggeredEffect, TriggeredEffectName, type TriggeredEffectModifiers} from '../../../Ability';
import {type AudacityActivation} from '../../../Ability/TriggeredEffectActivation';
import {type EnabledEffectModifiersIndexes} from '../../../Character/CharacterAttackTriggeredEffect';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class AudacityEffect extends TriggeredEffect<AudacityActivation> {
	static cost = new ManaCost(2);
	override baseCosts: Cost[] = [AudacityEffect.cost];
	override description: string = 'Quando faz um teste de perícia,'
  + ' você pode gastar 2 PM para somar seu Carisma no'
  + ' teste. Você não pode usar esta habilidade em testes'
  + ' de ataque.';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'reaction',
			name: TriggeredEffectName.audacity,
			source: RoleAbilityName.audacity,
			triggerEvent: TriggerEvent.skillTestExceptAttack,
		});
	}

	override enable({modifiersIndexes, modifiers}:
	{
		modifiers: TriggeredEffectModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}, activation: AudacityActivation): {manaCost?: ManaCost | undefined} {
		modifiersIndexes.skillExceptAttack = modifiers.skillExceptAttack?.fixed.add(new FixedModifier(this.source, activation.attributes.charisma));

		return {
			manaCost: AudacityEffect.cost,
		};
	}

	override disable({modifiersIndexes, modifiers}: {
		modifiers: TriggeredEffectModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}): void {
		if (typeof modifiersIndexes.skillExceptAttack === 'number') {
			modifiers.skillExceptAttack?.fixed.remove(modifiersIndexes.skillExceptAttack);
		}
	}
}
