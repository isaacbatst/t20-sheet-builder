import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/SheetInterface';

export enum ArcanistPathName {
	wizard = 'wizard',
	sorcerer = 'sorcerer',
	mage = 'mage',
}

export abstract class ArcanistPath {
	abstract name: ArcanistPathName;
	abstract addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
}
