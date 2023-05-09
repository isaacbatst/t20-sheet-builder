import {RoleAbilityName} from '../Role/RoleAbilityName';
import type {AbilityName} from './Ability';
import type {EffectDuration, EffectExecutionType} from './ActivateableAbilityEffect';
import type {TriggeredEffectInterface, TriggerEvent} from './TriggeredEffect';
import {vi} from 'vitest';
import {TriggeredEffectName} from './TriggeredEffectName';

export class TriggeredEffectFake implements TriggeredEffectInterface {
	name: TriggeredEffectName = TriggeredEffectName.specialAttack;
	activate = vi.fn();

	executionType: EffectExecutionType = 'default';
	duration: EffectDuration = 'next';
	source: AbilityName = RoleAbilityName.specialAttack;
	triggerEvent: TriggerEvent = 'attack';
}
