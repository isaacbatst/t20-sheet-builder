import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {Dispatch} from '../../SheetInterface';

export enum ArcanistPathName {
	wizard = 'wizard',
	sorcerer = 'sorcerer',
	mage = 'mage',
}

export abstract class ArcanistPath {
	abstract name: ArcanistPathName;
	abstract addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void;
}
