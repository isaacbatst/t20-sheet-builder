import {vi} from 'vitest';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';

export class ContextualModifiersListFake implements ContextualModifiersListInterface {
	serialize = vi.fn();

	modifiers: ContextualModifierInterface[] = [];
	total = 0;
	maxTotal = 0;
	add = vi.fn();
	remove = vi.fn();
	getTotal(): number {
		return this.total;
	}

	getMaxTotal(): number {
		return this.maxTotal;
	}
}
