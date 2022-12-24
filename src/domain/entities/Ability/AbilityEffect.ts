import type {AbilityName} from './Ability';

export type EffectType = 'active' | 'passive';

export type AbilityEffectInterface = {
	type: EffectType;
	source: AbilityName;
};

export abstract class AbilityEffect implements AbilityEffectInterface {
	constructor(
		readonly type: EffectType,
		readonly source: AbilityName,
	) {}
}
