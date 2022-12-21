import type {SheetInterface} from './SheetInterface';

export type AbilityEffectType = 'active' | 'passive';

export type AbilityInterface = {
	name: string;
	effectType: AbilityEffectType;
	apply(sheet: SheetInterface): void;
};

export abstract class Ability implements AbilityInterface {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
	) {}

	abstract apply(sheet: SheetInterface): void;
}
