import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';
import {ModifiersList} from '../ModifiersList';

export class ContextualModifiersList
	extends ModifiersList <ContextualModifierInterface>
	implements ContextualModifiersListInterface {
	getMaxTotal(): number {
		return this.modifiers.reduce((acc, modifier) => modifier.value + acc, 0);
	}
}
