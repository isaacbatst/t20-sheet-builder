import type {Attributes} from '../../Sheet/Attributes';
import type {InGameContextInterface} from '../../Context/InGameContextInterface';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';

export type ModifierConditionVerify = (context: InGameContextInterface) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ModifierConditionVerify;
};

export type ContextualModifiersListInterface = ModifiersListInterface<ContextualModifierInterface> & {
	getMaxTotal(attributes: Attributes): number;
};
