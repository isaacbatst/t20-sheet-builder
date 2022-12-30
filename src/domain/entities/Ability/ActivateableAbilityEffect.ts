import type {Affectable} from '../Affectable/Affectable';
import type {Cost} from '../Sheet/SheetInterface';
import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export type EffectExecutionType = 'default' | 'free' | 'moviment' | 'complete' | 'reaction';
export type EffectDuration = 'immediate' | 'scene' | 'sustained' | 'defined' | 'permanent' | 'round' | 'next';
export type EffectRange = 'personal' | 'touch' | 'short' | 'medium' | 'long' | 'unilimited';
export type EffectCost = Cost;

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

export type ActivationType = 'free' | 'triggered';
export abstract class ActivateableAbilityEffect extends AbilityEffect implements ActivateableAbilityEffectInterface {
	readonly executionType: EffectExecutionType;
	readonly duration: EffectDuration;
	get activationType(): ActivationType {
		return 'free';
	}

	abstract costs: Cost[];

	constructor(params: ActivateableEffectParams) {
		super('active', params.source);
		this.executionType = params.execution;
		this.duration = params.duration;
	}
}
