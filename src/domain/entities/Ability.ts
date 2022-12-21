import type {BuildingSheet} from './BuildingSheet';

export type AbilityEffectType = 'active' | 'passive';

export type AbilityInterface = {
	name: string;
	effectType: AbilityEffectType;
	apply(sheet: BuildingSheet): void;
};

export abstract class Ability implements AbilityInterface {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
	) {}

	abstract apply(sheet: BuildingSheet): void;
}
