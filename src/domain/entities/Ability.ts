import type {SheetInterface} from './SheetInterface';

export type AbilityEffectType = 'active' | 'passive';

export type AbilityInterface = {
	name: string;
	effectType: AbilityEffectType;
	apply(character: SheetInterface): void;
};

export abstract class Ability implements AbilityInterface {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
	) {}

	abstract apply(character: SheetInterface): void;
}
