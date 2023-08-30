import type {Affectable} from '../Affectable/Affectable';
import {ManaCost} from '../ManaCost';
import type {Cost} from '../Sheet/CharacterSheet/CharacterSheetInterface';
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
	getManaCost(): number;
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

	abstract baseCosts: Cost[];

	constructor(params: ActivateableEffectParams) {
		super('active', params.source);
		this.executionType = params.execution;
		this.duration = params.duration;
	}

	getManaCost(): number {
		return this.baseCosts.reduce((total, cost) => {
			if (cost instanceof ManaCost) {
				return total + cost.value;
			}

			return total;
		}, 0);
	}
}
