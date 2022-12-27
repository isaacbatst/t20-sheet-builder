import type {ModifierCondition} from './ContextualModifiersListInterface';
import type {ModifierInterface} from '../ModifierInterface';

export type ContextualModifierInterface = ModifierInterface & {
	condition: ModifierCondition;
};
