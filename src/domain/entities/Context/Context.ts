import type {ContextInterface, ContextType} from './ContextInterface';
export abstract class Context implements ContextInterface {
	constructor(readonly type: ContextType, readonly activateContextualModifiers: boolean) {}
}
