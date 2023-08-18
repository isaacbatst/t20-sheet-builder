import {type ContextInterface} from '../Context';
import {type SerializedSheetModifiersList} from '../Sheet/SerializedSheet/SerializedSheetInterface';
import {type SheetInterface} from '../Sheet/SheetInterface';
import type {ModifierInterface} from './ModifierInterface';

export type ModifiersListTotalCalculator<T extends ModifierInterface> = {
	calculate(modifiers: T[]): number;
};

export type ModifiersListInterface<T extends ModifierInterface> = {
	modifiers: T[];
	getTotal(totalCalculator: ModifiersListTotalCalculator<T>): number;
	add(modifier: T): number;
	remove(index: number): void;
	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetModifiersList;
};
