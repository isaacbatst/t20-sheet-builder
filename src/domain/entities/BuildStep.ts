import type {ActionInterface, ActionType} from './Sheet/SheetActions';

export type BuildStepInterface<T extends ActionType = ActionType> = {
	action: ActionInterface<T>;
};

export class BuildStep<T extends ActionType = ActionType> implements BuildStepInterface<T> {
	constructor(
		readonly action: ActionInterface<T>,
	) {
	}
}
