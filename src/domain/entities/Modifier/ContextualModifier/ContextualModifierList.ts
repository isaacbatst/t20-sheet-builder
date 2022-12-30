import type {Attributes} from '../../Sheet/Attributes';
import {ModifiersList} from '../ModifiersList';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';

export class ContextualModifiersList
	extends ModifiersList <ContextualModifierInterface>
	implements ContextualModifiersListInterface {
	getMaxTotal(attributes: Attributes): number {
		return this.modifiers.reduce((acc, modifier) => modifier.value + modifier.getTotalAttributeBonuses(attributes) + acc, 0);
	}
}
