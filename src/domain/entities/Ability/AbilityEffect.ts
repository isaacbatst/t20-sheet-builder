import type {AbilityName} from './Ability';

export type EffectType = 'active' | 'passive' | 'roleplay';

export type AbilityEffectInterface = {
	type: EffectType;
	source: AbilityName;
	readonly description: string;
};

export abstract class AbilityEffect implements AbilityEffectInterface {
	abstract readonly description: string;

	constructor(
		readonly type: EffectType,
		readonly source: AbilityName,
	) {}
}
