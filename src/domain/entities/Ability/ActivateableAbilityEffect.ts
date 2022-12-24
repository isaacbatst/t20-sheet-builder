import type {Affectable} from '../Affectable/Affectable';
import type {Activateable, Appliable, EffectExecution, SheetInterface} from '../SheetInterface';
import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export type EffectExecutionType = 'default' | 'free' | 'moviment' | 'complete' | 'reaction';
export type EffectDuration = 'immediate' | 'scene' | 'sustained' | 'defined' | 'permanent' | 'round' | 'next';
export type EffectRange = 'personal' | 'touch' | 'short' | 'medium' | 'long' | 'unilimited';
export type EffectCost = Appliable;

export type ActivateableAbilityEffectInterface = Activateable & {
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
	abstract cost: Appliable;

	constructor(params: ActivateableEffectParams) {
		super('active', params.source);
		this.executionType = params.execution;
		this.duration = params.duration;
	}

	activate(sheet: SheetInterface, execution: EffectExecution) {
		this.cost.apply(sheet);
		execution.execute(sheet);
	}
}

