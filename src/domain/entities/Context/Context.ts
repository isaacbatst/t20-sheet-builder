import type {ContextInterface, ContextType} from './ContextInterface';
import type {ModifierConditionVerify} from '../Modifier/ContextualModifier/ContextualModifiersListInterface';
export abstract class Context implements ContextInterface {
	constructor(readonly type: ContextType, readonly activateContextualModifiers: boolean) {}
	abstract shouldActivateModifier(verify: ModifierConditionVerify): boolean;
}
