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

	append(modifiersList: ModifiersList<T>): void {
		this.modifiers.push(...modifiersList.modifiers);
	}

	remove(index: number): void {
		this.modifiers.splice(index, 1);
	}

	get(source: TranslatableName): T | undefined {
		return this.modifiers.find(modifier => modifier.source === source);
	}

	clone(): ModifiersList<T> {
		const list = new (this.constructor as new () => ModifiersList<T>)();
		this.modifiers.forEach(modifier => list.add(modifier));
		return list;
	}

	abstract serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetModifiersList;
}
