import {TriggeredEffect, TriggeredEffectName, type TriggeredEffectDisableParams, type TriggeredEffectEnableParams, type TriggeredEffectEnableReturn, TriggerEvent} from '../../../Ability';
import {type TriggeredEffectActivation} from '../../../Ability/TriggeredEffectActivation';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier} from '../../../Modifier';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class DivineBlowEffect extends TriggeredEffect {
	override baseCosts: Cost[] = [new ManaCost(2)];
	override description: string = 'Quando faz um ataque corpo a'
  + ' corpo, você pode gastar 2 PM para desferir um golpe'
  + ' destruidor. Você soma seu Carisma no teste de ataque'
  + ' e +1d8 na rolagem de dano. A cada quatro níveis, pode'
  + ' gastar +1 PM para aumentar o dano em +1d8.';

	constructor() {
		super({
			duration: 'immediate',
			execution: 'reaction',
			name: TriggeredEffectName.divineBlow,
			source: RoleAbilityName.divineBlow,
			triggerEvents: TriggerEvent.attack,
		});
	}

	override enable({modifiersIndexes, modifiers}: TriggeredEffectEnableParams, activation: TriggeredEffectActivation): TriggeredEffectEnableReturn {
		modifiers.attack?.fixed.add(new FixedModifier(RoleAbilityName.divineBlow, 0, new Set(['charisma'])));

		return {
			manaCost: new ManaCost(this.getManaCost()),
		};
	}

	override disable({modifiersIndexes, modifiers}: TriggeredEffectDisableParams): void {
		throw new Error('Method not implemented.');
	}
}
