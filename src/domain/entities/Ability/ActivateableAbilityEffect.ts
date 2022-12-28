import {AddActivateableEffect} from '../Action/AddActivateableEffect';
import type {Affectable} from '../Affectable/Affectable';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Appliable} from '../Sheet/SheetInterface';
import type {Dispatch} from '../Transaction';
import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export type EffectExecutionType = 'default' | 'free' | 'moviment' | 'complete' | 'reaction';
export type EffectDuration = 'immediate' | 'scene' | 'sustained' | 'defined' | 'permanent' | 'round' | 'next';
export type EffectRange = 'personal' | 'touch' | 'short' | 'medium' | 'long' | 'unilimited';
export type EffectCost = Appliable;

export type ActivateableAbilityEffectInterface = {
	executionType: EffectExecutionType;
	duration: EffectDuration;
	source: AbilityName;
};

export type ActivateableEffectParams = {
	duration: EffectDuration;
	source: AbilityName;
	execution: EffectExecutionType;
};

export type RangedEffect = {
	range: EffectRange;
};

export type AffectableEffect = {
	affectable: Affectable;
};

export abstract class ActivateableAbilityEffect extends AbilityEffect implements ActivateableAbilityEffectInterface {
	readonly executionType: EffectExecutionType;
	readonly duration: EffectDuration;
	abstract costs: Appliable[];

	constructor(params: ActivateableEffectParams) {
		super('active', params.source);
		this.executionType = params.execution;
		this.duration = params.duration;
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddActivateableEffect({
			effect: this,
		}), sheet);
	}
}
