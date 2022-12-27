import {AddTriggeredEffect} from '../Action/AddTriggeredEffect';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Transaction';
import type {ActivateableAbilityEffectInterface, ActivateableEffectParams} from './ActivateableAbilityEffect';
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

	constructor(
		params: TriggeredEffectParams,
	) {
		super(params);
		this.triggerEvent = params.triggerEvent;
		this.name = params.name;
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddTriggeredEffect({
			effect: this,
		}), sheet);
	}
}
