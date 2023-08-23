import {type SheetInterface} from '../SheetInterface';

export type Location = {isUnderground: boolean};

export type CharacterSheetInterface = SheetInterface;

export type CostType = 'mana' | 'item';

export type Cost = {
	type: CostType;
};

export type EffectExecution = {
	execute(sheet: CharacterSheetInterface): void;
};
