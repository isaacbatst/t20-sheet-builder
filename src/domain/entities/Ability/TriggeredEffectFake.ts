import {RoleAbilityName} from '../Role/RoleAbilityName';
import type {AbilityName} from './Ability';
import type {EffectDuration, EffectExecutionType} from './ActivateableAbilityEffect';
import type {TriggeredEffectInterface, TriggerEvent} from './TriggeredEffect';
import {TriggeredEffectName} from './TriggeredEffectName';
import {vi} from 'vitest';

export class TriggeredEffectFake implements TriggeredEffectInterface {
	name: TriggeredEffectName = TriggeredEffectName.specialAttackPlusFour;
	activate = vi.fn();

	executionType: EffectExecutionType = 'default';
	duration: EffectDuration = 'next';
	source: AbilityName = RoleAbilityName.specialAttack;
	triggerEvent: TriggerEvent = 'attack';
}
