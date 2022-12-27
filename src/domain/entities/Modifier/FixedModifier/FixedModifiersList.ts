import type {FixedModifierInterface} from './FixedModifier';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';

export type FixedModifiersListInterface = ModifiersListInterface<FixedModifierInterface>;

export class FixedModifiersList extends ModifiersList<FixedModifierInterface>
	implements ModifiersListInterface<FixedModifierInterface> {
}
