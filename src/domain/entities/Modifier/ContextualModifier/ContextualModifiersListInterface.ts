import type {Attributes} from '../../Sheet/Attributes';
import type {PreviewContextAbstract} from '../../Context/PreviewContextAbstract';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';

export type ModifierConditionVerify = (context: PreviewContextAbstract) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ModifierConditionVerify;
};

export type ContextualModifiersListInterface = ModifiersListInterface<ContextualModifierInterface> & {
	getMaxTotal(attributes: Attributes): number;
};
