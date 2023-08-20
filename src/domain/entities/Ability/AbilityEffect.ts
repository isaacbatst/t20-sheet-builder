import {type SerializedSheetAbilityEffect} from '..';
import type {AbilityName} from './Ability';

export type EffectType = 'active' | 'passive' | 'roleplay';

export type AbilityEffectInterface = {
	type: EffectType;
	source: AbilityName;
	readonly description: string;
	serialize(): SerializedSheetAbilityEffect;
};

export abstract class AbilityEffect implements AbilityEffectInterface {
	abstract readonly description: string;

	constructor(
		readonly type: EffectType,
		readonly source: AbilityName,
	) {}

	serialize(): SerializedSheetAbilityEffect {
		return {
			description: this.description,
		};
	}
}
