import type {ModifierInterface} from '../ModifierInterface';
import type {FixedModifiersListInterface} from './FixedModifiersList';

export class FixedModifiersListFake implements FixedModifiersListInterface {
	modifiers: ModifierInterface[] = [];
	total = 0;
	add = jest.fn();
	getTotal() {
		return this.total;
	}
}
