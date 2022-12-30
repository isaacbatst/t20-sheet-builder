import type {ActivateableAbilityEffectInterface, ActivateableEffectParams, ActivationType} from './ActivateableAbilityEffect';
import {ActivateableAbilityEffect} from './ActivateableAbilityEffect';
import type {TriggeredEffectName} from './TriggeredEffectName';

export type TriggerEvent = 'attack' | 'defense';

export type TriggeredEffectInterface = ActivateableAbilityEffectInterface & {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;
};

type TriggeredEffectParams = ActivateableEffectParams & {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;
};

export abstract class TriggeredEffect extends ActivateableAbilityEffect {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;

	override get activationType(): ActivationType {
		return 'triggered';
	}

	constructor(
		params: TriggeredEffectParams,
	) {
		super(params);
		this.triggerEvent = params.triggerEvent;
		this.name = params.name;
	}
}
