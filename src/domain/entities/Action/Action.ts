import type {ActionInterface, ActionType, ActionPayload} from '../SheetActions';

export abstract class Action<T extends ActionType = ActionType> implements ActionInterface<T> {
	constructor(
		readonly type: T,
		readonly payload: ActionPayload<T>,
	) {}
}
