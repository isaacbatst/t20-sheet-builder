import {RoleAbilityName} from '../Role/RoleAbilityName';
import type {AbilityName} from './Ability';
import type {EffectDuration, EffectExecutionType} from './ActivateableAbilityEffect';
import type {TriggeredEffectInterface, TriggerEvent} from './TriggeredEffect';

export class TriggeredEffectFake implements TriggeredEffectInterface {
	activate = jest.fn();

	executionType: EffectExecutionType = 'default';
	duration: EffectDuration = 'next';
	source: AbilityName = RoleAbilityName.specialAttack;
	triggerEvent: TriggerEvent = 'attack';
}
