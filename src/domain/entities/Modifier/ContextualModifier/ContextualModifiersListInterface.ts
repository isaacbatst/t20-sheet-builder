import {type Context} from '../../Context';
import type {Attributes} from '../../Sheet/Attributes';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {ContextualModifierInterface} from './ContextualModifierInterface';

export type ModifierConditionVerify = (context: Context) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ModifierConditionVerify;
};

export type ContextualModifiersListInterface = ModifiersListInterface<ContextualModifierInterface> & {
	getMaxTotal(attributes: Attributes): number;
};
