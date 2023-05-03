import type {ModifierInterface} from './ModifierInterface';

export type ModifiersListTotalCalculator<T extends ModifierInterface> = {
	calculate(modifiers: T[]): number;
};

export type ModifiersListInterface<T extends ModifierInterface> = {
	modifiers: T[];
	getTotal(totalCalculator: ModifiersListTotalCalculator<T>): number;
	add(modifier: T): number;
};
