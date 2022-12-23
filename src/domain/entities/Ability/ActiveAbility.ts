import type {Appliable, SheetInterface} from '../SheetInterface';
import type {AbilityType} from './Ability';
import {Ability} from './Ability';
import type {Affectable} from './Affectable';

export type AbilityExecution = 'default' | 'free' | 'moviment' | 'complete';
export type AbilityRange = 'personal' | 'touch' | 'short' | 'medium' | 'long' | 'unlimited';
export type AbilityDuration = 'immediate' | 'scene' | 'sustained';
export type AbilityCost = Appliable;

export abstract class ActiveAbility extends Ability implements Appliable {
	abstract readonly execution: AbilityExecution;
	abstract readonly range: AbilityRange;
	abstract readonly duration: AbilityDuration;
	abstract readonly cost: Appliable;
	abstract readonly affectable: Affectable;

	constructor(name: string, type: AbilityType) {
		super(name, 'active', type);
	}

	abstract apply(sheet: SheetInterface): void;
}
