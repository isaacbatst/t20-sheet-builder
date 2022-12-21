import type {ActionInterface, ActionType, ActionPayload} from '../CharacterAction';

export abstract class Action<T extends ActionType> implements ActionInterface<T> {
	constructor(
		readonly type: T,
		readonly payload: ActionPayload<T>,
	) {}
}
