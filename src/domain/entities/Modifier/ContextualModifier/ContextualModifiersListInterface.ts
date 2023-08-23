import type {Attributes} from '../../Sheet/Attributes';
import type {CharacterContextAbstract} from '../../Context/CharacterContextAbstract';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';

export type ModifierConditionVerify = (context: CharacterContextAbstract) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ModifierConditionVerify;
};

export type ContextualModifiersListInterface = ModifiersListInterface<ContextualModifierInterface> & {
	getMaxTotal(attributes: Attributes): number;
};
