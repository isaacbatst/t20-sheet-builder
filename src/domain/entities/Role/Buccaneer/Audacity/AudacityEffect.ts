import {TriggerEvent, TriggeredEffect, TriggeredEffectName} from '../../../Ability';
import {ManaCost} from '../../../ManaCost';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class AudacityEffect extends TriggeredEffect {
	override baseCosts: Cost[] = [new ManaCost(2)];
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
}
