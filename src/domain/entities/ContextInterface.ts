import type {ModifierConditionVerify} from './Modifier/ContextualModifier/ContextualModifiersListInterface';

export type ContextType = 'outgame' | 'ingame';

export type ContextInterface = {
	type: ContextType;
	shouldActivateModifier(verify: ModifierConditionVerify): boolean;
};
