import type {InGameContextInterface} from '../../Context/InGameContextInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ModifiersListInterface} from '../ModifiersListInterface';

export type ModifierConditionVerify = (context: InGameContextInterface) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ModifierConditionVerify;
};

export type ContextualModifiersListInterface = ModifiersListInterface<ContextualModifierInterface> & {
	getMaxTotal(): number;
};
