import {type TranslatableName} from '..';
import {type ContextInterface} from '../Context';
import {type SerializedSheetModifiersList} from '../Sheet/SerializedSheet/SerializedSheetInterface';
import {type SheetInterface} from '../Sheet/SheetInterface';
import type {ModifierInterface} from './ModifierInterface';
import type {ModifiersListInterface, ModifiersListTotalCalculator} from './ModifiersListInterface';

export abstract class ModifiersList<T extends ModifierInterface> implements ModifiersListInterface<T> {
	modifiers: T[] = [];
	getTotal(totalCalculator: ModifiersListTotalCalculator<T>): number {
		return totalCalculator.calculate(this.modifiers);
	}

	add(...modifier: T[]): number {
		const nextIndex = this.modifiers.push(...modifier);
		return nextIndex - 1;
	}

	remove(index: number): void {
		this.modifiers.splice(index, 1);
	}

	get(source: TranslatableName): T | undefined {
		return this.modifiers.find(modifier => modifier.source === source);
	}

	abstract serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetModifiersList;
}
