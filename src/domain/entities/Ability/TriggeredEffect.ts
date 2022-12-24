import {AddTriggeredEffect} from '../Action/AddTriggeredEffect';
import type {BuildingSheetInterface} from '../Sheet/BuildingSheetInterface';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {ActivateableAbilityEffectInterface, ActivateableEffectParams} from './ActivateableAbilityEffect';
import {ActivateableAbilityEffect} from './ActivateableAbilityEffect';

export type TriggerEvent = 'attack' | 'defense';

export type TriggeredEffectInterface = ActivateableAbilityEffectInterface & {
	triggerEvent: TriggerEvent;
};

type TriggeredEffectParams = ActivateableEffectParams & {
	triggerEvent: TriggerEvent;
};

export abstract class TriggeredEffect extends ActivateableAbilityEffect {
	triggerEvent: TriggerEvent;

	constructor(
		params: TriggeredEffectParams,
	) {
		super(params);
		this.triggerEvent = params.triggerEvent;
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new AddTriggeredEffect({
			effect: this,
		}));
	}
}
