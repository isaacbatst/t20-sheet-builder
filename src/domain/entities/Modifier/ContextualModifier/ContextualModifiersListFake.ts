import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';
import {vi} from 'vitest';

export class ContextualModifiersListFake implements ContextualModifiersListInterface {
	modifiers: ContextualModifierInterface[] = [];
	total = 0;
	maxTotal = 0;
	add = vi.fn();
	getTotal(): number {
		return this.total;
	}

	getMaxTotal(): number {
		return this.maxTotal;
	}
}
