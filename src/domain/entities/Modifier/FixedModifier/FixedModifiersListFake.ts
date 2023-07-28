import type {ModifierInterface} from '../ModifierInterface';
import type {FixedModifiersListInterface} from './FixedModifiersList';
import {vi} from 'vitest';

export class FixedModifiersListFake implements FixedModifiersListInterface {
	modifiers: ModifierInterface[] = [];
	total = 0;
	add = vi.fn();
	remove = vi.fn();
	serialize = vi.fn();
	getTotal() {
		return this.total;
	}
}
