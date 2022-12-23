import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';

export type AbilityEffectType = 'active' | 'passive';
export type AbilityType = 'role' | 'race';

export type AbilityInterface = {
	name: string;
	effectType: AbilityEffectType;
	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void;
};

export abstract class Ability implements AbilityInterface {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
		readonly type: AbilityType,
	) {}

	abstract addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void;
}
